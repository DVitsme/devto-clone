// const loopNumber = 600851475143;
let a = 600851475143;
let b = 2;
let c;
let arr = [];

//
// for (var i = 0; i < loopNumber; i++) {
//   if ((Math.pow(2,i) - 2) % i == 0) {
//     arr.push(i);
//   }
// }
// for (var i = 0; i < arr.length; i++) {
//   if (loopNumber % arr[i] == 0) {
//     console.log(arr[i]);
//   }
// }

while (b != a) {
  if (a % b == 0) {
     c = a/b;
     console.log(c);
     a = a/b
     b = 2;
  } else {

    b += 1;
  }
}

// for (var i = 2; a=i; i++) {
//   if (a % i == 0) {
//      c = i;
//      console.log(c);
//      a = a/i
//   }
// }
