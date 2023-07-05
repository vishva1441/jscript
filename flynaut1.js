var fullWordList = ['1', '2', '3', '4', '5'];
var wordsToRemove = ['1', '2', '3'];

// Find duplicates
var duplicates = fullWordList.filter((word, index) => fullWordList.indexOf(word) !== index);

// Find same values
var sameValues = fullWordList.filter(word => wordsToRemove.includes(word));

console.log('Duplicates:', duplicates);
console.log('Same Values:', sameValues);
