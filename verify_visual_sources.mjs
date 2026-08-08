import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function verifyImage(lessonId, imagePath, context, caption) {
    if (!imagePath) return null;
    const fullPath = path.resolve(__dirname, 'public', imagePath.split('?')[0].replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
        return `[ ] ${lessonId}: ERROR - Image file not found at ${fullPath}`;
    }

    const imageBytes = fs.readFileSync(fullPath).toString("base64");
    
    const prompt = `
Caption: ${caption || 'N/A'}
Context / Description: ${context || 'N/A'}

Look closely at the provided image. Does the visual content of the image accurately match the description in the Context and Caption?
If the text describes a specific scene (like a courtyard, a map, a specific person, a crowd) and the image shows something else (like a generic landscape, the wrong person, or a modern photo), that is a mismatch.
If it matches perfectly, reply with exactly "MATCH".
If it is a mismatch, reply with "MISMATCH: " followed by a brief 1-sentence explanation of what the image ACTUALLY shows compared to what the text claims it shows.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: [
                prompt,
                { inlineData: { data: imageBytes, mimeType: 'image/jpeg' } }
            ]
        });
        
        const result = response.text.trim();
        if (result === 'MATCH') {
            return `[x] ${lessonId}: Verified correctly. (${imagePath})`;
        } else {
            return `[ ] ${lessonId}: FAILED - ${result} (Image: ${imagePath})`;
        }
    } catch (e) {
        return `[ ] ${lessonId}: API Error - ${e.message}`;
    }
}

async function runAudit() {
    const unitName = process.argv[2];
    if (!unitName) {
        console.error("Please provide a unit folder name, e.g. node verify_visual_sources.mjs early_modern_world");
        return;
    }
    
    const dataPath = path.join(__dirname, 'public', 'units', unitName, 'data.js');
    if (!fs.existsSync(dataPath)) {
        console.error("Data file not found:", dataPath);
        return;
    }
    
    let raw = fs.readFileSync(dataPath, 'utf8');
    const match = raw.match(/export const unitData = ([\s\S]+)/);
    if (!match) return;
    let dataStr = match[1];
    if (dataStr.endsWith(';')) dataStr = dataStr.slice(0, -1);
    if (dataStr.endsWith(';\n')) dataStr = dataStr.slice(0, -2);
    
    let data;
    try { data = eval('(' + dataStr + ')'); } catch(e) { console.error(e); return; }
    
    console.log(`Verifying visual sources for unit: ${unitName} using Gemini Vision...`);
    
    for (const l of data.lessons) {
        if (!l.narrative_blocks) continue;
        for (let i = 0; i < l.narrative_blocks.length; i++) {
            const b = l.narrative_blocks[i];
            if (b.image) {
                const context = b.image_context || b.text || "";
                const result = await verifyImage(`Lesson ${l.id} - Block ${i+1}`, b.image, context, b.image_caption || b.image_alt);
                if (result) {
                    console.log(result);
                    // Add a tiny delay to avoid hitting rate limits
                    await new Promise(r => setTimeout(r, 2000));
                }
            }
        }
    }
    console.log("Visual Audit Complete.");
}

runAudit();
