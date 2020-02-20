$("button").on("mouseenter", function () {
    $(this).css("font-weight","bold");
});

$("button").on("mouseleave", function () {
    $(this).css("font-weight","normal");
});

$("input").on("keypress", function (event) {
    console.log(event.keyCode);

})

$("h1").on("click", function () {
    $(this).css("color", "purple")
})