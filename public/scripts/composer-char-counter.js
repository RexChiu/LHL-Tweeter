$(document).ready(function () {
    //grabs the jquery element of textarea in class new-tweet
    var newTweetTextArea = $(".new-tweet").find("textarea");

    //adds event listener for any changes in the input field
    //calculates characters remaining and updates counter
    newTweetTextArea.on("input", function() {
        var charRemaining = 140 - $(this).val().length;
        var counterElem = $(this).closest("form").find(".counter");
        //styles the CSS of counter to be red if negative
        if (charRemaining < 0){
            counterElem.css("color","red");
        } else {
            counterElem.css("color","#244751");
        }
        counterElem.text(charRemaining);
    });
});