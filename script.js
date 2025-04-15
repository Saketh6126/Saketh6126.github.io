document.addEventListener("DOMContentLoaded", () => {
    const analyzeButton = document.getElementById('analyze-btn');
    const textBox = document.getElementById('text-box');
    const outputDiv = document.getElementById('output');
  
    analyzeButton.addEventListener('click', function () {
      const text = textBox.value.trim();
  
      // Hide the output container initially
      outputDiv.style.display = 'none';
  
      if (text.length > 0) {
        // Calculate number of letters, words, spaces, newlines, and special symbols
        const numLetters = text.replace(/[^a-zA-Z]/g, '').length;
        const numWords = text.split(/\s+/).filter(word => word.length > 0).length;
        const numSpaces = (text.match(/\s/g) || []).length;
        const numNewlines = (text.match(/\n/g) || []).length;
        const numSpecialSymbols = text.replace(/[a-zA-Z0-9\s\n]/g, '').length;
  
        // Tokenize the text and count pronouns, prepositions, and indefinite articles
        const words = text.split(/\s+/);
        let pronounCount = {};
        let prepositionCount = {};
        let articleCount = {};
  
        const pronouns = ["i", "me", "he", "him", "she", "her", "they", "them", "we", "us"];
        const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "under", "over"];
        const articles = ["a", "an", "the"];
  
        words.forEach(word => {
          word = word.toLowerCase();
  
          // Count pronouns
          if (pronouns.includes(word)) {
            pronounCount[word] = (pronounCount[word] || 0) + 1;
          }
  
          // Count prepositions
          if (prepositions.includes(word)) {
            prepositionCount[word] = (prepositionCount[word] || 0) + 1;
          }
  
          // Count indefinite articles
          if (articles.includes(word)) {
            articleCount[word] = (articleCount[word] || 0) + 1;
          }
        });
  
        // Display the results
        outputDiv.innerHTML = `
          <h3>Text Analysis:</h3>
          <p><strong>Number of Letters:</strong> ${numLetters}</p>
          <p><strong>Number of Words:</strong> ${numWords}</p>
          <p><strong>Number of Spaces:</strong> ${numSpaces}</p>
          <p><strong>Number of Newlines:</strong> ${numNewlines}</p>
          <p><strong>Number of Special Symbols:</strong> ${numSpecialSymbols}</p>
          
          <h4>Pronouns Count:</h4>
          <ul>${Object.entries(pronounCount).map(([pronoun, count]) => `<li>${pronoun}: ${count}</li>`).join('')}</ul>
  
          <h4>Prepositions Count:</h4>
          <ul>${Object.entries(prepositionCount).map(([prep, count]) => `<li>${prep}: ${count}</li>`).join('')}</ul>
  
          <h4>Indefinite Articles Count:</h4>
          <ul>${Object.entries(articleCount).map(([article, count]) => `<li>${article}: ${count}</li>`).join('')}</ul>
        `;
        outputDiv.style.display = 'block'; // Show the output container
      } else {
        outputDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
        outputDiv.style.display = 'block'; // Show the output container even when no text is entered
      }
    });
  });
  