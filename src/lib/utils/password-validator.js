/**
 * Validates password strength according to requirements
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with status and error message
 */
export function validatePassword(password) {
    const minLength = 8;
    const result = {
      isValid: true,
      errors: []
    };
    
    // Check minimum length
    if (!password || password.length < minLength) {
      result.isValid = false;
      result.errors.push(`Password must be at least ${minLength} characters long`);
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      result.isValid = false;
      result.errors.push('Password must contain at least one uppercase letter');
    }
    
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      result.isValid = false;
      result.errors.push('Password must contain at least one lowercase letter');
    }
    
    // Check for at least one number
    if (!/[0-9]/.test(password)) {
      result.isValid = false;
      result.errors.push('Password must contain at least one number');
    }
    
    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      result.isValid = false;
      result.errors.push('Password must contain at least one special character');
    }
    
    return result;
  }
  
  /**
   * Generates a password strength meter score
   * @param {string} password - Password to score
   * @returns {number} - Score from 0-100
   */
  export function getPasswordStrength(password) {
    if (!password) return 0;
    
    let score = 0;
    
    // Length contribution (up to 25 points)
    score += Math.min(25, password.length * 2);
    
    // Character variety contribution
    if (/[A-Z]/.test(password)) score += 15; // uppercase
    if (/[a-z]/.test(password)) score += 15; // lowercase
    if (/[0-9]/.test(password)) score += 15; // digits
    if (/[^A-Za-z0-9]/.test(password)) score += 15; // special chars
    
    // Additional complexity
    const uniqueChars = new Set(password.split('')).size;
    score += Math.min(15, uniqueChars / password.length * 15); // reward unique character ratio
    
    return Math.min(100, Math.floor(score));
  }
  
  /**
   * Gets a color code and label based on password strength
   * @param {number} strength - Password strength score (0-100)
   * @returns {Object} - Color and label for feedback
   */
  export function getStrengthFeedback(strength) {
    if (strength < 30) {
      return { color: 'red', label: 'Very weak' };
    } else if (strength < 50) {
      return { color: 'orange', label: 'Weak' };
    } else if (strength < 70) {
      return { color: 'yellow', label: 'Fair' };
    } else if (strength < 90) {
      return { color: 'lime', label: 'Good' };
    } else {
      return { color: 'green', label: 'Strong' };
    }
  }