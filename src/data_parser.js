/**
 * Centralized parsing utility for cleaning up curriculum data text.
 * Ensures both the web app and workbooks use the exact same normalization rules.
 */

export function cleanQuestionText(text) {
  if (!text) return "";
  
  return text
    // 1. Remove specific pedagogical prefixes
    .replace(/^Recall from (last|previous) lesson(s)?:\s*/i, "")
    .replace(/^PAST TOPIC:\s*/i, "")
    .replace(/^Enquiry:\s*/i, "")
    .replace(/^Predict:\s*/i, "")
    // 2. Remove variations of question/task numbering (e.g., "1. ", "Q1: ", "Task 2: ", "Question 3a: ", "Enquiry Task: ")
    .replace(/^(Q\d+[:.]? |Task \d+[:.]? |Question \d+[a-z]?[:.]? |Enquiry Task[:.]? |\d+\.\s*)/i, "")
    // 3. Remove paragraph references like (P1), (Para 2), (Ext P1-2)
    .replace(/\s*\((P|Para\s*)\d+\)/gi, "")
    .replace(/\s*\(Ext P\d+(-\d+)?\)/gi, "")
    .trim();
}

/**
 * Deeply sanitizes a lesson object by applying cleanQuestionText to all relevant fields.
 * Used if we want to clean the object in-place before rendering.
 */
export function sanitizeLessonData(lesson) {
  if (!lesson) return lesson;
  
  if (lesson.primary_source && lesson.primary_source.question) {
    lesson.primary_source.question = cleanQuestionText(lesson.primary_source.question);
  }
  
  if (lesson.do_now) {
    if (lesson.do_now.prediction_question) {
      lesson.do_now.prediction_question = cleanQuestionText(lesson.do_now.prediction_question);
    }
    if (lesson.do_now.items) {
      lesson.do_now.items.forEach(item => {
        if (item.question) item.question = cleanQuestionText(item.question);
      });
    }
  }
  
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      if (block.tasks) {
        block.tasks.forEach(task => {
          if (task.text) task.text = cleanQuestionText(task.text);
        });
      }
    });
  }
  
  if (lesson.tasks) {
    lesson.tasks.forEach(task => {
      if (task.text) task.text = cleanQuestionText(task.text);
    });
  }
  
  if (lesson.extended && lesson.extended.question) {
    lesson.extended.question = cleanQuestionText(lesson.extended.question);
  }
  
  if (lesson.summary && lesson.summary.question) {
    lesson.summary.question = cleanQuestionText(lesson.summary.question);
  }
  
  return lesson;
}
