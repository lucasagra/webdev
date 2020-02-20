
$("#b1").on("click", function() {

    // $("div").fadeOut(1000, function(){
    //     console.log("print2"); // after finished 1000ms fade out
    //     // $(this).remove(); // remove div;
    // });
    // console.log("print1"); // after start fade out    

    
    // $("div").fadeIn(1000);


    $("div").fadeToggle(1000);
})


$("#b2").on("click", function() {
    $("div").slideToggle(1000);
})