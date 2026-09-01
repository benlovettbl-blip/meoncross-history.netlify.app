import fs from 'fs';
import path from 'path';

const unitsDir = path.join(process.cwd(), 'public', 'units');
const unitFolders = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

const report = {};

for (const unit of unitFolders) {
  const dataPath = path.join(unitsDir, unit, 'data.js');
  if (!fs.existsSync(dataPath)) continue;
  
  try {
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    const match = dataContent.match(/export const unitData = ([\s\S]+);/);
    if (!match) continue;
    
    // Evaluate the object 
    const unitData = eval('(' + match[1] + ')');
    
    const issues = [];
    
    // Check lessons
    if (!unitData.lessons || unitData.lessons.length === 0) {
      issues.push("Unit has no lessons.");
    } else {
      unitData.lessons.forEach((lesson, idx) => {
        const lessonName = `Lesson ${idx + 1}: ${lesson.title || 'Untitled'}`;
        
        if (!lesson.teacher_notes) {
          issues.push(`${lessonName} - Missing teacher_notes entirely.`);
        } else {
          if (!lesson.teacher_notes.primer || lesson.teacher_notes.primer.includes("Placeholder") || lesson.teacher_notes.primer.includes("Explain the overarching pedagogical goal")) {
            issues.push(`${lessonName} - Missing or placeholder primer in teacher_notes.`);
          }
          if (!lesson.teacher_notes.objectives || lesson.teacher_notes.objectives.length === 0) {
            issues.push(`${lessonName} - Missing learning objectives.`);
          }
        }
        
        if (lesson.narrative_blocks) {
          lesson.narrative_blocks.forEach(block => {
            if (block.text && (block.text.includes("Placeholder content") || block.text.includes("Lorem ipsum"))) {
              issues.push(`${lessonName} - Contains placeholder text in narrative blocks.`);
            }
          });
        }
        
        // Count tasks across all possible locations
        let taskCount = 0;
        
        if (lesson.tasks) {
          taskCount += lesson.tasks.length;
        }
        
        if (lesson.narrative_blocks) {
          lesson.narrative_blocks.forEach(block => {
            if (block.tasks) {
              taskCount += block.tasks.length;
            }
          });
        }
        
        if (lesson.gcse_task && lesson.gcse_task.tasks) {
          taskCount += lesson.gcse_task.tasks.length;
        }
        
        if (lesson.do_now && lesson.do_now.items) {
          taskCount += lesson.do_now.items.length;
        }
        
        if (lesson.historians_corner && lesson.historians_corner.stretch_question) {
          taskCount += 1;
        }
        
        if (lesson.pair_share) {
          taskCount += 1;
        }
        
        if (taskCount === 0) {
            issues.push(`${lessonName} - Missing pupil tasks.`);
        }
      });
    }

    if (issues.length > 0) {
      report[unit] = issues;
    }

  } catch (e) {
    report[unit] = [`Error parsing data.js: ${e.message}`];
  }
}

fs.writeFileSync('audit_gaps_report.json', JSON.stringify(report, null, 2));
console.log("Audit complete. Written to audit_gaps_report.json.");
