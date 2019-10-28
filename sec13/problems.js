function printReverse(arr) {
  arr.forEach((item, i) => console.log(arr[arr.length-1-i]));
}

function isUniform(arr) {
  for(let i = 0; i < arr.length-1; i++) {
    if (arr[i] !== arr[i+1]) return false;
  }

  return true;
}

function sumArray(arr){
  let sum = 0;
  arr.forEach(e => sum+=e);
  return sum;
}

function max(arr) {
  max = 0;
  arr.forEach(e => {
    if(e > max) max = e;
  })
  return max;
}

Array.prototype.myForEach = function(callback) {
  for(let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
}