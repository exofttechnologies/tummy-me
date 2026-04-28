import re

html_file = 'index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '🔥': '<i data-lucide="flame"></i>',
    '🍗': '<i data-lucide="utensils"></i>',
    '🫓': '<i data-lucide="sandwich"></i>',
    '🧄': '<i data-lucide="droplet"></i>',
    '📍': '<i data-lucide="map-pin"></i>',
    '🕐': '<i data-lucide="clock"></i>',
    '📞': '<i data-lucide="phone"></i>',
    '📢': '<i data-lucide="megaphone"></i>',
    '🚀': '<i data-lucide="rocket"></i>',
    '🌿': '<i data-lucide="leaf"></i>',
    '🌶️': '<i data-lucide="flame"></i>',
    '👨‍🍳': '<i data-lucide="chef-hat"></i>',
    '⚡': '<i data-lucide="zap"></i>',
    '⭐': '<i data-lucide="star"></i>',
    '❤️': '<i data-lucide="heart"></i>',
    '📈': '<i data-lucide="trending-up"></i>',
    '⚙️': '<i data-lucide="settings"></i>',
    '🛡️': '<i data-lucide="shield"></i>',
    '✅': '<i data-lucide="check-circle-2"></i>',
    '🔜': '<i data-lucide="clock"></i>',
    '🤝': '<i data-lucide="users"></i>',
    '📋': '<i data-lucide="book-open"></i>',
    '🏠': '<i data-lucide="home"></i>'
}

for emoji, icon in replacements.items():
    content = content.replace(emoji, icon)

# Add lucide script
if 'lucide@latest' not in content:
    content = content.replace('</head>', '    <script src="https://unpkg.com/lucide@latest"></script>\n</head>')

# Add lucide init
if 'lucide.createIcons()' not in content:
    content = content.replace('</body>', '    <script>lucide.createIcons();</script>\n</body>')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced emojis with lucide icons.")
