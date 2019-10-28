let age = Number(prompt("What's your age?"));

if (age%2 != 0) {
  console.log("Your age is odd!");
}

let sqrt = Math.floor(Math.sqrt(age));
if(sqrt*sqrt === age) {
  console.log("It's a perfect square");
}

if (age < 0) {
  console.log("Age must be >= 0");
}

else if (age < 18) {
  console.log("Sorry, you are not old eough to enter the venue");
}

else if (age < 21) {
  console.log("You can enter, but cannot drink");
}

else {
  if(age == 21) {
    console.log("Happy 21st birthday!!")
  }
  console.log("Come on in. You can drink");
}