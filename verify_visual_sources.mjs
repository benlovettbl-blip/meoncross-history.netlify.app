import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { unitData } from './weimar_nazi_germany/data.js';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function verifyImage(lessonId, imagePath, title, caption) {
    const fullPath = path.resolve('public', imagePath.split('?')[0].substring(1));
    if (!fs.existsSync(fullPath)) {
        return `[ ] ${lessonId}: ERROR - Image file not found at ${fullPath}`;
    }

    const imageBytes = fs.readFileSync(fullPath).toString("base64");
    
    const prompt = `
Title: ${title}
Caption: ${caption || 'N/A'}

Look closely at the provided image. Does the image accurately match the description in the Title and Caption?
If it matches perfectly, reply with exactly "MATCH".
If the image shows something entirely different (e.g. a portrait of a single person instead of a large rally, or the wrong event), reply with "MISMATCH: " followed by a brief 1-sentence explanation of what the image ACTUALLY shows.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.1-pro-preview',
            contents: [
                prompt,
                { inlineData: { data: imageBytes, mimeType: 'image/jpeg' } }
            ]
        });
        
        const result = response.text.trim();
        if (result === 'MATCH') {
            return `[x] ${lessonId}: Verified correctly. (${title})`;
        } else {
            return `[ ] ${lessonId}: FAILED - ${result} (Expected: ${title})`;
        }
    } catch (e) {
        return `[ ] ${lessonId}: API Error - ${e.message}`;
    }
}

async function run() {
    console.log("Verifying 16 visual sources with Gemini Vision...");
    for (const l of unitData.lessons) {
        if (l.utility_starters && l.utility_starters.sources) {
            for (const s of l.utility_starters.sources) {
                if (s.type === 'visual') {
                    const result = await verifyImage(l.id, s.source, s.title, s.caption);
                    console.log(result);
                    // Wait a moment to avoid rate limits
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }
            }
        }
    }
}

run();
