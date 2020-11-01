var timerElement = document.getElementById("time-remaining");
var timerView = document.getElementById("timer");
var highScoreView = document.querySelector("#highscores");
var startButton = document.getElementById("start-quiz");

var mainElement = document.querySelector("#main-content");
var messageElement = document.querySelector("h1");
var textElement = document.querySelector("p");

var choicesListElement = document.getElementById("choices-list");
var responseElement = document.getElementById("response");

var formElement = document.createElement("div");
var highscoresElement = document.createElement("div");
var textInputElement = document.createElement("input");
var formButton = document.createElement("button");
var backButton = document.createElement("button");
var clearButton = document.createElement("button");


var highscore = {
    initials: "",
    score: 0,
};
var highscores = [];
var secondsLeft;
var timerInterval;

var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["A. <Javascript>", "B. <js>", "C. <script>"],
        answer: 2,
    },

    {
        question: "Where is the correct place to insert a JavaScript?",
        choices: [
            "A. The <head> section",
            "B. The <body> section",
            "C. Both <head> and <body> section are correct",
        ],
        answer: 1,
    },

    {
        question: "How do you create a function in JavaScript?",
        choices: [
            "A. function = myFunction()",
            "B. function myFunction()",
            "C. function:myFunction",
        ],
        answer: 0,
    },
    {
        question: "What does HTML stand for?",
        choices: [
            "A. Hyperlinks and Text Markup Language",
            "B. Home Tool Markup Language",
            "C. Hyper Text Markup Language",
        ],
        answer: 2,
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        choices: [
            "A. <style>",
            "B. <css>",
            "C. <script>",
        ],
        answer: 0,
    },
];

// Start of Functions
initialize();

function initialize() {
    score = 0;
    secondsLeft = 60;
}

function startQuiz() {
    startButton.remove();
    textElement.remove();
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

    giveQuiz();
}

//Start answering the quiz
function giveQuiz(questionNumber) {
    questionNumber = questionNumber || 0;
    var questionItem = questions[questionNumber];
    messageElement.textContent = questionItem.question;

    var newChoices = document.createElement("div");
    choicesListElement.appendChild(newChoices);

    for (var i = 0; i < questionItem.choices.length; i++) {
        var choice = questionItem.choices[i];

        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        li.textContent = choice;
        newChoices.appendChild(li);

        li.addEventListener("click", function (event) {
            if (
                questionItem.answer ===
                parseInt(event.target.getAttribute("data-index"))
            ) {
                score += 10;
                responseElement.innerHTML = "<hr> CORRECT!";
                responseElement.setAttribute("style", "color: purple");
            } else {
                secondsLeft -= 10;
                responseElement.innerHTML = "<hr> WRONG!";
                responseElement.setAttribute("style", "color: red");
            }

            questionNumber++;

            if (questionNumber === questions.length) {
                clearInterval(timerInterval);
                responseElement.textContent = "";
                newChoices.remove();
                messageElement.appendChild(textElement);
                textElement.textContent = "Your final score is: " + score;

                formScore();
            } else {
                setTimeout(function () {
                    giveQuiz(questionNumber);
                    newChoices.remove();
                    responseElement.textContent = "";
                }, 1000);
            }
        });
    }
}

//Submit name for score
function formScore() {
    formElement.textContent = "ENTER NAME: ";
    formElement.setAttribute("style", "color: blue");
    formButton.textContent = "SUBMIT";
    mainElement.appendChild(formElement);
    formElement.appendChild(textInputElement);
    formElement.appendChild(formButton);
}

function submitHighscore() {
    var initialInput = document.querySelector("input").value;
    highscore.initials = initialInput;
    highscore.score = score;
    console.log(highscore);
    localStorage.setItem("highscore", JSON.stringify(highscore));
    mainElement.innerHTML = "";
    highScoreView.textContent = "";
    timerView.textContent = "";

    giveHighscores();
}

function giveHighscores() {
    var storedHighscore = JSON.parse(localStorage.getItem("highscore"));
    messageElement.innerHTML = "Highscores";
    messageElement.setAttribute("style", "color: blue");
    mainElement.appendChild(messageElement);
    highscoresElement.setAttribute("class", "highscore-element");
    highscoresElement.textContent = `${storedHighscore.initials} - ${storedHighscore.score}`;
    messageElement.appendChild(highscoresElement);
    backButton.textContent = "Start Again";
    clearButton.textContent = "Clear";
    mainElement.appendChild(backButton);
    mainElement.appendChild(clearButton);
}

function clear() {
    highscoresElement.remove();
}

function startAgain() {
    location.reload();
}

highScoreView.addEventListener("click", function () {
    textElement.remove();
    startButton.remove();
    giveHighscores();
});

startButton.addEventListener("click", startQuiz);
formButton.addEventListener("click", submitHighscore);
backButton.addEventListener("click", startAgain);
clearButton.addEventListener("click", clear);

