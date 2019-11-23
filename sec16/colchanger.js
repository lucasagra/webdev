let btn = document.querySelector("button");
// let flag = true;

btn.addEventListener("click", function () {
  // if(flag){
  //   document.body.style.backgroundColor = "purple";
  // } else {
  //   document.body.style.backgroundColor = "white";
  // }
  // flag = !flag;
  document.body.classList.toggle("purple");
});