import fs from 'fs';

const head = `<!DOCTYPE html>
<html lang="en" data-theme="desert">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edexcel GCSE History Paper 2: Conflict in the Middle East, 1945-1995</title>
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Google Fonts for Handwriting effect -->
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@400;700&display=swap" rel="stylesheet">
  <!-- Stylesheet -->
  <link rel="stylesheet" href="style.css?v=18">
  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
</head>
<body>

  <!-- PACK OPENING OVERLAY -->
  <div id="pack-opening-overlay" class="pack-opening-overlay">
    <div class="pack-opening-title">NEW CARD UNLOCKED!</div>
    <div class="pack-opening-card-wrapper" id="pack-opening-card-wrapper">
      <div class="gpk-card-unlocked" id="pack-opening-card-image" style="background-image: url('');"></div>
    </div>
    <button class="btn-collect-card" onclick="document.getElementById('pack-opening-overlay').classList.remove('active')">
      Collect Card
    </button>
  </div>

  <!-- Confetti Canvas for Celebrating Mastered Topics -->
  <canvas id="confetti-canvas"></canvas>

  <div class="app-container">
`;

const content = fs.readFileSync('index.html', 'utf8');
fs.writeFileSync('index.html', head + content);
console.log("Restored index.html head!");
