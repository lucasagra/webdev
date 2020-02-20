function avarage(ls) {
    let sum = 0;
    for(let i = 0; i < ls.length; i++) {
        sum += ls[i];
    }

    return Math.round(sum/ls.length);
}

let scores = [90, 98, 89, 100, 100, 86, 94];
let scores2 = [1, 2, 3];

console.log(avarage(scores));
console.log(avarage(scores2));