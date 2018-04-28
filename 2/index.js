let arr = [1,2]
let sum = []
let storedNumber = 0;

for (var i = 0; i < 40; i++) {
  arr.push(arr[i]+arr[i+1]);
  if (arr[i]%2 == 0 && arr[i] < 4000000) {
    sum.push(arr[i]);
  }
}

for (var i = 0; i < sum.length; i++) {
  storedNumber += sum[i];
}
console.log(arr);
console.log(sum);
console.log(storedNumber);
