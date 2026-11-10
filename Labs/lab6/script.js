
let likes = 0;
let dislikes = 0;
let comments = [];

let likeButton = document.getElementById("like");
let dislikeButton = document.getElementById("dislike");
let likeCount = document.getElementById("likeCount");
let dislikeCount = document.getElementById("dislikeCount");

let commentInput = document.getElementById("comment");
let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset");
let commentsList = document.getElementById("commentsList");

let hasVoted = false;
let hasCommented = false;

let cookies = document.cookie.split(";");

for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();

    if (cookie.indexOf("likes=") === 0) {
        likes = Number(cookie.substring(6));
    }

    if (cookie.indexOf("dislikes=") === 0) {
        dislikes = Number(cookie.substring(9));
    }

    if (cookie === "voted=true") {
        hasVoted = true;
    }

    if (cookie.indexOf("comment=") === 0) {
        comments.push(cookie.substring(8));
        hasCommented = true;
    }
}

likeCount.innerText = likes;
dislikeCount.innerText = dislikes;

function displayComments() {
    commentsList.innerHTML = "";

    comments.forEach(function(comment) {
        let p = document.createElement("p");
        p.innerText = comment;
        commentsList.appendChild(p);
    });
}

displayComments();

likeButton.addEventListener("click", function() {
    if (hasVoted === false) {
        likes++;
        likeCount.innerText = likes;

        document.cookie = "likes=" + likes;
        document.cookie = "voted=true";

        hasVoted = true;
    }
});

dislikeButton.addEventListener("click", function() {
    if (hasVoted === false) {
        dislikes++;
        dislikeCount.innerText = dislikes;

        document.cookie = "dislikes=" + dislikes;
        document.cookie = "voted=true";

        hasVoted = true;
    }
});

submitButton.addEventListener("click", function() {
    if (hasCommented === false && commentInput.value !== "") {
        let comment = commentInput.value;

        comments.push(comment);
        document.cookie = "comment=" + comment;

        hasCommented = true;

        displayComments();
        commentInput.value = "";
    }
});

resetButton.addEventListener("click", function() {
    document.cookie = "voted=; max-age=0";
    document.cookie = "likes=; max-age=0";
    document.cookie = "dislikes=; max-age=0";
    document.cookie = "comment=; max-age=0";

    likes = 0;
    dislikes = 0;
    comments = [];

    hasVoted = false;
    hasCommented = false;

    likeCount.innerText = likes;
    dislikeCount.innerText = dislikes;

    commentInput.value = "";
    displayComments();
});
