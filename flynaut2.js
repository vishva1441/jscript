const word = '00000111110101001111100001001';

let currentChainLength = 0;
let longestChainLength = 0;

for (let i = 0; i < word.length; i++) {
  if (word[i] === '1') {
    currentChainLength++;
    if (currentChainLength > longestChainLength) {
      longestChainLength = currentChainLength;
    }
  } else {
    currentChainLength = 0;
  }
}

console.log('Longest chain length:', longestChainLength);
