import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

if '<script src="https://unpkg.com/lucide@latest"></script>' not in content:
    content = content.replace('</head>', '<script src="https://unpkg.com/lucide@latest"></script>\n</head>')
if 'lucide.createIcons();' not in content:
    content = content.replace('</body>', '<script>lucide.createIcons();</script>\n</body>')

replacements = {
    '⭐': '<i data-lucide="star" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🤝': '<i data-lucide="handshake" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '📋': '<i data-lucide="clipboard-list" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '📍': '<i data-lucide="map-pin" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🫓': '<i data-lucide="circle" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🧄': '<i data-lucide="flask-conical" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '📈': '<i data-lucide="trending-up" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '⚙️': '<i data-lucide="settings" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '🛡️': '<i data-lucide="shield" style="display:inline-block; width:18px; margin-right:4px; vertical-align:middle;"></i>',
    '📣': '<i data-lucide=\"megaphone\" style=\"display:inline-block; width:18px; margin-right:4px; vertical-align:middle;\"></i>',
    '🚀': '<i data-lucide=\"rocket\" style=\"display:inline-block; width:18px; margin-right:4px; vertical-align:middle;\"></i>',
    '✅': '<i data-lucide=\"check-circle\" style=\"display:inline-block; width:18px; margin-right:4px; vertical-align:middle;\"></i>',
    '🔜': '<i data-lucide=\"clock\" style=\"display:inline-block; width:18px; margin-right:4px; vertical-align:middle;\"></i>',
    '🕐': '<i data-lucide=\"clock\" style=\"display:inline-block; width:18px; margin-right:4px; vertical-align:middle;\"></i>',
    '🔥': '<i data-lucide=\"flame\" style=\"display:inline-block; width:16px; vertical-align:middle;\"></i>',
    '🛍️': '<i data-lucide=\"shopping-bag\" style=\"display:inline-block; width:16px; vertical-align:middle;\"></i>',
    '⚡': '<i data-lucide=\"zap\" style=\"display:inline-block; width:18px; margin-right:4px; vertical-align:middle;\"></i>',
    '❤️': '<i data-lucide=\"heart\" style=\"display:inline-block; width:18px; margin-right:4px; vertical-align:middle;\"></i>',
    '📞': '<i data-lucide=\"phone\" style=\"display:inline-block; width:18px; margin-right:4px; vertical-align:middle;\"></i>'
}

for emoji, tag in replacements.items():
    content = content.replace(emoji, tag)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
