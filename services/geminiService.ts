
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Message, QuizQuestion } from "../types";

// Initialize API Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateLessonIntro = async (
  topic: string, 
  grade: string, 
  language: 'en' | 'ta' | 'hi'
): Promise<string> => {
  try {
    const prompt = `
      You are a friendly, energetic, and encouraging elementary school teacher.
      Subject: ${topic}
      Grade Level: ${grade}
      Target Language: ${language === 'ta' ? 'Tamil (With simple English transliteration in brackets)' : language === 'hi' ? 'Hindi (With simple English transliteration in brackets)' : 'English'}
      
      Task: Introduce the topic to the student in 2-3 short sentences. 
      Use emojis. Be exciting! Ask a simple opening question to get them started.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "Hello! I'm ready to help you learn.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to my brain right now. Can we try again?";
  }
};

export const chatWithTutor = async (
  history: Message[], 
  newMessage: string,
  topic: string,
  grade: string,
  language: 'en' | 'ta' | 'hi'
): Promise<{text: string, visual_keyword?: string}> => {
  try {
    const systemInstruction = `
      You are a specialized AI Tutor for a child in Grade ${grade}.
      Current Topic: ${topic}.
      Language Mode: ${language === 'ta' ? 'Tamil (Include simple English transliteration)' : language === 'hi' ? 'Hindi (Include simple English transliteration)' : 'English'}.
      Tone: Encouraging, patient, simple language.
      
      CRITICAL: You must return your response in a structured JSON format.
      
      Structure:
      {
        "text": "Your verbal explanation here. Max 50 words. Use emojis.",
        "visual_keyword": "Optional. A simple 2-3 word noun phrase to generate a cartoon image if the concept can be visualized (e.g., '3 red apples', 'happy cat', 'triangle shape'). If no image needed, leave empty."
      }

      Rules:
      1. If the student is wrong, gently correct them.
      2. If the student is right, celebrate!
      3. Do NOT simply give answers to complex problems, guide them step-by-step.
      4. For Math/Science, always try to provide a 'visual_keyword'.
    `;

    const contents = [
      { role: 'user', parts: [{ text: `Context: I am learning ${topic}.` }] },
      ...history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: newMessage }] }
    ];

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents as any,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json"
      }
    });

    const rawText = response.text || "{}";
    try {
        return JSON.parse(rawText);
    } catch (e) {
        // Fallback if JSON parsing fails
        return { text: rawText, visual_keyword: undefined };
    }

  } catch (error) {
    console.error("Chat Error:", error);
    return { text: "Oops, I lost my train of thought. Try saying that again?" };
  }
};

export const generateQuizForTopic = async (topic: string, grade: string): Promise<QuizQuestion[]> => {
  try {
    const schema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          question: { type: Type.STRING },
          options: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          correctAnswerIndex: { type: Type.INTEGER },
          explanation: { type: Type.STRING }
        },
        required: ["id", "question", "options", "correctAnswerIndex", "explanation"]
      }
    };

    const prompt = `Generate 3 multiple-choice questions for a Grade ${grade} student about "${topic}". Questions should be simple.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as QuizQuestion[];
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [
      {
        id: 1,
        question: "What comes after 2?",
        options: ["1", "3", "4", "10"],
        correctAnswerIndex: 1,
        explanation: "The order is 1, 2, 3!"
      }
    ];
  }
};

export const generateTeacherInsight = async (studentData: any): Promise<string> => {
  try {
    const prompt = `
      Analyze this student performance data and give a 1-sentence summary for the teacher on what to focus on next.
      Data: ${JSON.stringify(studentData)}
    `;
    
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
    });
    return response.text || "Focus on weak areas.";
  } catch (e) {
    return "Unable to generate insight.";
  }
}

export const generateCurriculum = async (grade: string, subject: string): Promise<string> => {
  try {
    const prompt = `
      Generate a JSON list of 5 fundamental learning topics for ${grade} ${subject}.
      Format:
      [
        { "title": "Topic Name", "description": "Short description", "week": 1 }
      ]
      Return ONLY JSON.
    `;
    
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    });
    return response.text || "[]";
  } catch (e) {
    return "[]";
  }
}
