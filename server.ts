import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";

// Initialize Firebase Admin for verifying ID tokens
// This only needs projectId and doesn't require service account credentials for token verification.
initializeApp({ projectId: 'cloud-320d1' });

// Simple in-memory usage tracking persisted to disk
const USAGE_FILE = path.join(process.cwd(), 'ai_usage.json');
let usageCache: Record<string, { count: number; date: string }> = {};
try {
  if (fs.existsSync(USAGE_FILE)) {
    usageCache = JSON.parse(fs.readFileSync(USAGE_FILE, 'utf-8'));
  }
} catch (e) {
  console.warn("Could not read ai_usage.json");
}

function saveUsage() {
  try {
    fs.writeFileSync(USAGE_FILE, JSON.stringify(usageCache));
  } catch (e) {
    console.error("Could not write ai_usage.json", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Help API Route
  app.post("/api/ai-help", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid authorization token" });
      }

      const token = authHeader.split(" ")[1];
      let decodedToken;
      try {
        decodedToken = await getAuth().verifyIdToken(token);
      } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const uid = decodedToken.uid;
      const today = new Date().toISOString().split("T")[0];

      // Check daily limit
      const userUsage = usageCache[uid] || { count: 0, date: today };
      if (userUsage.date !== today) {
        userUsage.count = 0;
        userUsage.date = today;
      }

      if (userUsage.count >= 6) {
        return res.status(429).json({ error: "You've used today's AI help. Your 6 AI helps reset tomorrow." });
      }

      const { question, courseTitle, moduleTitle, lessonTitle, lessonContent } = req.body;
      if (!question) {
        return res.status(400).json({ error: "Question is required" });
      }

      // Check for Gemini API key
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert coding teacher helping a student in the CLOUD platform.
The student is currently working on:
Course: ${courseTitle}
Module: ${moduleTitle}
Lesson: ${lessonTitle}

Lesson Content Context:
${lessonContent}

Student's Request/Question: ${question}

Instructions:
- Act as a supportive coding teacher.
- Do NOT simply give them the exact final answer if they are asking for a solution to an exercise.
- Provide hints, alternative explanations, simpler analogies, or related examples to help them learn.
- Structure your response like polished educational content:
  - Use clear headings (###) and subheadings.
  - Break long explanations into short, readable paragraphs (1-3 sentences max).
  - Use bullet points and numbered lists where appropriate to make concepts easy to scan.
  - Put code inside proper syntax-highlighted markdown code blocks.
  - Separate examples from explanations clearly.
  - Use **bold text** to emphasize important terms or core concepts.
  - Keep the response concise enough to read comfortably on a mobile screen.
  - Be conversational, friendly, and encouraging.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      // Increment limit ONLY after successful response
      userUsage.count += 1;
      usageCache[uid] = userUsage;
      saveUsage();

      return res.json({ 
        result: response.text,
        remaining: 6 - userUsage.count
      });

    } catch (error) {
      console.error("AI Help Error:", error);
      return res.status(500).json({ error: "An unexpected error occurred while processing your request." });
    }
  });

  // Get current AI limit API Route
  app.get("/api/ai-limit", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid authorization token" });
      }

      const token = authHeader.split(" ")[1];
      const decodedToken = await getAuth().verifyIdToken(token);
      const uid = decodedToken.uid;
      const today = new Date().toISOString().split("T")[0];

      const userUsage = usageCache[uid] || { count: 0, date: today };
      if (userUsage.date !== today) {
        userUsage.count = 0;
        userUsage.date = today;
      }

      return res.json({ remaining: 6 - userUsage.count });
    } catch (error) {
      console.error("AI Limit Error:", error);
      return res.status(500).json({ error: "Failed to get AI limit." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
