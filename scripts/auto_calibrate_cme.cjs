const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Load current data
const DATA = require('./cme_unified_textbook_data.cjs');

console.log('Testing column heights with Recto Anchor Box...');
