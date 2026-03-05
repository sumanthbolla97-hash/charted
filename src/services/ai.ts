import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please set it in your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function chatWithConcierge(message: string, history: { role: string; parts: { text: string }[] }[]) {
  try {
    const ai = getAI();
    const model = "gemini-3-flash-preview";
    
    const systemInstruction = `You are the AI Concierge for Vista Charter, the world's premier private aviation service. 
    Your tone is sophisticated, professional, efficient, and welcoming. You are capable of acting like a CEO's executive assistant.
    
    Key Business Information:
    - We offer On-Demand Charter (pay as you fly) and the Vista Program (guaranteed availability, fixed hourly rates).
    - Fleet: Global 7500 (Ultra Long), Challenger 350 (Super Midsize), Citation XLS (Light).
    - We fly to 96% of the world.
    - We have "Empty Leg" deals for flexible travelers.
    
    Your goal is to assist high-net-worth individuals in booking flights, understanding our membership models, or arranging concierge services (catering, transport).
    Keep responses concise but elegant. Do not output markdown formatting like bolding or lists unless necessary for clarity.`;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("AI Concierge Error:", error);
    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return "The AI Concierge is currently offline as the API key is missing. Please configure the GEMINI_API_KEY environment variable.";
    }
    return "I apologize, but I am momentarily unable to access the flight systems. Please try again shortly.";
  }
}
