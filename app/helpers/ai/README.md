# AI Helpers - Usage Guide

This directory contains all AI-related functionality for InkSight, including prompt engineering and insight generation.

## 📁 Files Overview

### `prompts.ts`

Contains all system prompts and formatting functions for the three AI modes:

- **Insights Generation**: Analyzes journal entries and provides feedback
- **Reflection Chatbot**: Facilitates deeper conversation about entries
- **OCR Correction**: Fixes errors from handwritten text scanning

### `insightsGenerator.ts`

Core functions that combine prompts with the Gemini API service.

## 🚀 Usage Examples

### 1. Processing a Scanned Journal Entry (with OCR)

```typescript
import { performOCR } from "../../services/ocr";
import { correctOcrText, generateInsights } from "./insightsGenerator";

async function processScannedEntry(imageFormData: FormData) {
  try {
    // Step 1: Extract text from image using OCR
    const rawOcrText = await performOCR(imageFormData);
    console.log("Raw OCR:", rawOcrText);
    // Output: "1 had a terrlble day tod4y. My b0ss was meanand..."

    // Step 2: Correct OCR errors using AI
    const correctedText = await correctOcrText(rawOcrText);
    console.log("Corrected:", correctedText);
    // Output: "I had a terrible day today. My boss was mean and..."

    // Step 3: Generate insights from the corrected text
    const insights = await generateInsights(correctedText);
    console.log("Insights:", insights);
    // Output: Structured feedback with emotional analysis, themes, etc.

    return { correctedText, insights };
  } catch (error) {
    console.error("Error processing scanned entry:", error);
    throw error;
  }
}
```

### 2. Processing a Digital Journal Entry (Manual Input)

```typescript
import { generateInsights } from "./insightsGenerator";

async function processDigitalEntry(journalText: string) {
  try {
    // Digital entries don't need OCR correction
    // Directly generate insights
    const insights = await generateInsights(journalText);

    console.log("Insights:", insights);
    return insights;
  } catch (error) {
    console.error("Error processing digital entry:", error);
    throw error;
  }
}

// Example usage
const userEntry = `
Today was challenging. I felt overwhelmed at work with multiple 
deadlines approaching. But I managed to complete two important tasks 
and even helped a colleague. I'm proud of staying focused despite 
the pressure.
`;

const insights = await processDigitalEntry(userEntry);
```

### 3. Reflection Chat Session

```typescript
import { generateReflectionResponse } from "./insightsGenerator";

// After insights have been generated, user can chat about their entry
async function handleChatMessage(originalEntry: string, userMessage: string) {
  try {
    const response = await generateReflectionResponse(
      originalEntry,
      userMessage
    );

    return response;
  } catch (error) {
    console.error("Error in chat:", error);
    throw error;
  }
}

// Example conversation flow
const journalEntry = "Today I felt overwhelmed...";
const userMsg1 = "Why do I always feel this way?";
const aiResponse1 = await handleChatMessage(journalEntry, userMsg1);
// AI responds with empathetic, reflective questions

const userMsg2 = "I think it's because I take on too much...";
const aiResponse2 = await handleChatMessage(journalEntry, userMsg2);
// AI explores this insight further with the user
```

### 4. Complete Workflow in a Screen Component

```typescript
import { useState } from "react";
import { Alert } from "react-native";
import { performOCR } from "../../services/ocr";
import {
  correctOcrText,
  generateInsights,
} from "../../helpers/ai/insightsGenerator";

export function ProcessingScreen() {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);

  async function handleImageSubmit(imageUri: string) {
    setLoading(true);
    try {
      // Convert image to FormData
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "journal.jpg",
      } as any);

      // Process through OCR pipeline
      const rawText = await performOCR(formData);
      const cleanText = await correctOcrText(rawText);
      const generatedInsights = await generateInsights(cleanText);

      setInsights(generatedInsights);

      // Navigate to results screen or display insights
    } catch (error) {
      Alert.alert("Error", "Failed to process your journal entry");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ... rest of component
}
```

## 🎯 Prompt Engineering Details

### Insights Generation Prompt

**Purpose**: Provide comprehensive feedback on journal entries  
**Output Structure**:

- 📝 Writing Feedback
- 💭 Emotional Tone
- 🎯 Key Themes
- 🔍 Reflections & Observations
- ✨ Questions for Deeper Reflection
- 💪 Strengths Noticed

**Key Features**:

- Non-judgmental and supportive tone
- Preserves user's authentic voice
- Balances criticism with validation
- Encourages self-discovery

### Reflection Chatbot Prompt

**Purpose**: Facilitate deeper exploration through conversation  
**Approach**: Socratic dialogue with active listening  
**Key Features**:

- Open-ended questions
- Contextual awareness of journal entry
- Validates emotions
- Encourages self-directed insights

### OCR Correction Prompt

**Purpose**: Clean up scanning errors while preserving authenticity  
**Key Features**:

- Fixes technical OCR errors only
- Maintains original writing style
- Preserves informal language and emotion
- No stylistic "improvements"

## ⚙️ Configuration

The prompts are optimized for **Gemini Flash Lite** models:

- `gemini-2.0-flash-lite`
- `gemini-2.5-flash-lite-preview-06-17`

These models provide:

- Fast response times (ideal for mobile)
- Good quality for journaling use case
- Cost-effective at scale

## 🔧 Customization

To adjust prompt behavior, edit the system prompts in `prompts.ts`:

```typescript
export const insightsGenerationPrompt = `
  // Modify tone, structure, or objectives here
  // Changes will affect all insight generation
`;
```

## 📊 Expected Response Times

- **OCR Correction**: ~2-4 seconds
- **Insights Generation**: ~3-6 seconds
- **Chat Response**: ~1-3 seconds

_Times vary based on text length and API latency_

## 🚨 Error Handling

All functions throw errors that should be caught and handled:

```typescript
try {
  const insights = await generateInsights(text);
} catch (error) {
  // Handle API failures, network issues, etc.
  console.error("Failed to generate insights:", error);
  // Show user-friendly error message
}
```

## 🔐 Environment Variables Required

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
EXPO_PUBLIC_OCR_API_KEY=your_ocr_api_key_here
```

## 📝 Best Practices

1. **Always correct OCR text** before generating insights
2. **Cache journal entries** and insights locally (SQLite)
3. **Implement loading states** for better UX
4. **Handle errors gracefully** with user-friendly messages
5. **Rate limit API calls** if processing multiple entries
6. **Validate text length** before sending (avoid empty entries)

## 🎨 Future Enhancements

- [ ] Add mood detection/classification
- [ ] Implement keyword/tag extraction
- [ ] Generate writing improvement suggestions over time
- [ ] Add language translation support
- [ ] Implement conversation memory for multi-turn chat
- [ ] Add sentiment analysis scoring
