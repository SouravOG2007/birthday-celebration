import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getAdulthoodWisdom = async (topic: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `You are a wise, funny, and slightly sassy Oracle of Adulthood. 
    A user who just turned 18 is asking for advice about: "${topic}".
    
    Provide a short, memorable piece of advice (max 2 sentences). 
    Mix wisdom with a touch of humor. Keep it lighthearted but meaningful.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster response on simple queries
        temperature: 0.8,
      }
    });

    return response.text || "The stars are cloudy today... try asking again later.";
  } catch (error) {
    console.error("Error fetching wisdom:", error);
    return "Adulthood is about handling errors gracefully. (System Error: Please try again).";
  }
};