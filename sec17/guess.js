let numberOfSquares = 6;

let colors = generateRandomColors(numberOfSquares);
let pickedColor = colors[Math.floor(Math.random() * colors.length)];

let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

for(let i = 0; i < modeButtons.length; i++) {
  modeButtons[i].addEventListener("click", () => {
    modeButtons[0].classList.remove("selected");
    modeButtons[1].classList.remove("selected");
    modeButtons[i].classList.add("selected");
    
    modeButtons[i].textContent === "Easy"? numberOfSquares = 3: numberOfSquares = 6;
    reset();
  })
}

function reset() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = colors[Math.floor(Math.random() * colors.length)];
  colorDisplay.textContent = pickedColor;
  h1.style.backgroundColor = "steelBlue";
  resetButton.textContent = "New Colors"
  messageDisplay.textContent = "";
  newGame();
}

resetButton.addEventListener("click", () => {
  reset();
})

newGame();

function newGame() {
  for (let i = 0; i < squares.length; i++) {
    setSquares(i);
    // add click listeners
    squares[i].addEventListener("click", () => {
      // get color
      let colorGet = (squares[i].style.backgroundColor);

      if (colorGet === pickedColor) {
        changeColors(pickedColor);
        messageDisplay.textContent = "Correct!"
        h1.style.backgroundColor = pickedColor;
        resetButton.textContent = "Play Again?"
      } else {
        squares[i].style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again"
      }
    });
  }
}

function setSquares(i) {
  if (colors[i]) {
    squares[i].style.display = "block";
    squares[i].style.backgroundColor = colors[i];
  }
  else squares[i].style.display = "none";
}

function changeColors(color) {
  for(let i = 0; i < squares.length; i++) 
    squares[i].style.backgroundColor = color;
}

function generateRandomColors(num) {
  ranColors = [];
  for(let i = 0; i < num; i++) 
    ranColors.push(randomColor());
  
  return ranColors;
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + String(r) + ", " + String(g) + ", " + String(b) + ")";
}