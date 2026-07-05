/**
 * Markdown Parser for Meoncross History Mega App
 * Parses topic markdown files dynamically into curriculum objects and quiz databases.
 */

export function parseMarkdown(mdText, unitId) {
  const sections = mdText.split(/\n## /);
  
  // Extract Frontmatter
  const frontmatterMatch = sections[0].match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  let metadata = {
    id: unitId,
    title: 'Unknown Unit',
    year_group: 'KS3',
    unlocked_for: []
  };

  if (frontmatterMatch) {
    const lines = frontmatterMatch[1].split('\n');
    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        if (key === 'unlocked_for') {
          try {
            metadata[key] = JSON.parse(value);
          } catch (e) {
            metadata[key] = value.split(',').map(s => s.trim());
          }
        } else {
          metadata[key] = value.replace(/^['"]|['"]$/g, '');
        }
      }
    });
    // Remove frontmatter from the first section content
    sections[0] = sections[0].replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  }

  const subtopics = [];
  const timelineEvents = [];
  const quizData = [];

  // Parse sections (each is a subtopic)
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const lines = section.split('\n');
    const title = lines[0].trim();
    const contentLines = [];
    
    let subtopicId = `${unitId}_sub_${i}`;
    let parsingMode = 'content'; // 'content' | 'fitb' | 'vocab' | 'tf' | 'retrieval'
    
    let part1 = { text: '', words: [] };
    let part2 = [];
    let part3 = [];
    let currentQuestion = null;

    for (let j = 1; j < lines.length; j++) {
      const line = lines[j].trim();
      if (!line) continue;

      if (line.startsWith('### Fill-in-the-Blanks')) {
        parsingMode = 'fitb';
        continue;
      } else if (line.startsWith('### Vocabulary')) {
        parsingMode = 'vocab';
        continue;
      } else if (line.startsWith('### True or False')) {
        parsingMode = 'tf';
        continue;
      } else if (line.startsWith('### Retrieval Questions')) {
        parsingMode = 'retrieval';
        continue;
      } else if (line.startsWith('### Timeline')) {
        parsingMode = 'timeline';
        continue;
      }

      if (parsingMode === 'content') {
        contentLines.push(lines[j]); // Keep original spacing for content rendering
      } else if (parsingMode === 'fitb') {
        if (line.startsWith('Text:')) {
          part1.text = line.substring(5).trim();
        } else if (line.startsWith('Words:')) {
          part1.words = line.substring(6).split(',').map(w => w.trim());
        }
      } else if (parsingMode === 'vocab') {
        // Format: - **Term**: definition
        const match = line.match(/^-\s*\*\*(.*?)\*\*:\s*(.*)/);
        if (match) {
          part2.push({ term: match[1].trim(), def: match[2].trim() });
        }
      } else if (parsingMode === 'tf') {
        // Format: - Statement text. (True/False)
        const match = line.match(/^-\s*(.*)\((True|False)\)/i);
        if (match) {
          part3.push({ text: match[1].trim(), ans: match[2].trim() });
        }
      } else if (parsingMode === 'retrieval') {
        if (line.startsWith('- **Question**:')) {
          if (currentQuestion) quizData.push(currentQuestion);
          currentQuestion = {
            id: `q_${subtopicId}_${quizData.length + 1}`,
            question: line.substring(15).trim(),
            answer: '',
            explanation: '',
            distractors: []
          };
        } else if (currentQuestion && line.startsWith('- **Answer**:')) {
          currentQuestion.answer = line.substring(13).trim();
        } else if (currentQuestion && line.startsWith('- **Distractor**:')) {
          currentQuestion.distractors.push(line.substring(17).trim());
        } else if (currentQuestion && line.startsWith('- **Explanation**:')) {
          currentQuestion.explanation = line.substring(18).trim();
        }
      } else if (parsingMode === 'timeline') {
        // Format: - **1066**: Event description
        const match = line.match(/^-\s*\*\*(.*?)\*\*:\s*(.*)/);
        if (match) {
          timelineEvents.push({
            year: match[1].trim(),
            text: match[2].trim(),
            subtopicId: subtopicId
          });
        }
      }
    }

    if (currentQuestion) {
      quizData.push(currentQuestion);
    }

    subtopics.push({
      id: subtopicId,
      title: title,
      content: contentLines.join('\n'),
      part1,
      part2,
      part3
    });
  }

  return {
    metadata,
    subtopics,
    timelineEvents,
    quizData
  };
}
