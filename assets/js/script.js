const timerElement = document.getElementById("time-remaining");
const timerView = document.getElementById("timer");
const highScoreView = document.querySelector("#highscores");
const startButton = document.getElementById("start-quiz");

const mainElement = document.querySelector("#main-content");
const messageElement = document.querySelector("h1");
const textElement = document.querySelector("p");

const choicesListElement = document.getElementById("choices-list");
const indicatorElement = document.getElementById("indicator");

const formElement = document.createElement("div");
const highscoresElement = document.createElement("div");
const textInputElement = document.createElement("input");
const formButton = document.createElement("button");
const backButton = document.createElement("button");
const clearButton = document.createElement("button");


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
        question:
            "How do you create a function in JavaScript?",
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

// FUNCTIONS
init();

function init() {
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
                indicatorElement.innerHTML = "<hr> CORRECT!";
                indicatorElement.setAttribute("style", "color: lightgreen");
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
//Enter Score

function renderForm() {
    formElement.textContent = "ENTER NAME: ";
    formElement.setAttribute("style", "color: white");
    formButton.textContent = "SUBMIT";
    mainElement.appendChild(formElement);
    formElement.appendChild(textInputElement);
    formElement.appendChild(formButton);
}
