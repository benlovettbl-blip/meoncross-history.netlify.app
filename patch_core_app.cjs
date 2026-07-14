const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

const target = `  } else {
    contentArea.innerHTML = "<h2>No lessons found in data.js</h2>";
  }
});`;

const replacement = `  } else {
    contentArea.innerHTML = "<h2>No lessons found in data.js</h2>";
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}`;

code = code.replace(target, replacement);

fs.writeFileSync('src/core_app.js', code, 'utf8');
console.log('Successfully patched src/core_app.js properly');
