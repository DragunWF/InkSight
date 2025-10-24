import { generateText } from "../../services/gemini";
import {
  formatOcrTextPrompt,
  formatInsightsGenerationPrompt,
  formatReflectionChatbotPrompt,
} from "./prompts";

/**
 * Generates AI-powered insights from a journal entry text.
 * This is the main function that processes either OCR-scanned or manually entered text
 * and returns personalized feedback, emotional analysis, and reflective questions.
 *
 * @param text - The journal entry text to analyze (already cleaned if from OCR)
 * @returns Promise resolving to the AI-generated insights as formatted text
 * @throws Error if the Gemini API call fails
 *
 * @example
 * const insights = await generateInsights("Today was a challenging day...");
 * console.log(insights); // Returns structured insights with feedback and reflections
 */
export async function generateInsights(text: string): Promise<string> {
  const prompt = formatInsightsGenerationPrompt(text);
  return await generateText(prompt);
}

/**
 * Corrects OCR errors in scanned text using AI.
 * This function sends raw OCR output to the AI model which fixes common scanning errors
 * like character substitutions, spacing issues, and misrecognized punctuation while
 * preserving the author's original voice and writing style.
 *
 * @param ocrText - Raw text extracted from OCR scanning (may contain errors)
 * @returns Promise resolving to the corrected, clean text ready for insight generation
 * @throws Error if the Gemini API call fails
 *
 * @example
 * const rawOcr = "1 had a terrlble day tod4y";
 * const corrected = await correctOcrText(rawOcr);
 * console.log(corrected); // "I had a terrible day today"
 */
export async function correctOcrText(ocrText: string): Promise<string> {
  const prompt = formatOcrTextPrompt(ocrText);
  const aiCorrectedOcrText = await generateText(prompt);
  return aiCorrectedOcrText.replace("\n", " ");
}

/**
 * Generates a conversational response for the reflection chatbot.
 * Used after insights have been generated to facilitate deeper exploration
 * of the user's thoughts and feelings through dialogue.
 *
 * @param journalEntry - The original journal entry text for context
 * @param userMessage - The user's current question or message in the chat
 * @returns Promise resolving to the chatbot's empathetic, reflective response
 * @throws Error if the Gemini API call fails
 *
 * @example
 * const response = await generateReflectionResponse(
 *   "Today I felt overwhelmed...",
 *   "Why do I always feel this way?"
 * );
 * console.log(response); // Returns supportive conversational response
 */
export async function generateReflectionResponse(
  journalEntry: string,
  userMessage: string
): Promise<string> {
  const prompt = formatReflectionChatbotPrompt(journalEntry, userMessage);
  return await generateText(prompt);
}
