function isEven(x) {
  return x%2 === 0;
}

function factorial(x) {
  if (x <= 1) {
    return 1;
  }
  return x * factorial(x-1);
}

function kebabToSnake(str) {
  return str.replace(/-/g, '_');
}

function test(){
  console.log("Printing");
}

console.log(setInterval(test, 2000));