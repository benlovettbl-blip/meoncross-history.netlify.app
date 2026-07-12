const fs = require('fs');
const path = require('path');

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

// I will just do a string replace on the exact text
content = content.replace(`      html += \`</div>\`;
    });
  });
  });
  }
}`, `      html += \`</div>\`;
    });
  });
  }
}`);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed brackets!");
