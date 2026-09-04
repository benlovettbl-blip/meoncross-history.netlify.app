const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'units', 'edexcel_medicine');

const imageMap = {
  renaissance: 'authentic_renaissance.jpg',
  '18th_19th': 'authentic_18th_19th.jpg',
  modern: 'authentic_modern.jpg',
  western_front: 'authentic_western_front.jpg',
};

// The image block to inject — same structure as medieval
const makeImageBlock = (imgFilename) => `
      <div
        style="
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8fafc;
          min-height: 0;
        "
      >
        <img
          src="../../units/edexcel_medicine/assets/${imgFilename}"
          style="max-height: 100%; max-width: 100%; width: 100%; object-fit: cover; display: block"
        />
      </div>
`;

// The anchor point to inject before: the dark footer bar on the cover (inline style version)
const INJECT_BEFORE = `      <div style="background-color: #1e293b; color: #ffffff; padding: 8px 20px; font-size: 11pt; letter-spacing: 2px; text-transform: uppercase; text-align: center; font-weight: bold; width: 100%; box-sizing: border-box;">
        Meoncross School | History Department
      </div>`;

Object.entries(imageMap).forEach(([period, imgFile]) => {
  const filePath = path.join(dir, `pupil_workbook_${period}.html`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Only inject if image is not already present
  if (content.includes(imgFile)) {
    console.log(`${period}: Image already present, skipping.`);
    return;
  }

  if (!content.includes(INJECT_BEFORE)) {
    console.warn(`${period}: Could not find injection anchor in HTML.`);
    return;
  }

  content = content.replace(INJECT_BEFORE, makeImageBlock(imgFile) + INJECT_BEFORE);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`${period}: ✅ Injected cover image`);
});
