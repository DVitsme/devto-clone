const loopNumber = 600851475143;
let arr = [];


for (var i = 0; i < loopNumber; i++) {
  if ((Math.pow(2,i) - 2) % i == 0) {
    if (loopNumber % i == 0) {
      console.log(i);
    }
  }
}
