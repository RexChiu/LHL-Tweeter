$(document).ready(function () {
    $(".new-tweet").find("textarea").on("input", function() {
        console.log(140 - $(this).val().length);
    });
});