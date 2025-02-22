import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBE-494wp1iVNLs71Tdrf7ya0lWtzHdQtw");

// Helper function to convert File to base64
async function fileToGenerativeAI(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Get the base64 string (remove the data URL prefix)
      const base64String = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type
        }
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function processImage(imageFile) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-vision" });
    const base64Image = await fileToGenerativeAI(imageFile);
    const result = await model.generateContent([
      "Analyze this image and provide detailed information about what you see.",
      base64Image
    ]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

export async function processImageWithPrompt(imageFile, prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-vision" });
    const base64Image = await fileToGenerativeAI(imageFile);
    const result = await model.generateContent([
      prompt || "Analyze this image and provide detailed information about what you see.",
      base64Image
    ]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

// Voice recognition service
export function startVoiceRecognition() {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window)) {
      reject(new Error('Speech recognition is not supported in this browser.'));
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };

    recognition.onerror = (event) => {
      reject(new Error('Speech recognition error: ' + event.error));
    };

    recognition.start();
  });
} 