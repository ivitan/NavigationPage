# 🌐 Vitan's Navigation Page

A modern, responsive navigation page built with HTML, CSS, and vanilla JavaScript with **frontend editing** and **multi-device sync** capabilities.

## ✨ Features

- ✨ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern Styling** - Clean and minimal design with smooth animations
- 🔍 **Search Integration** - Quick search using Google
- ⚡ **Lightweight** - No dependencies, pure HTML/CSS/JavaScript
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🎯 **Performance** - Optimized for fast loading
- 🌙 **Dark Mode** - Beautiful dark theme by default
- **✏️ Frontend Editing** - Edit navigation links directly in the browser
- **💾 Auto-Save** - Changes saved to localStorage automatically
- **🔄 Cloud Sync** - Optional Firebase integration for multi-device synchronization
- **📱 Multi-Device Sync** - Sync links across all your devices in real-time

## Quick Start

### Basic Usage (Local Storage Only)

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

### Editing Navigation Links

1. Click the **✏️ Edit** button in the top-right corner
2. Edit, add, or delete navigation links
3. Click **✓ Save Changes** to save your modifications
4. Changes are automatically synced to localStorage and across browser tabs

## Cloud Synchronization (Optional)

To enable real-time synchronization across all your devices:

### Setup Firebase

1. Create a Firebase project at https://console.firebase.google.com
2. Enable **Realtime Database**:
   - Go to "Build" → "Realtime Database"
   - Click "Create Database"
   - Start in "Test Mode" (or configure security rules)
3. Enable **Anonymous Authentication**:
   - Go to "Build" → "Authentication"
   - Click "Get Started"
   - Enable "Anonymous" provider
4. Copy your Firebase config from **Project Settings**

### Configure the Project

1. Copy `config.example.js` to `config.js`:
```bash
cp config.example.js config.js
```

2. Replace the placeholder values with your Firebase credentials:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

3. Reload the page - cloud sync is now enabled!

### Security Considerations

When using Firebase Realtime Database in Test Mode, your data is publicly readable and writable. For production use, implement proper security rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth.uid === $uid",
        ".write": "auth.uid === $uid"
      }
    }
  }
}
```

## File Structure

```
NavigationPage/
├── index.html           # Main HTML file
├── styles.css           # Stylesheet with modal and editor styles
├── script.js            # Core functionality (search, shortcuts)
├── storage.js           # Storage management (localStorage + Firebase)
├── editor.js            # Frontend editor UI and logic
├── config.example.js    # Firebase config template
├── CNAME                # Custom domain configuration
├── .gitignore           # Git ignore rules
├── README.md            # This file
└── img/                 # Image assets
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

Use the **Edit Mode**:
1. Click the **✏️ Edit** button
2. Click **➕ Add New Link**
3. Enter title, URL, and optional icon URL
4. Click **✓ Save Changes**

Or edit the `storage.js` file directly by modifying the `DEFAULT_LINKS` array.

### Styling

Modify `styles.css` to customize:
- Colors and gradients
- Fonts and typography
- Layout and spacing
- Animations and transitions
- Dark/light mode preferences

### Font

The project uses Ubuntu font. To change it, modify the `@font-face` rules in `styles.css`.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome for Android)

## Keyboard Shortcuts

- `Ctrl/Cmd + K` or `/` - Focus search input
- `Esc` - Blur search input
- `Enter` - Submit search
- `Escape` - Close edit modal

## Architecture

### Core Components

**script.js** - Main application logic
- Search functionality
- Keyboard shortcuts
- Event handling

**storage.js** - Data persistence
- localStorage management
- Firebase integration
- Automatic sync
- Cloud backup

**editor.js** - Edit interface
- Link editing UI
- Add/edit/delete operations
- Form validation
- Real-time preview
- Cross-tab synchronization

## Data Storage

### Local Storage
- **Key**: `navigationLinks`
- **Format**: JSON array of link objects
- **Synced to**: All tabs/windows in the same browser

### Firebase (Optional)
- **Path**: `users/{userId}/links`
- **Real-time sync** across all devices
- **Auto-backup** of your links

## Performance

- Optimized CSS with minimal file size
- No external dependencies (except optional Firebase)
- Lazy loading ready
- Mobile-first approach
- Efficient DOM manipulation

## Accessibility

- Semantic HTML5 structure
- ARIA labels for interactive elements
- Proper color contrast
- Keyboard navigation support
- Reduced motion support

## Troubleshooting

### Changes not saving?
- Check browser console for errors
- Ensure localStorage is enabled in browser settings
- Try clearing browser cache and reload

### Cloud sync not working?
- Verify `config.js` file exists and has correct Firebase credentials
- Check browser console for Firebase errors
- Ensure Firebase project has Realtime Database and Anonymous Auth enabled
- Check Firebase security rules

### Icons not loading?
- Verify icon URLs are correct and accessible
- Check browser network tab for failed requests
- Ensure CORS is enabled if loading from external domains

## Custom Domain

The project includes a `CNAME` file configured for `vitan.me`. To use your own domain:

1. Update the `CNAME` file with your domain name
2. Configure your DNS provider to point to GitHub Pages
3. Enable GitHub Pages in repository settings

For more details, see [GitHub Pages Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## License

This project is open source and available under the MIT License.

## Author

**Vitan** - [GitHub](https://github.com/ivitan) | [Website](https://vitan.me)

---

Feel free to fork, modify, and use this project for your own navigation page!

## Changelog

### v2.0.0
- ✨ Added frontend link editing
- 💾 Local storage support
- 🔄 Optional Firebase cloud sync
- 📱 Multi-device synchronization
- 🎨 Enhanced UI with edit modal
- 🔍 Form validation
- ⌨️ Improved accessibility

### v1.0.0
- Initial release with static navigation links
