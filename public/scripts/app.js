/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const tweetData = [
    {
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
    },
    {
        "user": {
            "name": "Descartes",
            "avatars": {
                "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd"
        },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    },
    {
        "user": {
            "name": "Johann von Goethe",
            "avatars": {
                "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
        },
        "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368
    }
];


$(document).ready(function () {
    //appends all the tweets onto the tweets container
    renderTweets(tweetData);
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