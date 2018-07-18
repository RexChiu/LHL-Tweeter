/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {
    let tweetData = null;

    getAndRenderTweets();

    //event handler for the form submission
    $("#submit-new-tweet").on('submit',function (event) {
        event.preventDefault();

        //grabs the text in the form
        let $form = $(this);
        let formInput = $(this).find("textarea").val();
        //if empty/null, return true
        if (!formInput){   
            alert("Tweet cannot be empty!");
            return;
        }
        //if form length is over 140
        if (formInput.length > 140){
            alert("Tweet cannot be over 140 characters!");
            return;
        }

        $.post("/tweets", $(this).serialize(), function(resp, err){
            if (err !== "success"){
                console.log(err);
            } else {
                //reset the form
                $form.find("textarea").val("");
                //render everything
                getAndRenderTweets();
            }
        });
    });
});

function renderTweets(tweets) {
    // loops through tweets and sorts it by date
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    let sortedTweets = tweets.sort((a, b) => { return b.created_at - a.created_at; });

    let $tweetContainer = $(".container .tweet-container");

    for (var elem of sortedTweets){
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
            <img src="${escape(tweetObj.user.avatars.regular)}">
            <span class="tweet-author">${escape(tweetObj.user.name)}</span>
            <span class="tweet-mention">${escape(tweetObj.user.handle)}</span>
        </header>
        <div class="tweet-body">${escape(tweetObj.content.text)}</div>
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

function getAndRenderTweets(){
    //clears everything in the tweet-container
    $(".tweet-container").empty();

    $.get("/tweets", function(resp, err){
        if (err !== "success"){
            console.log(err);
        } else {
            renderTweets(resp);
        }
    });
}

//function to prevent code injection, escapes all unsafe strings
function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  