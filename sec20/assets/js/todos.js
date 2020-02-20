$("ul").on("click", "li", function() {
    // // if its done
    // if($(this).css("color") === "rgb(128, 128, 128)") {
    //     $(this).css({
    //         color: "black",
    //         textDecoration: "none"
    //     });
    // } else { // if not done yet
    //     $(this).css({
    //         color: "gray",
    //         textDecoration: "line-through"
    //     });
    // }

    $(this).toggleClass("completed");
});

// Delete click
$("ul").on("click", "span", function(event) {
    $(this).parent().fadeOut(function() {
        $(this).remove();
    });
    
    // do not propagate to parent (li)
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
    if(event.which === 13) {
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + $(this).val() + "</li>")
        $(this).val("");
    }
});


$(".fa-plus").click(function() {
    $("input[type='text']").fadeToggle();
})