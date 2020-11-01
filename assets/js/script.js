var timerElement = document.getElementById("time-remaining");
var timerView = document.getElementById("timer");
var highScoreView = document.querySelector("#highscores");
var startButton = document.getElementById("start-quiz");

var mainElement = document.querySelector("#main-content");
var messageElement = document.querySelector("h1");
var textElement = document.querySelector("p");

var choicesListElement = document.getElementById("choices-list");
var indicatorElement = document.getElementById("indicator");

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

function startGame() {
    startButton.remove();
    textElement.remove();
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

    renderQuiz();
}

function renderQuiz(questionNumber) {
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
                indicatorElement.innerHTML = "<hr> CORRECT!";
                indicatorElement.setAttribute("style", "color: purple");
            } else {
                secondsLeft -= 10;
                indicatorElement.innerHTML = "<hr> WRONG!";
                indicatorElement.setAttribute("style", "color: red");
            }

            questionNumber++;

            if (questionNumber === questions.length) {
                clearInterval(timerInterval);
                indicatorElement.textContent = "";
                newChoices.remove();
                messageElement.textContent = "Game Over!";
                messageElement.appendChild(textElement);
                textElement.textContent = "Your final score is: " + score;

                renderForm();
            } else {
                setTimeout(function () {
                    renderQuiz(questionNumber);
                    newChoices.remove();
                    indicatorElement.textContent = "";
                }, 1000);
            }
        });
    }
}

function renderForm() {
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

    renderHighscores();
}

function renderHighscores() {
    var storedHighscore = JSON.parse(localStorage.getItem("highscore"));
    messageElement.innerHTML = "Highscores";
    messageElement.setAttribute("style", "color: white");
    mainElement.appendChild(messageElement);
    highscoresElement.setAttribute("class", "highscore-element");
    highscoresElement.textContent = `${storedHighscore.initials} - ${storedHighscore.score}`;
    messageElement.appendChild(highscoresElement);
    backButton.textContent = "Home";
    clearButton.textContent = "Clear";
    mainElement.appendChild(backButton);
    mainElement.appendChild(clearButton);
}

function clear() {
    highscoresElement.remove();
}

function home() {
    location.reload();
}

highScoreView.addEventListener("click", function () {
    textElement.remove();
    startButton.remove();
    renderHighscores();
});

startButton.addEventListener("click", startGame);
formButton.addEventListener("click", submitHighscore);
backButton.addEventListener("click", home);
clearButton.addEventListener("click", clear);

