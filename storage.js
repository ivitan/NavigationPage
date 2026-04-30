/**
 * Storage Module - Handles local and cloud synchronization
 * Supports localStorage for local storage and Firebase for cloud sync
 */

const Storage = (function() {
    'use strict';

    const STORAGE_KEY = 'navigationLinks';
    const SYNC_STATUS_ID = 'sync-status';
    const DEFAULT_LINKS = [
        {
            title: 'Vitan',
            url: 'https://vitan.me',
            icon: 'img/Vitan.png'
        },
        {
            title: 'GitHub',
            url: 'https://github.com',
            icon: 'img/openhub.png'
        },
        {
            title: 'Google',
            url: 'https://google.com',
            icon: 'img/Google1.png'
        },
        {
            title: 'Stack Overflow',
            url: 'https://stackoverflow.com',
            icon: 'img/stackoverflow.png'
        },
        {
            title: 'W3Schools',
            url: 'https://www.w3schools.com',
            icon: 'img/w3cschool.png'
        },
        {
            title: 'OnePlus BBS',
            url: 'https://www.oneplusbbs.com',
            icon: 'img/oneplus_bbs.png'
        },
        {
            title: 'Duboku',
            url: 'https://www.duboku.co',
            icon: 'img/video.png'
        }
    ];

    let links = [];
    let firebaseReady = false;
    let db = null;
    let userId = null;

    /**
     * Initialize storage system
     */
    function init() {
        loadFromLocalStorage();
        initFirebase();
    }

    /**
     * Load links from localStorage
     */
    function loadFromLocalStorage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                links = JSON.parse(stored);
            } else {
                links = JSON.parse(JSON.stringify(DEFAULT_LINKS));
                saveToLocalStorage();
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            links = JSON.parse(JSON.stringify(DEFAULT_LINKS));
        }
    }

    /**
     * Save links to localStorage
     */
    function saveToLocalStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
            updateSyncStatus('Saved locally', 'success', 2000);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            updateSyncStatus('Save failed', 'error', 3000);
        }
    }

    /**
     * Initialize Firebase for cloud sync
     */
    function initFirebase() {
        // Check if Firebase is available
        if (typeof firebase === 'undefined') {
            console.log('Firebase not available, using localStorage only');
            return;
        }

        try {
            // Check if config is loaded
            if (typeof firebaseConfig === 'undefined') {
                console.log('Firebase config not found, using localStorage only');
                return;
            }

            // Initialize Firebase
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            db = firebase.database();
            firebaseReady = true;

            // Setup anonymous authentication
            firebase.auth().signInAnonymously().catch(error => {
                console.warn('Firebase auth error:', error);
                firebaseReady = false;
            });

            // Get user ID from localStorage or create new
            let storedUserId = localStorage.getItem('navigationUserId');
            if (!storedUserId) {
                storedUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('navigationUserId', storedUserId);
            }
            userId = storedUserId;

            // Setup real-time listener
            setupFirebaseListener();

        } catch (error) {
            console.warn('Firebase initialization error:', error);
            firebaseReady = false;
        }
    }

    /**
     * Setup Firebase real-time listener
     */
    function setupFirebaseListener() {
        if (!db || !userId) return;

        try {
            db.ref(`users/${userId}/links`).on('value', (snapshot) => {
                const remoteLinks = snapshot.val();
                if (remoteLinks) {
                    // Update links if remote data is newer
                    links = remoteLinks;
                    saveToLocalStorage();
                    // Dispatch event for UI update
                    document.dispatchEvent(new CustomEvent('linksUpdated', { detail: { source: 'firebase' } }));
                    updateSyncStatus('Synced', 'success', 2000);
                }
            });
        } catch (error) {
            console.warn('Firebase listener setup error:', error);
        }
    }

    /**
     * Sync links to Firebase
     */
    function syncToFirebase() {
        if (!firebaseReady || !db || !userId) {
            console.log('Firebase not ready, skipping cloud sync');
            return Promise.resolve();
        }

        updateSyncStatus('Syncing...', 'syncing');

        return new Promise((resolve) => {
            try {
                db.ref(`users/${userId}/links`).set(links, (error) => {
                    if (error) {
                        console.error('Firebase sync error:', error);
                        updateSyncStatus('Sync failed', 'error', 3000);
                    } else {
                        updateSyncStatus('Synced', 'success', 2000);
                    }
                    resolve();
                });
            } catch (error) {
                console.error('Firebase sync error:', error);
                updateSyncStatus('Sync failed', 'error', 3000);
                resolve();
            }
        });
    }

    /**
     * Get all links
     */
    function getLinks() {
        return JSON.parse(JSON.stringify(links));
    }

    /**
     * Add a new link
     */
    function addLink(title, url, icon) {
        if (!title || !url) {
            throw new Error('Title and URL are required');
        }

        const link = {
            title: title.trim(),
            url: url.trim(),
            icon: icon ? icon.trim() : ''
        };

        links.push(link);
        saveToLocalStorage();
        return syncToFirebase();
    }

    /**
     * Update a link
     */
    function updateLink(index, title, url, icon) {
        if (index < 0 || index >= links.length) {
            throw new Error('Invalid link index');
        }

        if (!title || !url) {
            throw new Error('Title and URL are required');
        }

        links[index] = {
            title: title.trim(),
            url: url.trim(),
            icon: icon ? icon.trim() : ''
        };

        saveToLocalStorage();
        return syncToFirebase();
    }

    /**
     * Delete a link
     */
    function deleteLink(index) {
        if (index < 0 || index >= links.length) {
            throw new Error('Invalid link index');
        }

        links.splice(index, 1);
        saveToLocalStorage();
        return syncToFirebase();
    }

    /**
     * Update sync status display
     */
    function updateSyncStatus(message, status = 'info', duration = 0) {
        const statusEl = document.getElementById(SYNC_STATUS_ID);
        if (!statusEl) return;

        statusEl.textContent = message;
        statusEl.className = `sync-status ${status}`;

        if (duration > 0) {
            setTimeout(() => {
                statusEl.textContent = '';
                statusEl.className = 'sync-status';
            }, duration);
        }
    }

    /**
     * Check if Firebase is ready
     */
    function isFirebaseReady() {
        return firebaseReady;
    }

    // Expose public API
    return {
        init,
        getLinks,
        addLink,
        updateLink,
        deleteLink,
        syncToFirebase,
        isFirebaseReady,
        loadFromLocalStorage,
        saveToLocalStorage
    };
})();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    Storage.init();
});
