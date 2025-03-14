
import { fetchApi } from './api';

/**
 * Debounce function to limit how often a function can be called
 */
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

/**
 * Check nickname availability with debounce
 * @param {string} nickname - Nickname to check
 * @param {function} callback - Callback function when result is available
 */
export const checkNicknameAvailability = debounce(async (nickname, callback) => {
  // Don't check empty nicknames
  if (!nickname || nickname.trim() === '') {
    callback(null);
    return;
  }
  
  try {
    const response = await fetchApi(`check-nickname/?nickname=${encodeURIComponent(nickname.trim())}`);
    callback(response);
  } catch (error) {
    console.error('Error checking nickname availability:', error);
    callback(null);
  }
}, 500); // 500ms debounce
