/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {};
    
    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      
      if (!(word in chains)) {
        chains[word] = [];
      }
      
      chains[word].push(nextWord);
    }
    
    this.chains = chains;
  }
  


  /** return random text from chains */

  makeText(numWords = 100) {
    const words = Object.keys(this.chains);
    let currentWord = words[Math.floor(Math.random() * words.length)];
    let output = [currentWord];
    
    while (output.length < numWords && currentWord !== null) {
      const possibleNextWords = this.chains[currentWord];
      currentWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
      if (currentWord !== null) {
        output.push(currentWord);
      }
    }
    
    return output.join(' ');
  }
  
}
