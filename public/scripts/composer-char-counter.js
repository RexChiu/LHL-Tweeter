$(document).ready(function() {
  //grabs the jquery element of textarea in class new-tweet
  var newTweetTextArea = $(".new-tweet").find("textarea");

  //adds event listener for any changes in the input field
  //calculates characters remaining and updates counter
  newTweetTextArea.on("input", function() {
    var charRemaining = 140 - $(this).val().length;
    var $counterElem = $(this)
      .closest("form")
      .find(".counter");
    //styles the CSS of counter to be red if negative

    //updates counter color and text
    $counterElem.toggleClass("overflow", charRemaining < 0);
    $counterElem.text(charRemaining);
  });
});
