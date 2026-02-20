
import { GoogleGenAI } from "@google/genai";

export async function askServoSkull(prompt: string, characterContext: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    return response.text || "Cognitive error: Data link severed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error in Cogitator processing. Please verify the machine spirit.";
  }
}
