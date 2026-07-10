export default class AppEngine {
  constructor() {
    this.unitId = new URLSearchParams(window.location.search).get('id');
    this.unitData = null;

    if (!this.unitId) {
      document.getElementById('engine-unit-title').innerText = "Error: No unit specified.";
      document.getElementById('engine-workbook-container').innerHTML = '';
      return;
    }

    this.init();
  }

  async init() {
    try {
      // Load Metadata
      const response = await fetch(`/units/${this.unitId}/data.json`);
      if (!response.ok) throw new Error("Unit not found");
      this.unitData = await response.json();

      // Render Header
      document.getElementById('engine-unit-title').innerText = this.unitData.title;
      document.getElementById('engine-unit-enquiry').innerText = "Unit Enquiry: " + this.unitData.enquiry;
      if (this.unitData.badge) {
        const badgeEl = document.getElementById('engine-unit-badge');
        badgeEl.innerText = this.unitData.badge;
        badgeEl.style.display = 'inline-block';
      }
      
      document.title = `Mr Lovett's History Hub - ${this.unitData.title}`;

      // Render Tabs
      const tabsContainer = document.getElementById('engine-tabs-container');
      this.unitData.tabs.forEach((tab) => {
        const btn = document.createElement('button');
        btn.className = 'tb-tab nav-tab';
        btn.dataset.tab = tab.id;
        btn.dataset.target = tab.id;
        btn.innerText = tab.label;
        tabsContainer.appendChild(btn);
      });

      // Fetch and inject HTML content
      const htmlResponse = await fetch(this.unitData.contentUrl);
      const htmlContent = await htmlResponse.text();
      document.getElementById('engine-workbook-container').innerHTML = htmlContent;

      // Load unit specific styles
      const styleLink = document.createElement('link');
      styleLink.rel = 'stylesheet';
      styleLink.href = `/units/${this.unitId}/styles.css`;
      document.head.appendChild(styleLink);

      // Load specific unit scripts
      this.loadUnitScripts();

    } catch (err) {
      console.error(err);
      document.getElementById('engine-unit-title').innerText = "Failed to load unit.";
      document.getElementById('engine-workbook-container').innerHTML = `<p style="color:red; text-align:center;">${err.message}</p>`;
    }
  }

  loadUnitScripts() {
     const script = document.createElement('script');
     script.src = `/units/${this.unitId}/unit_script.js`;
     script.type = 'module';
     script.onload = () => {
        if (typeof window.initUnit === 'function') {
           window.initUnit(this);
        }
     };
     document.body.appendChild(script);
  }
}

// Bootstrap
window.engine = new AppEngine();
