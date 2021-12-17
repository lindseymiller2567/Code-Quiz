// variables for page elements 
var question = document.querySelector("#question")
var choice = document.querySelector(".choice-text")
var timer = document.querySelector("#timer")

var currentQuestion = []
var score = 0
var questionCounter = 0
var availableQuestions = []

var scorePoints = 100
var maxQuestions = 4

// create object array for the questions
var questions = [
    {
        question: "What is 2 + 2 ?",
        choice: {
            choice1: "5",
            choice2: "3",
            choice3: "4",
            choice4: "9"
        },
        correctAnswer: 2
    },
    {
        question: "What is 9 + 2 ?",
        choice: {
            choice1: "11",
            choice2: "3",
            choice3: "4",
            choice4: "9"
        },
        correctAnswer: 1
    },
    {
        question: "What is 10 + 2 ?",
        choice: {
            choice1: "5",
            choice2: "3",
            choice3: "12",
            choice4: "9"
        },
        correctAnswer: 3
    },
    {
        question: "What is 11 + 2 ?",
        choice: {
            choice1: "5",
            choice2: "3",
            choice3: "4",
            choice4: "13"
        },
        correctAnswer: 4
    }
];

// Timer/countdown function 
function countdown() {
    var timeLeft = 7; //change this to 100 later 

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timer.textContent = "Time: " + timeLeft + " seconds remaining "
            timeLeft--
        } else if
            (timeLeft === 1) {
            timer.textContent = "Time: " + timeLeft + " second remaining "
            timeLeft--
        }
        else {
            timer.textContent = " "
            clearInterval(timeInterval)
            timer.textContent = "You ran out of time!"
        }
    }, 1000);
}


var startQuiz = function () {
    questionCounter = 0
    availableQuestions = [...questions]
    getQuestion()
}

var getQuestion = function () {
    // logs score to local storage
    if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("/end.html")
    }

    questionCounter++

    var randomQuestion = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[randomQuestion]
    question.innerText = currentQuestion.question


}

//for (i = 0; i < questions.length; i++) {
//}

// call the start quiz function to start the quiz
startQuiz()

// call the countdown function to start the timer
countdown()