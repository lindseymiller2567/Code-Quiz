// variables for page elements 
var question = document.querySelector("#question")
var choiceContainer = document.querySelector("#multiple-choice-container")
var choiceText1 = document.querySelector("#choice-text-1")
var choiceText2 = document.querySelector("#choice-text-2")
var choiceText3 = document.querySelector("#choice-text-3")
var choiceText4 = document.querySelector("#choice-text-4")
var answerText = document.querySelector("#answer-text")
var finalScore = document.querySelector("#final-score")
var timer = document.querySelector("#timer")
var submitForm = document.querySelector(".submit-form")

var questionCounter = 0 // What question are you on?
var availableQuestions = []

var timeInterval
var timeLeft = 50;

// create array to hold initials/scores for saving
var initialsScores = [];

// create object array for the questions
var quizQuestions = [
    {
        question: "How do you create a function in JavaScript?",
        choice1: "function()",
        choice2: "create myFunction = function()",
        choice3: "var myFunction = function()",
        choice4: "function.create",
        answer: 3
    },
    {
        question: "What is the method that converts a JavaScript object or value into a string?",
        choice1: "JSON.stringify()",
        choice2: "make.string()",
        choice3: "JSON.parse()",
        choice4: "stringify()",
        answer: 1
    },
    {
        question: "Where does the script tag go in the HTML file? ",
        choice1: "<head> section",
        choice2: "<body> section ",
        choice3: "Both <head> or <body> section",
        choice4: "<footer> section",
        answer: 3
    },
    {
        question: "Which of the below choices can be objects?",
        choice1: "Booleans",
        choice2: "Numbers",
        choice3: "Strings",
        choice4: "All of the above",
        answer: 4
    }
];

// Timer/countdown function 
function countdown() {

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timer.textContent = "Time: " + timeLeft + " seconds remaining"
            timeLeft--
        } else if
            (timeLeft === 1) {
            timer.textContent = "Time: " + timeLeft + " second remaining"
            timeLeft--
        }
        else {
            clearInterval(timeInterval)
            timer.textContent = "You ran out of time!"
            timeLeft = 0
        }
    }, 1000);
}

var subtractTime = function () {
    timeLeft -= 10
    timer.textContent = "Time: " + timeLeft + " seconds remaining"
}

// starts the quiz, makes sure the counter is at zero and assigns the questions array to avaiable questions
var startQuiz = function () {
    questionCounter = 0
    getQuestion()
}

// displays questions and multi choice answers on page
var getQuestion = function () {

    var currentQuestion = quizQuestions[questionCounter]
    var questionText = currentQuestion.question
    question.textContent = questionText

    // choice 1
    var choiceTextA = currentQuestion.choice1
    choiceText1.textContent = choiceTextA

    // choice 2
    var choiceTextB = currentQuestion.choice2
    choiceText2.textContent = choiceTextB

    // choice 3
    var choiceTextC = currentQuestion.choice3
    choiceText3.textContent = choiceTextC

    // choice 4
    var choiceTextD = currentQuestion.choice4
    choiceText4.textContent = choiceTextD

}

// check to see which choice was clicked 
var choiceHandler = function (event) {
    var targetEl = event.target

    if (targetEl.matches("#choice-text-1")) {
        var choiceNumber = targetEl.getAttribute("data-number");
        checkAnswer(choiceNumber);
    }
    else if (targetEl.matches("#choice-text-2")) {
        var choiceNumber = targetEl.getAttribute("data-number");
        checkAnswer(choiceNumber);
    }
    else if (targetEl.matches("#choice-text-3")) {
        var choiceNumber = targetEl.getAttribute("data-number");
        checkAnswer(choiceNumber);
    }
    else if (targetEl.matches("#choice-text-4")) {
        var choiceNumber = targetEl.getAttribute("data-number");
        checkAnswer(choiceNumber);
    }
}

// check to see if the choice clicked was correct
var checkAnswer = function (choiceNumber) {
    var correctAnswer = quizQuestions[questionCounter].answer

    if (choiceNumber == correctAnswer) {
        console.log("You answered correct!")

        // display whether answer was correct or incorrect
        answerText.textContent = "Correct!"

        // need to increment counter by 1 and move through getQuestion function again
        questionCounter++

        if (questionCounter <= 3) {
            getQuestion()
        }
        else { // if there are no more questions left
            // let user save score and name to local storage
            question.textContent = "All Done!"
            finalScore.textContent = "Your final score is: " + timeLeft
            choiceContainer.remove() // removes container from displaying on page
            clearInterval(timeInterval)
            timer.remove() // removes timer from displaying on page
            createFormEl()
        }
    }
    else {
        console.log("You answered incorrect!")

        // display whether answer was correct or incorrect
        answerText.textContent = "Incorrect!"
        subtractTime() // function subtracts 10 from the countdown/score

        // need to increment counter by 1 and move through getQuestion function again
        questionCounter++

        if (questionCounter <= 3) {
            getQuestion()
        }
        else { // if there are no more questions left
            // let user save score and name to local storage
            question.textContent = "All Done!"
            finalScore.textContent = "Your final score is: " + timeLeft
            choiceContainer.remove()
            clearInterval(timeInterval)
            timer.remove()
            createFormEl()
        }
    }
}

// creates the submit btn and input field for entering initials
var createFormEl = function () {
    var labelEl = document.createElement("label")
    labelEl.textContent = "Enter Initials: "

    var inputEl = document.createElement("input")
    inputEl.className = "initialsForm";

    var submitBtn = document.createElement("button")
    submitBtn.type = "submit"
    submitBtn.textContent = "Submit"

    submitForm.appendChild(labelEl)
    submitForm.appendChild(inputEl)
    submitForm.appendChild(submitBtn)

    // if submit btn is clicked, save to local storage
    submitBtn.addEventListener("click", saveScore)
}

// save all initials and scores to local storage
var saveScore = function () {
    answerText.textContent = "Check the high scores to see where you rank!"

    // grabs the initials that were entered in the input field
    var initials = document.querySelector(".initialsForm").value

    var initialsScoresDataObj = {
        score: timeLeft,
        initials: initials,
    } // need to add data- attribute here to save multiple scores and initials 

    initialsScores.push(initialsScoresDataObj)

    localStorage.setItem("playerScore", JSON.stringify(initialsScoresDataObj))
};


// call the choiceHandler function to determine what happens if choice is clicked
choiceText1.addEventListener("click", choiceHandler);
choiceText2.addEventListener("click", choiceHandler);
choiceText3.addEventListener("click", choiceHandler);
choiceText4.addEventListener("click", choiceHandler);

// call the start quiz function to start the quiz
startQuiz()

// call the countdown function to start the timer
countdown()
