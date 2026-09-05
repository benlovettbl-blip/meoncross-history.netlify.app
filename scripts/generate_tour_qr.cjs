const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const url = 'https://meoncross-history.netlify.app/?view=lessons&unit=trip_ypres&lesson=1';
const outputDir = path.join(__dirname, '../public/images');
const outputPath = path.join(outputDir, 'tour_app_qr.png');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

QRCode.toFile(
  outputPath,
  url,
  {
    errorCorrectionLevel: 'H',
    type: 'png',
    quality: 0.95,
    margin: 1,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
    width: 400,
  },
  function (err) {
    if (err) throw err;
    console.log('✅ QR Code generated successfully at: ' + outputPath);
  },
);
