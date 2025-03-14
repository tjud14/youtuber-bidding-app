const badWords = [
    // Common profanities
    'ass', 'asshole', 'asswipe',
    'bastard', 'bitch', 'bollocks', 'bullshit',
    'cock', 'crap', 'cunt',
    'damn', 'dick', 'dickhead', 'dildo', 'douchebag',
    'fag', 'faggot', 'fuck', 'fucker', 'fucking',
    'goddamn',
    'horseshit',
    'jackass', 'jerk',
    'moron', 'motherfucker',
    'nigga', 'nigger',
    'piss', 'prick', 'pussy',
    'shit', 'shitty', 'slut', 'suck',
    'tits', 'tit', 'titties', 'twat',
    'vagina',
    'wanker', 'whore',
    
    // Drug references
    'cocaine', 'crack', 'heroin', 'meth',
    
    // Offensive terms
    'retard', 'retarded',
    'nazi', 'terrorist',
    
    // Variations with common substitutions
    'a$$', 'a$$hole', 'b!tch', 'b1tch', 'sh1t', 'f*ck', 'f**k',
    'fu*k', 'fu**', 'fuk', 'f4k', 'sh!t', '$hit', 'a55'
  ];
  
  // Function to generate additional variations
  function generateVariations(wordList) {
    const variations = [];
    
    wordList.forEach(word => {
      // Add simple letter substitutions
      variations.push(
        word.replace(/a/g, '4').replace(/e/g, '3').replace(/i/g, '1').replace(/o/g, '0'),
        word.replace(/a/g, '@').replace(/e/g, '3').replace(/i/g, '1').replace(/o/g, '0'),
        word.replace(/s/g, '$').replace(/a/g, '@'),
        word.replace(/o/g, '0').replace(/l/g, '1'),
        word.replace(/c/g, 'k')
      );
      
      // Add variations with separators
      if (word.length > 3) {
        variations.push(
          word.split('').join('.'),
          word.split('').join('-'),
          word.split('').join('_'),
          word.split('').join(' ')
        );
      }
      
      // Add variations with common word boundaries
      variations.push(
        `${word}-`,
        `-${word}`,
        `_${word}_`
      );
      
      // Add leetspeak variations for longer words
      if (word.length > 3) {
        let leetWord = word
          .replace(/a/g, '4')
          .replace(/e/g, '3')
          .replace(/i/g, '1')
          .replace(/o/g, '0')
          .replace(/s/g, '$')
          .replace(/t/g, '7')
          .replace(/l/g, '1');
        variations.push(leetWord);
      }
    });
    
    return variations;
  }
  
  // Generate all variations
  const variations = generateVariations(badWords);
  
  // Combine original words and variations, removing duplicates
  const allBadWords = [...new Set([...badWords, ...variations])];
  
  /**
   * Check if a string contains profanity
   * @param {string} text - Text to check
   * @returns {boolean} - True if profanity is detected
   */
  export function containsProfanity(text) {
    if (!text) return false;
    
    // Convert to lowercase for case-insensitive matching
    const lowerText = text.toLowerCase().trim();
    
    // Quick check for exact matches
    if (allBadWords.includes(lowerText)) {
      return true;
    }
    
    // Check if any bad word is contained in the text
    try {
      return allBadWords.some(word => {
        if (word.length <= 3) {
          // For very short words, require word boundaries to avoid false positives
          // Escape special regex characters in the word to avoid errors
          const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b${escapedWord}\\b`, 'i');
          return regex.test(lowerText);
        } else {
          // For longer words, check with more flexibility
          // Escape special regex characters in the word to avoid errors
          const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b${escapedWord}\\b|\\b${escapedWord}|${escapedWord}\\b`, 'i');
          return regex.test(lowerText);
        }
      });
    } catch (error) {
      console.error('Error in profanity check:', error);
      // In case of regex error, fall back to a simpler check
      return allBadWords.some(word => lowerText.includes(word));
    }
  }
  
  /**
   * Filter profanity from text by replacing bad words with asterisks
   * @param {string} text - Text to filter
   * @returns {string} - Filtered text with asterisks replacing bad words
   */
  export function filterProfanity(text) {
    if (!text) return '';
    
    let filteredText = text;
    
    // Replace bad words with asterisks
    try {
      for (const word of allBadWords) {
        try {
          if (word.length <= 3) {
            // For very short words, require word boundaries
            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
            filteredText = filteredText.replace(regex, match => '*'.repeat(match.length));
          } else {
            // For longer words, be more flexible
            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedWord}\\b|\\b${escapedWord}|${escapedWord}\\b`, 'gi');
            filteredText = filteredText.replace(regex, match => '*'.repeat(match.length));
          }
        } catch (e) {
          // Skip problematic words that cause regex errors
          console.warn(`Skipping problematic word in filter: ${word}`);
          continue;
        }
      }
    } catch (error) {
      console.error('Error in profanity filtering:', error);
      // In case of major error, return the original text
      return text;
    }
    
    return filteredText;
  }
  
  /**
   * Suggest a clean alternative if a username contains profanity
   * @param {string} text - Original text that contains profanity
   * @returns {string} - A suggested clean alternative
   */
  export function suggestCleanAlternative(text) {
    if (!text) return text;
    
    try {
      // Check if it actually contains profanity
      const hasProfanity = containsProfanity(text);
      if (!hasProfanity) return text;
      
      // First attempt: Replace obvious profanity with asterisks
      let cleaned = filterProfanity(text);
      
      // If the result is mostly asterisks, suggest a more usable alternative
      const asteriskCount = (cleaned.match(/\*/g) || []).length;
      const asteriskRatio = asteriskCount / cleaned.length;
      
      if (asteriskRatio > 0.3) {
        // Too many asterisks, suggest a completely different name
        // Just keep any letters and numbers that aren't part of the bad words
        const safeChars = text.split('').filter(char => {
          return /[A-Za-z0-9]/.test(char) && !allBadWords.includes(char.toLowerCase());
        });
        
        if (safeChars.length >= 3) {
          cleaned = safeChars.join('');
        } else {
          // Not enough safe characters, suggest "User" plus some random digits
          const randomDigits = Math.floor(1000 + Math.random() * 9000);
          cleaned = `User${randomDigits}`;
        }
      }
      
      return cleaned;
    } catch (error) {
      console.error('Error in suggesting clean alternative:', error);
      // In case of error, return a safe default
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      return `User${randomDigits}`;
    }
  }