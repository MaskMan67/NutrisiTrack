/**
 * NutriScan - Router Module
 * Simple hash-based SPA router for page navigation
 */

// Available pages
const PAGES = ['dashboard', 'food', 'stats', 'profile'];
const DEFAULT_PAGE = 'dashboard';
const STORAGE_KEY = 'nutriscan_last_page';

// Current active page
let currentPage = DEFAULT_PAGE;

// Page elements cache
let pageElements = {};
let tabElements = {};

/**
 * Initialize the router
 */
export function initRouter() {
    // Cache page elements
    PAGES.forEach(page => {
        pageElements[page] = document.getElementById(`page-${page}`);
        tabElements[page] = document.querySelector(`[data-page="${page}"]`);
    });

    // Setup tab click handlers
    document.querySelectorAll('.tab-bar__item').forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.dataset.page;
            if (page) navigateTo(page);
        });
    });

    // Handle browser back/forward
    window.addEventListener('hashchange', handleHashChange);

    // Check URL hash or load last page
    const hash = window.location.hash.slice(1);
    if (hash && PAGES.includes(hash)) {
        navigateTo(hash, false);
    } else {
        const lastPage = loadLastPage();
        navigateTo(lastPage, false);
    }
}

/**
 * Navigate to a page
 * @param {string} page - Page name
 * @param {boolean} updateHash - Whether to update URL hash
 */
export function navigateTo(page, updateHash = true) {
    if (!PAGES.includes(page)) {
        console.warn(`Unknown page: ${page}`);
        page = DEFAULT_PAGE;
    }

    // Hide current page
    if (pageElements[currentPage]) {
        pageElements[currentPage].classList.remove('page--active');
    }
    if (tabElements[currentPage]) {
        tabElements[currentPage].classList.remove('tab-bar__item--active');
    }

    // Show new page
    currentPage = page;
    if (pageElements[page]) {
        pageElements[page].classList.add('page--active');
    }
    if (tabElements[page]) {
        tabElements[page].classList.add('tab-bar__item--active');
    }

    // Update URL hash
    if (updateHash) {
        window.location.hash = page;
    }

    // Save last page
    saveLastPage(page);

    // Dispatch page change event
    window.dispatchEvent(new CustomEvent('pagechange', { detail: { page } }));
}

/**
 * Handle hash change from browser navigation
 */
function handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash && PAGES.includes(hash) && hash !== currentPage) {
        navigateTo(hash, false);
    }
}

/**
 * Save last visited page
 */
function saveLastPage(page) {
    try {
        localStorage.setItem(STORAGE_KEY, page);
    } catch (e) {
        console.error('Error saving last page:', e);
    }
}

/**
 * Load last visited page
 */
function loadLastPage() {
    try {
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_PAGE;
    } catch (e) {
        return DEFAULT_PAGE;
    }
}

/**
 * Get current page
 */
export function getCurrentPage() {
    return currentPage;
}

/**
 * Check if a page is active
 */
export function isPageActive(page) {
    return currentPage === page;
}

export default {
    initRouter,
    navigateTo,
    getCurrentPage,
    isPageActive
};
