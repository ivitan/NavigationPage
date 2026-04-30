# 🌐 Vitan's Navigation Page

A modern, responsive navigation page built with HTML, CSS, and vanilla JavaScript.

## Features

- ✨ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern Styling** - Clean and minimal design with smooth animations
- 🔍 **Search Integration** - Quick search using Google
- ⚡ **Lightweight** - No dependencies, pure HTML/CSS/JavaScript
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🎯 **Performance** - Optimized for fast loading
- 🌙 **Dark Mode** - Beautiful dark theme by default

## Quick Links

Navigate to frequently used websites from this custom homepage:

- [Vitan.me](https://vitan.me)
- [GitHub](https://github.com)
- [Google](https://google.com)
- [Stack Overflow](https://stackoverflow.com)
- [W3Schools](https://www.w3schools.com)
- [OnePlus BBS](https://www.oneplusbbs.com)
- [Duboku](https://www.duboku.co)

## Setup

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/ivitan/NavigationPage.git
cd NavigationPage
```

2. Open `index.html` in your browser or use a local server:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

3. Visit `http://localhost:8000` in your browser

### Custom Domain

The project includes a `CNAME` file configured for `vitan.me`. To use your own domain:

1. Update the `CNAME` file with your domain name
2. Configure your DNS provider to point to GitHub Pages
3. Enable GitHub Pages in repository settings

For more details, see [GitHub Pages Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## File Structure

```
NavigationPage/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── CNAME               # Custom domain configuration
├── .gitignore          # Git ignore rules
├── README.md           # This file
└── img/                # Image assets
    ├── logo.png
    ├── Vitan.png
    ├── openhub.png
    ├── Google1.png
    ├── stackoverflow.png
    ├── w3cschool.png
    ├── oneplus_bbs.png
    └── video.png
```

## Customization

### Adding New Links

Edit the navigation grid in `index.html`:

```html
<a href="https://example.com" class="nav-box" title="Example">
  <img class="nav-icon" src="img/example.png" alt="Example" />
  <p class="nav-text">Example</p>
</a>
```

### Styling

Modify `styles.css` to customize colors, fonts, and layouts.

### Font

The project uses Ubuntu font. To change it, modify the `@font-face` rule in `styles.css`.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome for Android)

## Performance

- Optimized CSS with minimal file size
- No external dependencies
- Lazy loading ready
- Mobile-first approach

## Accessibility

- Semantic HTML5 structure
- ARIA labels for interactive elements
- Proper color contrast
- Keyboard navigation support
- Reduced motion support

## Keyboard Shortcuts

- `Ctrl/Cmd + K` or `/` - Focus search input
- `Esc` - Blur search input
- `Enter` - Submit search

## License

This project is open source and available under the MIT License.

## Author

**Vitan** - [GitHub](https://github.com/ivitan) | [Website](https://vitan.me)

---

Feel free to fork, modify, and use this project for your own navigation page!
