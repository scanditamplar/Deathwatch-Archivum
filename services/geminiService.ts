
export async function askServoSkull(prompt: string, characterContext: string): Promise<string> {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, characterContext })
    });
    
    const data = await response.json();
    return data.text || "Cognitive error: Data link severed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error in Cogitator processing. Please verify the machine spirit.";
  }
}
