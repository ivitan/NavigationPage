/**
 * Navigation Page - Main Script
 * Handles search functionality and keyboard shortcuts
 */

(function() {
    'use strict';

    // Constants
    const SEARCH_INPUT_ID = 'search-input';
    const GOOGLE_SEARCH_URL = 'https://www.google.com/search?q=';

    // Initialize
    document.addEventListener('DOMContentLoaded', init);

    /**
     * Initialize the application
     */
    function init() {
        const searchInput = document.getElementById(SEARCH_INPUT_ID);

        if (!searchInput) {
            console.warn('Search input element not found');
            return;
        }

        // Attach event listeners
        setupEventListeners(searchInput);
    }

    /**
     * Setup event listeners
     * @param {HTMLElement} searchInput - The search input element
     */
    function setupEventListeners(searchInput) {
        // Search form submission
        const searchForm = searchInput.closest('form');
        if (searchForm) {
            searchForm.addEventListener('submit', handleSearch);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => handleKeyboardShortcuts(e, searchInput));
    }

    /**
     * Handle search form submission
     * @param {Event} event - The form submission event
     * @returns {boolean} - Returns false to prevent default form submission
     */
    function handleSearch(event) {
        event.preventDefault();

        const searchInput = document.getElementById(SEARCH_INPUT_ID);
        const query = searchInput.value.trim();

        if (query === '') {
            searchInput.focus();
            return false;
        }

        // Encode the search query for URL
        const encodedQuery = encodeURIComponent(query);
        const searchURL = GOOGLE_SEARCH_URL + encodedQuery;

        // Clear input and navigate
        searchInput.value = '';
        window.location.href = searchURL;

        return false;
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} event - The keyboard event
     * @param {HTMLElement} searchInput - The search input element
     */
    function handleKeyboardShortcuts(event, searchInput) {
        // Ctrl+K or Cmd+K to focus search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            searchInput.focus();
            searchInput.select();
        }

        // Forward slash to focus search
        if (event.key === '/' && !isInputElement(event.target)) {
            event.preventDefault();
            searchInput.focus();
            searchInput.select();
        }

        // Escape to blur search
        if (event.key === 'Escape') {
            if (document.activeElement === searchInput) {
                searchInput.blur();
            }
        }
    }

    /**
     * Check if element is an input/textarea
     * @param {HTMLElement} element - The element to check
     * @returns {boolean} - True if element is input/textarea
     */
    function isInputElement(element) {
        const inputElements = ['INPUT', 'TEXTAREA', 'SELECT'];
        return inputElements.includes(element.tagName);
    }

    // Expose global search function (for form onsubmit)
    window.search = function() {
        const event = new Event('submit');
        const searchForm = document.querySelector('.search-form');
        searchForm.dispatchEvent(event);
        return false;
    };

})();

// Log initialization
console.log('🌐 Vitan\'s Navigation Page Loaded');
console.log('Shortcuts: Ctrl+K or / to search, Esc to blur');
