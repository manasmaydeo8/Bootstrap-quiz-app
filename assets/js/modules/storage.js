/**
 * Storage Module - Resilient LocalStorage Manager with In-Memory Fallback
 */

const STORAGE_KEY = 'bs5_mock_quiz_state_v1';

const DEFAULT_STATE = {
  version: 1,
  theme: 'dark',
  bestScores: {
    QUICK: 0,
    FULL: 0,
    COMPLETE: 0
  },
  lastScore: null,
  history: []
};

// In-memory fallback if localStorage is disabled/restricted
let inMemoryFallbackState = null;

function isLocalStorageAvailable() {
  try {
    const testKey = '__bs5_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely load application state from localStorage or in-memory fallback
 * @returns {object} validated state object
 */
export function loadState() {
  if (!isLocalStorageAvailable()) {
    if (!inMemoryFallbackState) {
      inMemoryFallbackState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    return inMemoryFallbackState;
  }

  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      saveState(DEFAULT_STATE);
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    const parsed = JSON.parse(serialized);
    if (!parsed || typeof parsed !== 'object' || parsed.version !== 1) {
      console.warn('Corrupted or outdated storage schema. Resetting defaults.');
      saveState(DEFAULT_STATE);
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    return {
      ...DEFAULT_STATE,
      ...parsed,
      bestScores: { ...DEFAULT_STATE.bestScores, ...(parsed.bestScores || {}) },
      history: Array.isArray(parsed.history) ? parsed.history : []
    };
  } catch (err) {
    console.warn('Storage read failed. Falling back to default state.', err);
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

/**
 * Safely commit state to localStorage or in-memory fallback
 * @param {object} state 
 */
export function saveState(state) {
  if (!isLocalStorageAvailable()) {
    inMemoryFallbackState = JSON.parse(JSON.stringify(state));
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Storage write failed. Falling back to in-memory storage.', err);
    inMemoryFallbackState = JSON.parse(JSON.stringify(state));
  }
}

/**
 * Get active theme preference
 * @returns {'light'|'dark'}
 */
export function getSavedTheme() {
  const state = loadState();
  return state.theme === 'light' ? 'light' : 'dark';
}

/**
 * Save active theme preference
 * @param {'light'|'dark'} theme 
 */
export function setSavedTheme(theme) {
  const state = loadState();
  state.theme = theme === 'light' ? 'light' : 'dark';
  saveState(state);
}

/**
 * Record a completed quiz session result
 * @param {object} result - { mode, score, total, percentage, timeSpentSec, tier, date }
 */
export function recordQuizResult(result) {
  const state = loadState();
  const modeKey = (result.mode || 'QUICK').toUpperCase();

  // Update best score strictly when improved
  const currentBest = state.bestScores[modeKey] || 0;
  if (result.percentage > currentBest) {
    state.bestScores[modeKey] = result.percentage;
  }

  // Update last score record
  state.lastScore = {
    ...result,
    id: 'res_' + Date.now()
  };

  // Add to history (capped at latest 30 entries)
  state.history.unshift({
    id: 'res_' + Date.now(),
    ...result
  });
  if (state.history.length > 30) {
    state.history = state.history.slice(0, 30);
  }

  saveState(state);
  return state;
}

/**
 * Clear test history and reset best scores
 */
export function clearAllHistory() {
  const state = loadState();
  state.bestScores = { QUICK: 0, FULL: 0, COMPLETE: 0 };
  state.lastScore = null;
  state.history = [];
  saveState(state);
  return state;
}
