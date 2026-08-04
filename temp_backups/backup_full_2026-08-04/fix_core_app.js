const fs = require('fs');

let lines = fs.readFileSync('src/core_app.js', 'utf8').split('\n');

// 776 is index 775. So lines 777 to 793 are indices 776 to 792.
const spliceStart = 776;
const spliceCount = 17; // Removes lines 777-793 inclusive

const replacement = `            <div class="homepage-lesson-card" style="background: #f8fafc; border: 2px dashed #3b82f6; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('\${wbUrl}', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#f8fafc'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
               <i class="fa-solid fa-book-open" style="font-size: 1.5rem; color: #3b82f6; margin-bottom: 10px;"></i>
               <h3 style="margin: 0; color: #334155; font-size: 1.1rem;">\${wb.title}</h3>
            </div>
          \`;
        });
        lessonsHTML += '</div>';
      }
    }

    contentArea.innerHTML = \`
      <div style="text-align: center; padding-bottom: 50px; position: relative;">
        \${unitData.homepage_background ? \`
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: url('\${unitData.homepage_background.startsWith('/') ? unitData.homepage_background : getAssetUrl(unitData.homepage_background)}'); background-size: cover; background-position: center; opacity: 0.1; z-index: -1; border-radius: 8px;"></div>
        \` : ''}
        <h1 style="font-size: 2.5rem; color: #1a237e; margin-bottom: 10px;">\${unitData.title}</h1>
        <h2 style="margin-size: 1.4rem; color: #475569; font-weight: 500; margin-top: 0; margin-bottom: 30px;">
          Unit Enquiry: <i>\${unitData.enquiry || 'What can we learn from this period in history?'}</i>
        </h2>
        
        \${Array.isArray(unitData.cover_image) ? \`
          <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 20px;">
            \${unitData.cover_image.map(img => \`
              <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; flex: 1; max-height: 400px; display: flex; align-items: center; justify-content: center; background: #0f172a;">
                <img src="\${getAssetUrl(img)}" alt="Unit Cover" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;">
              </div>
            \`).join('')}
          </div>
        \` : (unitData.cover_image ? \`
          <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; display: block; margin: 0 auto 5px auto; max-width: 33%;">
            <img src="\${getAssetUrl(unitData.cover_image)}" alt="Unit Cover" style="max-width: 100%; height: auto; display: block; max-height: 400px; margin: 0 auto;">
          </div>
        \` : '')}
        
        \${unitData.cover_caption ? \`<p style="margin-top: 5px; margin-bottom: 20px; font-style: italic; color: #64748b; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">\${unitData.cover_caption}</p>\` : ''}
        
        <h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Unit Lessons</h2>
        \${lessonsHTML}
        
      </div>
    \`;`.split('\n');

lines.splice(spliceStart, spliceCount, ...replacement);
fs.writeFileSync('src/core_app.js', lines.join('\n'));
