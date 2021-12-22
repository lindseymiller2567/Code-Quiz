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
var form = document.querySelector("#form")

var score = ""
var questionCounter = 0 // What question are you on?
var availableQuestions = []

// create object array for the questions
var quizQuestions = [
    {
        question: "What is 2 + 2 ?",
        choice1: "5",
        choice2: "3",
        choice3: "4",
        choice4: "9",
        answer: 3
    },
    {
        question: "What is 9 + 2 ?",
        choice1: "11",
        choice2: "3",
        choice3: "4",
        choice4: "9",
        answer: 1
    },
    {
        question: "What is 10 + 2 ?",
        choice1: "5",
        choice2: "3",
        choice3: "12",
        choice4: "9",
        answer: 3
    },
    {
        question: "What is 11 + 2 ?",
        choice1: "5",
        choice2: "3",
        choice3: "4",
        choice4: "13",
        answer: 4
    }
];


// Timer/countdown function 
function countdown() {

    var timeLeft = 50;

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timer.textContent = "Time: " + timeLeft + " seconds remaining"
            timeLeft--
            score = timeLeft
        } else if
            (timeLeft === 1) {
            timer.textContent = "Time: " + timeLeft + " second remaining"
            timeLeft--
            score = timeLeft
        }
        else {
            timer.textContent = " "
            clearInterval(timeInterval)
            timer.textContent = "You ran out of time!"
            score = 0
        }
    }, 1000);
}

var subtractTime = function () {
    score -= 10
    console.log("Your current score is " + score)
    timer.textContent = "Time: " + score + " seconds remaining"
}

// starts the quiz, makes sure the counter is at zero and assigns the questions array to avaiable questions
var startQuiz = function () {
    questionCounter = 0
    getQuestion()
}

var getQuestion = function () {

    var currentQuestion = quizQuestions[questionCounter]
    console.log(currentQuestion)

    var questionText = currentQuestion.question
    console.log(questionText)

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

var choiceHandler = function (event) {
    // check to see which choice was clicked 
    var targetEl = event.target
    //console.log(targetEl)

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
    console.log("the correct answer is: " + correctAnswer)

    if (choiceNumber == correctAnswer) {
        console.log("You answered correct!")

        // display whether answer was correct or incorrect
        answerText.textContent = "Correct!"

        // need to increment counter by 1 and move through getQuestion function again
        questionCounter++
        console.log("the count is on question: " + questionCounter)
        if (questionCounter <= 3) {
            getQuestion()
        }
        else {
            // let user save score and name to local storage
            question.textContent = "All Done!"
            finalScore.textContent = "Your final score is: " + score
            choiceContainer.remove()
            timer.remove()
        }
    }
    else {
        console.log("Try again!")

        // display whether answer was correct or incorrect
        answerText.textContent = "Incorrect!"
        subtractTime()

        // need to increment counter by 1 and move through getQuestion function again
        questionCounter++
        console.log("the count is on question: " + questionCounter)
        if (questionCounter <= 3) {
            getQuestion()
        }
        else {
            // let user save score and name to local storage
            question.textContent = "All Done!"
            finalScore.textContent = "Your final score is: " + score
            choiceContainer.remove()
            timer.remove()
            // display form here for submiting initials and score using doc.createElement ? 
        }
    }
}

// create form element
//var submitForm = document.createElement("form");


// call the choiceHandler function to determine what happens if choice is clicked
choiceText1.addEventListener("click", choiceHandler);
choiceText2.addEventListener("click", choiceHandler);
choiceText3.addEventListener("click", choiceHandler);
choiceText4.addEventListener("click", choiceHandler);

// call the start quiz function to start the quiz
startQuiz()

// call the countdown function to start the timer
countdown()