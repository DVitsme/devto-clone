let value = [];
let total = 0;

for (var i = 0; i < 1000; i++) {
  if (i%3 == 0 || i%5 == 0) {
    value.push(i);
  }
}
for (var i = 0; i < value.length; i++) {
  total += value[i];
}

console.log(total);
