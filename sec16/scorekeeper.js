
let btns = document.querySelectorAll("button");
let p1 = btns[0];
let p2 = btns[1];

let p1Display = document.querySelector("#p1");
let p2Display = document.querySelector("#p2");

let limDisplay = document.querySelector("#lim");

let reset = btns[2];

let p1Score = 0, p2Score = 0;

let winningScore = 5;
let gameOver = false;

let nInput = document.querySelector("input");

p1.addEventListener("click", function () {
  if(!gameOver) {
    p1Score++;
    p1Display.textContent = p1Score;

    if (p1Score === winningScore) {
      gameOver = true;
      p1Display.style.color = "green";
    }
  }
});

p2.addEventListener("click", function () {
  if (!gameOver) {
    p2Score++;
    p2Display.textContent = p2Score;

    if (p2Score === winningScore) {
      gameOver = true;
      p2Display.style.color = "green";
    }
  }
});

reset.addEventListener("click", function () {
  p1Score = 0;
  p2Score = 0;
  p1Display.textContent = p1Score;
  p2Display.textContent = p2Score;
  gameOver = false;
  p1Display.style.color = "black";
  p2Display.style.color = "black";
});

nInput.addEventListener("change", function() {
  winningScore = parseInt(nInput.value);
  limDisplay.textContent = nInput.value;
});