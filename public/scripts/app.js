/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {
    let tweetData = null;

    $.get("/tweets", function(resp, err){
        if (err !== "success"){
            console.log(err);
        } else {
            renderTweets(resp);
        }
    });

    //appends all the tweets onto the tweets container
    //renderTweets(tweetData);

    $("#submit-new-tweet").on('submit',function (event) {
        event.preventDefault();

        $.post("/tweets", $(this).serialize());
    });
});

function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    var $tweetContainer = $(".container .tweet-container");

    for (var elem of tweets){
        var $tweet = createTweetElement(elem);
        $tweetContainer.append($tweet);
    }
}

function createTweetElement(tweetObj) {
    //calculates the difference in time for tweet creation
    var timeDiff = new Date().getTime() - tweetObj.created_at;
    var daysDiff = parseInt(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));

    var $tweet = $(
    `<article class="tweet">
        <header class="tweet-header">
            <img src="${tweetObj.user.avatars.regular}">
            <span class="tweet-author">${tweetObj.user.name}</span>
            <span class="tweet-mention">${tweetObj.user.handle}</span>
        </header>
        <div class="tweet-body">${tweetObj.content.text}</div>
        <hr>
        <footer class="tweet-footer">
            <span class="tweet-date">${daysDiff} days ago</span>
            <i class="fa fa-flag"></i>
            <i class="fa fa-retweet"></i>
            <i class="fa fa-heart"></i>
        </footer>
    </article>`);

    return $tweet;
}