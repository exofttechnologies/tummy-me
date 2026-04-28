const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

if (!content.includes('<script src="https://unpkg.com/lucide@latest"></script>')) {
    content = content.replace('</head>', '<script src="https://unpkg.com/lucide@latest"></script>\n</head>');
}
if (!content.includes('lucide.createIcons();')) {
    content = content.replace('</body>', '<script>lucide.createIcons();</script>\n</body>');
}

const replacements = {
    '⭐': '<i data-lucide="star" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🤝': '<i data-lucide="handshake" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '📋': '<i data-lucide="clipboard-list" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '📍': '<i data-lucide="map-pin" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🫓': '<i data-lucide="circle" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🧄': '<i data-lucide="flask-conical" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '📈': '<i data-lucide="trending-up" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '⚙️': '<i data-lucide="settings" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🛡️': '<i data-lucide="shield" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '📣': '<i data-lucide="megaphone" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🚀': '<i data-lucide="rocket" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '✅': '<i data-lucide="check-circle" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🔜': '<i data-lucide="clock" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🕐': '<i data-lucide="clock" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🔥': '<i data-lucide="flame" style="display:inline-block; width:16px; vertical-align:middle;"></i>',
    '🛍️': '<i data-lucide="shopping-bag" style="display:inline-block; width:16px; vertical-align:middle;"></i>',
    '⚡': '<i data-lucide="zap" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '❤️': '<i data-lucide="heart" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '📞': '<i data-lucide="phone" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>'
};

for (const [emoji, tag] of Object.entries(replacements)) {
    content = content.split(emoji).join(tag);
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('Done!');
