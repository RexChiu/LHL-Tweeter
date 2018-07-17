/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const tweetData = {
    "user": {
        "name": "Newton",
        "avatars": {
            "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
};


$(document).ready(function () {

    var $tweet = createTweetElement(tweetData);

    console.log($tweet[0]);
    $(".tweet-container").append($tweet);

});

function createTweetElement(tweetObj) {
    //calculates the difference in time for tweet creation
    var timeDiff = new Date().getTime() - tweetObj.created_at;
    var daysDiff = parseInt(Math.floor(timeDiff / (1000*60*60*24)));

    //create empty article
    var $tempTweet = $("<article>");
    $tempTweet.addClass("tweet");

    //creates empty header
    var $tempTweetHeader = $("<header>").addClass("tweet-header");
    //creates and fills in things inside the header
    var $tempTweetImgSrc = $("<img>").attr("src", `${tweetObj.user.avatars.regular}`);
    var $tempAuthor = $("<span>").addClass("tweet-author").text(`${tweetObj.user.name}`);
    var $tempMention = $("<span>").addClass("tweet-mention").text(`${tweetObj.user.handle}`);
    //appends into header
    $tempTweetHeader.append($tempTweetImgSrc).append($tempAuthor).append($tempMention);
    //appends header into empty article
    $tempTweet.append($tempTweetHeader);

    //creates and populates div body
    var $tempTweetBody = $("<div>").addClass("tweet-body");
    $tempTweetBody.text(`${tweetObj.content.text}`);
    //appends body into article
    $tempTweet.append($tempTweetBody);

    //appends horizontal line into article
    $tempTweet.append($("<hr>"));

    //creates empty footer
    var $tempTweetFooter = $("<footer>").addClass("tweet-footer");
    //creates and fills in things inside the footer
    var $tempTweetDate = $("<span>").addClass("tweet-date").text(`${daysDiff} days ago`);
    var $tempTweetFlag = $("<i>").addClass("fa fa-flag");
    var $tempTweetRetweet = $("<i>").addClass("fa fa-retweet");
    var $tempTweetHeart = $("<i>").addClass("fa fa-heart");
    //appends into footer
    $tempTweetFooter.append($tempTweetDate).append($tempTweetFlag).append($tempTweetRetweet).append($tempTweetHeart);
    //appends footer into article
    $tempTweet.append($tempTweetFooter);

    return $tempTweet;
}