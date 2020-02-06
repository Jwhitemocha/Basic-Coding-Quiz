// Const's for ID's 
const $start = $("#start");
const $highScore = $("#highScore");
const $homeScreen = $("#homeScreen");
const $quizScreen = $("#quizScreen");
const $score = $("#score");
const $finished = $("#finished");
const $question = $("#question");
const $answer1 = $("#answer1");
const $answer2 = $("#answer2");
const $answer3 = $("#answer3");
const $answer4 = $("#answer4");
const $name = $("#name");
const $submitBtn = $("#submitBtn");
const $scoreScreen = $("#scoreScreen");
const $scoreList = $("#scoreList");
const $clearBtn = $("#clear");
const $backBtn = $("#back");
const $time = $("#time");
const $answerGrade = $("#score");
const $answerBtn = $(".answerBtn");
const $reenterName = $("#reenterName");
const questions = [
    {
        title: "What is the tag that makes text bold?",
        choices:["<strong>", "<em>", "<a>", "<p>"],
        answer: "<strong>"
    },
    {
        title: "Which HTML element do we place the JavaScript?",
        choices:["<scripting>", "<javascript>", "<js>", "<script>"],
        answer:"<script>"
    },
    {
        title:"What is the correct syntax for referring to an external script called `test.js`?",
        choices:["<script src='test.js'>", "<script class='test.js>'","<script href='test.js'>","<script name='test.js'>"],
        answer:"<script src='test.js'>"
    },
    {
        title:"How do you write a comment in JavaScript?",
        choices:["'__'", "Comment()", "//", "*Comment*"],
        answer:"//"
    },
    {
        title:"Which CSS property controls the text size?",
        choices:["font-size", "font-style", "text-style", "text-size"],
        answer:"font-size"
    },
    {
        title:"How do you select an element with id 'quiz'?",
        choices:[".quiz", "*quiz", "#quiz", "quiz"],
        answer:"#quiz"
    }
];
let timer;
let secondsLeft;
let qCount;

$start.on('click',function(){ 
    $homeScreen.addClass('hide');
    qCount = 0;
    $answerGrade.text("");
    nextQuestion();
    countdown();
})

$highScore.on('click',function(){ 
    $homeScreen.addClass('hide');
    showScores();
})

function nextQuestion(){
    $quizScreen.removeClass('hide');
    if(questions[qCount] === undefined){ 
        gameEnd();
        return
    }
    $question.text(questions[qCount].title);
    $answer1.text(questions[qCount].choices[0]);
    $answer2.text(questions[qCount].choices[1]);
    $answer3.text(questions[qCount].choices[2]);
    $answer4.text(questions[qCount].choices[3]);
    qCount++;
}

$answerBtn.on('click', function(){ 
    if($(this).text() === questions[qCount - 1].answer){
        $answerGrade.text("Good JOB!")
        nextQuestion();
    }
    else { 
        $answerGrade.text('You Wrong hahaha');
        secondsLeft-=5;
        $time.text(secondsLeft);
    }
})

function gameEnd(){ 
    stopTimer();
    $quizScreen.addClass('hide');
    $finished.removeClass('hide');
    $('.scoreShow').text(`Score is ${secondsLeft}`);
}

function countdown(){ 
    secondsLeft = 45; 
    $time.text(secondsLeft);
    timer = setInterval(function() { 
        secondsLeft --;
        $time.text(secondsLeft);
        if (secondsLeft <= 0) { 
            clearInterval(timer);
            gameEnd();
        }
    },1000);
}

function stopTimer(){
    clearInterval(timer);
}

let userScore = [];

$submitBtn.on('click',function(e) { 
    e.preventDefault();
    let $user = $("#name").val().trim();
    $reenterName.text('');
    if ($user.trim() === ""){ 
        $reenterName.text("Put your name please...");
        return
    }
    if (localStorage.getItem("users") != undefined){ 
        userScore = JSON.parse(localStorage.getItem("users"));
    }
    userScore.push({name: $user,score:secondsLeft});
    userScore = JSON.stringify(userScore);
    localStorage.setItem("users",userScore);
    $finished.addClass('hide');
    showScores();
})

function showScores() { 
    $scoreScreen.removeClass('hide');
    if(localStorage.getItem("users")){ 
        userScore = JSON.parse(localStorage.getItem("users"));
    }
    userScore.sort(function(a,b){return b.score - a.score});
    for (let i in userScore){ 
        const $userLi = $("<li>")
        $userLi.text(userScore[i].name + "-"+ userScore[i].score);
        $scoreList.append($userLi);
    }
}

$clearBtn.on('click', function() { 
    localStorage.removeItem("users");
    $scoreList.empty();
})

$backBtn.on('click', function() { 
    $scoreScreen.addClass('hide');
    $homeScreen.removeClass('hide');
    $scoreList.empty();
    userScore = [];
})