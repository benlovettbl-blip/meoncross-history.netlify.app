const fs = require('fs');

try {
  let html = fs.readFileSync('index.html', 'utf8');

  // Replace tab button
  const originalTabTarget = `            <button class="tab-btn" id="btn-tab-game-parser">
              <i class="fa-solid fa-terminal"></i> Chronology Command: Jaffa to Gaza (1947–1953)
            </button>`;

  const restoredTabs = `            <button class="tab-btn" id="btn-tab-game-parser">
              <i class="fa-solid fa-terminal"></i> Haifa to Sinai: Text Adventure
            </button>
            <button class="tab-btn" id="btn-tab-game-parser-jaffa">
              <i class="fa-solid fa-terminal"></i> Chronology Command: Jaffa to Gaza (1947–1953)
            </button>`;

  html = html.replace(originalTabTarget, restoredTabs);

  // Restore Haifa to Sinai container headers & labels
  html = html.replace(
    `<span class="hud-item">⚙️ Chronology Command: Jaffa to Gaza (1947–1953)</span>`,
    `<span class="hud-item">⚙️ ENGINE: HAIFA TO SINAI v2.5</span>`
  );
  html = html.replace(
    `<span id="me-map-loc-label">JAFFA URBAN GRID</span>`,
    `<span id="me-map-loc-label">HAIFA PORT</span>`
  );

  // Locate the end of game-parser-container to insert game-parser-jaffa-container
  const targetEnd = `          </div>\n\n        </div>\n      </section>`;
  // Wait, let's find the closing tag of game-parser-container:
  const parserContainerEnd = `            </div>\n          </div>`;
  // Let's check where `game-parser-container` ends. It ends with:
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  // Wait, let's view around line 1017 of index.html.
  // Line 1015:               </div>
  // Line 1016:             </div>
  // Line 1017:           </div>
  // Line 1018: 
  // Line 1019:         </div>
  // Line 1020:       </section>

  const insertIndex = html.indexOf('<!-- Container for Middle East Chronology Parser -->');
  if (insertIndex === -1) {
    throw new Error('Could not find Container for Middle East Chronology Parser');
  }

  // Let's find the closing tag of that container. The container starts at:
  // `<div id="game-parser-container"`
  // and it contains `.me-epic-game-workspace` and the map/terminal boxes.
  // It ends right before the closing `</div>` of the games hub views panel.
  // Let's look at lines 1015-1020:
  // 1015:               </div>
  // 1016:             </div>
  // 1017:           </div>
  // 1018: 
  // 1019:         </div>
  // 1020:       </section>
  // Line 1017 is the end of `game-parser-container`.
  
  const searchPattern = `              </div>\n            </div>\n\n          </div>\n        </div>\n      </section>`;
  // Wait, let's print a substring around line 1010-1025 to see the exact structure.
} catch (err) {
  console.error(err);
}
