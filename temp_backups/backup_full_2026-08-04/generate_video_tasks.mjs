import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the API key works
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const genericTasks = [
    "Watch the material and note down key points.",
    "Watch the video and note down 3 key points.",
    "Answers will vary."
];

async function generateTasksForTranscript(title, transcript) {
    const prompt = `
You are an expert history teacher. I will provide you with a transcript for a historical video titled "${title}".
I want you to generate a 3-part viewing task for a KS4 (GCSE) student.

The 3 questions MUST follow this exact pedagogical framework:
1. **Recall:** One specific, low-stakes factual retrieval question that forces them to actively listen for a detail early in the video.
2. **Explain:** One cause/consequence question asking them to explain the relationship between two events mentioned in the transcript.
3. **Challenge:** One question asking them to analyze the tone, perspective, or language used by the narrator/source.

Output a JSON object with exactly two properties:
- "viewing_task": A string containing the questions formatted in HTML. e.g., "<ol><li>Recall question...</li><li>Explain question...</li><li>Challenge question...</li></ol>"
- "model_answer": A string containing the model answers formatted in HTML. e.g., "<ol><li>Answer 1...</li><li>Answer 2...</li><li>Answer 3...</li></ol>"

Transcript:
${transcript}
`;
    
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3.6-flash",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });
        
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text);
    } catch (e) {
        console.error("Error generating from Gemini:", e.message);
        return null;
    }
}

async function processUnit(unitId) {
    const dataPath = path.join(__dirname, 'public', 'units', unitId, 'data.js');
    if (!fs.existsSync(dataPath)) return;
    
    let content = fs.readFileSync(dataPath, 'utf8');
    
    const videoObjRegex = /\{\s*"type":\s*"youtube"[\s\S]*?"url":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"viewing_task":\s*"([^"]+)"[\s\S]*?"model_answer":\s*"([^"]+)"\s*\}/g;
    
    let match;
    let modified = false;
    let newContent = content;
    
    const matches = [];
    while ((match = videoObjRegex.exec(content)) !== null) {
        matches.push({
            fullMatch: match[0],
            url: match[1],
            title: match[2],
            viewingTask: match[3],
            modelAnswer: match[4]
        });
    }
    
    for (const m of matches) {
        if (genericTasks.includes(m.viewingTask)) {
            console.log(`Processing: ${m.title} (${m.url})`);
            try {
                // Get transcript
                const transcriptBlocks = await YoutubeTranscript.fetchTranscript(m.url);
                if (!transcriptBlocks || transcriptBlocks.length === 0) {
                    console.log(`No transcript found for ${m.url}`);
                    continue;
                }
                const fullTranscript = transcriptBlocks.map(t => t.text).join(' ');
                
                // Generate
                const generated = await generateTasksForTranscript(m.title, fullTranscript);
                if (generated && generated.viewing_task && generated.model_answer) {
                    let newBlock = m.fullMatch.replace(
                        /"viewing_task":\s*"([^"]+)"/,
                        `"viewing_task": ${JSON.stringify(generated.viewing_task)}`
                    );
                    newBlock = newBlock.replace(
                        /"model_answer":\s*"([^"]+)"/,
                        `"model_answer": ${JSON.stringify(generated.model_answer)}`
                    );
                    
                    newContent = newContent.replace(m.fullMatch, newBlock);
                    modified = true;
                    console.log(`✅ Generated tasks for: ${m.title}`);
                }
            } catch (e) {
                console.error(`Failed to process ${m.url}: ${e.message}`);
            }
            
            // Sleep a bit to avoid rate limits
            await new Promise(r => setTimeout(r, 2000));
        }
    }
    
    if (modified) {
        fs.writeFileSync(dataPath, newContent, 'utf8');
        console.log(`Updated ${unitId}/data.js`);
    } else {
        console.log(`No updates needed for ${unitId}`);
    }
}

async function main() {
    const unitsDir = path.join(__dirname, 'public', 'units');
    const units = fs.readdirSync(unitsDir);
    for (const unit of units) {
        if (fs.statSync(path.join(unitsDir, unit)).isDirectory()) {
            await processUnit(unit);
        }
    }
    console.log("All done.");
}

main();
