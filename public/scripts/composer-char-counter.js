$(document).ready(function () {
    $(".new-tweet").find("textarea").on("input", function() {
        console.log($(this).val().length);
    });
});