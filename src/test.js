const original = [1, 2, 3];
const reversed = [];
console.log('original:',original.length)
for (let i = original.length - 1; i >= 0; i--) {
    console.log(i)
  reversed.push(original[i]);
}

console.log(reversed)