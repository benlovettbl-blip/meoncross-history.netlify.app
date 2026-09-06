/**
 * Pedagogical Quizzing Enrichment Helper
 * Standardizes question construction, balanced option positioning, and rich feedback.
 */

function makeQuestion(
  qText,
  correctAns,
  distractor1,
  distractor2,
  distractor3,
  explanation,
  targetSlot = null,
) {
  const options = [correctAns, distractor1, distractor2, distractor3];

  // Deterministic slot (0 = A, 1 = B, 2 = C, 3 = D) or balanced assignment
  const targetIdx = targetSlot !== null ? targetSlot : Math.floor(Math.random() * 4);

  // Swap correctAns into targetIdx
  const temp = options[targetIdx];
  options[targetIdx] = correctAns;
  options[0] = temp;

  return {
    question: qText,
    q: qText,
    options: options,
    answer: correctAns,
    a: correctAns,
    explanation: explanation,
  };
}

module.exports = { makeQuestion };
