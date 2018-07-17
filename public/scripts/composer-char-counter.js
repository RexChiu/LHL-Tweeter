$(document).ready(function () {
    $(".new-tweet").find("textarea").on("input", function() {
        console.log(140 - $(this).val().length);
        console.log($(this).closest("form").find(".counter").text(140 - $(this).val().length));
    });
});