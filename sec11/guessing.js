let number = Math.floor((Math.random() * 10000) % 200)
let guess = Number(prompt("Guess the number!"));

while (guess !== number) {

  if (guess < number) {
    alert("Too low!");
  } 
  else if (guess > number) {
    alert("Too high!");
  }

  guess = Number(prompt("Guess the number!"));
}

alert("Correct!");
