let todos = []

window.setTimeout(function () {
  // put all of your JS code from the lecture here


  let input = prompt("What would you like to do?");

  while (input !== "quit") {

    if (input === "list") {
      console.log("*******")
      todos.forEach((todo, i) => console.log(i + ": " + todo));
      console.log("*******")
    }
    else if (input === "new") {
      let todo = prompt("What is the new todo?");
      todos.push(todo);
    }
    else if (input === "delete") {
      let todo = Number(prompt("Index of todo to delete"));
      console.log(todos.splice(todo,1) + " was removed.");
    }

    input = prompt("What would you like to do?");
  }

}, 500);