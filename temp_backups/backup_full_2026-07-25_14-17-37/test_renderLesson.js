const fs = require('fs');

const dataCode = fs.readFileSync('edexcel_medicine/data.js', 'utf8').replace(/export\s+default\s+/, '').replace(/;$/, '');
const lastBrace = dataCode.lastIndexOf('}');
const dataObj = eval('(' + dataCode.substring(0, lastBrace + 1) + ')');

const lesson1 = dataObj.lessons[0];

const getNewRenderLesson = require('./new_renderLesson.js');
let renderFuncCode = getNewRenderLesson();

// Mock globals needed by renderLesson
global.formatBold = text => text;
global.getAssetUrl = src => src;
global.assignQuestionNumbers = lesson => {};
global.window = {
  currentActiveLesson: null,
  currentUnitId: 'edexcel_medicine',
  vocabMatchesFound: 0
};
global.unitEnquiryText = 'How has medicine changed?';
global.contentArea = { innerHTML: '' };
global.setTimeout = () => {};

// Evaluate the string to get the function
eval(renderFuncCode + '\n global.renderLesson = renderLesson;');

try {
  global.renderLesson(lesson1);
  console.log("Success! HTML Length:", global.contentArea.innerHTML.length);
} catch (e) {
  console.error("Error during render:", e);
}
