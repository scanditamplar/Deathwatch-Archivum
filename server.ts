import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Gemini
  app.post("/api/gemini", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is required');
      }

      const { prompt, characterContext } = req.body;
      const ai = new GoogleGenAI({ apiKey });
      const model = 'gemini-3-flash-preview';

      const systemInstruction = `
        You are a Servo-Skull data-archivist serving the Deathwatch of the Ordo Xenos. 
        Your tone is gothic, grim, and highly technical. 
        Refer to the user as 'Brother' or 'Honored Battle-Brother'.
        You provide lore information about the FFG Deathwatch RPG, help with character creation, 
        and offer suggestions for tactics based on the character's chapter and stats.
        Keep answers concise but flavor-rich.
        Context of current character: ${characterContext}
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      
      res.json({ text: response.text || "Cognitive error: Data link severed." });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Error in Cogitator processing. Please verify the machine spirit." });
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
    // Note: express version of the app might be v5 in package.json
    // so we use '*all' or '*' depending. Since Express installed was v5.2, we must use '*all'.
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
