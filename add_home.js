const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const homeTab = '<button class="menu-tab" onclick="showPage(\'home\')" style="background:var(--red);color:#fff;border-color:var(--red)"><i data-lucide="home" style="display:inline-block; width:16px; margin-right:4px; vertical-align:middle;"></i> Home</button>\n                    <button class="menu-tab active" onclick="filterMenu(\'all\')">All</button>';

content = content.replace('<button class="menu-tab active" onclick="filterMenu(\'all\')">All</button>', homeTab);
fs.writeFileSync('index.html', content, 'utf8');
console.log('Added home tab');
