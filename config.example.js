/**
 * Firebase Configuration
 * 
 * To use cloud sync features:
 * 1. Create a Firebase project at https://console.firebase.google.com
 * 2. Copy this file to `config.js` and fill in your credentials
 * 3. Enable Realtime Database in Firebase console
 * 4. Set database rules to allow authenticated users
 */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Database rules to use (set in Firebase Console):
/*
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "navlinks": {
      ".indexOn": ["uid"]
    }
  }
}
*/
