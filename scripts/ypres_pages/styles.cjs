// Common styles for the 16-page A4 Tour Leader Field Companion
module.exports = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap');

    @page {
      size: 210mm 297mm; /* Standard A4 Portrait */
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 9.3pt;
      line-height: 1.44;
    }

    .page {
      width: 210mm;
      height: 297mm;
      padding: 10mm 12mm 9mm 12mm;
      position: relative;
      background: #ffffff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
    }

    .page:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }

    .header-bar {
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 4px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-shrink: 0;
    }

    .school-title {
      font-size: 11.5pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #1e3a8a;
      text-transform: uppercase;
      font-family: 'Outfit', sans-serif;
      line-height: 1.15;
    }

    .school-sub {
      font-size: 8.2pt;
      color: #475569;
      font-weight: 600;
      margin-top: 1.5px;
    }

    .partner-pill {
      background: #f1f5f9;
      border: 1.2px solid #cbd5e1;
      padding: 2.5px 8px;
      border-radius: 5px;
      text-align: right;
    }

    .partner-pill .brand {
      font-weight: 800;
      color: #b45309;
      font-size: 8.2pt;
      text-transform: uppercase;
    }

    .partner-pill .lead {
      font-size: 7.2pt;
      color: #334155;
      font-weight: 600;
    }

    h1, h2, h3, h4 {
      font-family: 'Playfair Display', Georgia, serif;
      margin: 0;
      color: #0f172a;
    }

    .page-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3px 0;
      gap: 6px;
    }

    .pitch-box {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-left: 5px solid #1e3a8a;
      border-radius: 6px;
      padding: 8px 12px;
    }

    .pitch-box .box-header {
      font-size: 8.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .pitch-box p {
      margin: 0;
      font-size: 8.8pt;
      color: #1e293b;
      line-height: 1.40;
    }

    .pitch-box p + p {
      margin-top: 4px;
    }

    .context-box {
      background: #f8fafc;
      border: 1.5px solid #e2e8f0;
      border-left: 5px solid #334155;
      border-radius: 6px;
      padding: 7px 12px;
    }

    .context-box .box-header {
      font-size: 8.8pt;
      font-weight: 800;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
    }

    .context-box p {
      margin: 0;
      font-size: 8.6pt;
      color: #334155;
      line-height: 1.38;
    }

    .context-box p + p {
      margin-top: 4px;
    }

    .look-fors-box {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-left: 5px solid #059669;
      border-radius: 6px;
      padding: 7px 12px;
    }

    .look-fors-box .box-header {
      font-size: 8.8pt;
      font-weight: 800;
      color: #065f46;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
    }

    .look-fors-list {
      margin: 0;
      padding-left: 16px;
      font-size: 8.6pt;
      color: #334155;
      line-height: 1.38;
    }

    .look-fors-list li {
      margin-bottom: 2.5px;
    }

    .look-fors-list li:last-child {
      margin-bottom: 0;
    }

    .hinge-box {
      background: #fffbeb;
      border: 1.5px solid #fde68a;
      border-left: 5px solid #d97706;
      border-radius: 6px;
      padding: 7px 12px;
    }

    .hinge-box .box-header {
      font-size: 8.6pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 2px;
    }

    .hinge-box p {
      margin: 0;
      font-size: 8.5pt;
      color: #451a03;
      line-height: 1.38;
      font-style: italic;
    }

    .hinge-box p + p {
      margin-top: 3.5px;
    }

    .poem-box {
      background: #fafaf9;
      border: 1.5px solid #e7e5e4;
      border-left: 4.5px solid #78716c;
      border-radius: 6px;
      padding: 7.5px 12px;
    }

    .poem-box .poem-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3.5px;
      border-bottom: 1px dashed #d6d3d1;
      padding-bottom: 2.5px;
    }

    .poem-box .poem-title {
      font-family: 'Playfair Display', serif;
      font-size: 10.2pt;
      font-weight: 700;
      color: #292524;
    }

    .poem-box .poem-meta {
      font-size: 7.6pt;
      color: #78716c;
      font-weight: 700;
      text-transform: uppercase;
    }

    .poem-box .poem-lines {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 8.7pt;
      color: #292524;
      line-height: 1.38;
      white-space: pre-line;
    }

    .photo-card {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px;
      text-align: center;
    }

    .photo-card img {
      width: 100%;
      border-radius: 3px;
      object-fit: cover;
      display: block;
    }

    .photo-card .caption {
      font-size: 7.6pt;
      color: #475569;
      font-style: italic;
      margin-top: 3px;
      line-height: 1.25;
    }

    .transit-bar {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 9px;
      font-size: 7.9pt;
      color: #475569;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .footer-bar {
      border-top: 1.5px solid #cbd5e1;
      padding-top: 4px;
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.6pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    .page-number {
      font-weight: 700;
      color: #1e3a8a;
      background: #eff6ff;
      padding: 1.5px 7px;
      border-radius: 4px;
      border: 1px solid #bfdbfe;
    }

    table.data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.2pt;
    }

    table.data-table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 4px 7px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 7.4pt;
      letter-spacing: 0.04em;
    }

    table.data-table td {
      padding: 4px 7px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      line-height: 1.30;
    }

    table.data-table tr:nth-child(even) td {
      background: #f8fafc;
    }
`;
