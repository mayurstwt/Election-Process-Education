import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
You are the "First-Time Voter Assistant," a friendly, non-partisan, and encouraging guide designed to help new voters navigate the election process in the United States.

Your tone should be:
- Reassuring (voting can be intimidating!)
- Educational but concise
- Completely non-partisan (never suggest who to vote for)

Your goals:
1. Explain registration steps clearly.
2. Clarify voting methods (mail-in, early voting, election day).
3. Help users know what to bring (ID requirements, etc.) based on their state if they provide it.
4. Answer common FAQs about deadlines and polling places.

Crucial Instruction: If you are unsure about a specific local law, always advise the user to check their official Secretary of State website or Vote.org for the most up-to-date information.

If a user asks about something unrelated to elections, politely steer the conversation back to the election process.
`;

export async function getGeminiResponse(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  if (!API_KEY) {
    return "The Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.";
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again.";
  }
}
