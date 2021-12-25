// variables for page elements 
var scoreName = document.querySelector("#score-name")
var scoreNumber = document.querySelector("#score-number")

// gets initial and scores from local storage (via the playerScore object array) and displays on high score page
var loadScores = function () {
    var savedScores = localStorage.getItem("playerScore")

    // if there are no scores, set scores to an empty array and return out of the function
    if (savedScores === null) {
        return false;
    }

    // put string back into an array
    savedScores = JSON.parse(savedScores);
    console.log(savedScores)

    var name = savedScores.initials
    scoreName.textContent = name

    var number = savedScores.score
    scoreNumber.textContent = number

    // // loop through savedScores array
    // for (var i = 0; i < savedScores.length; i++) {
    //   // pass each task object into the 'createTaskEl()' function
    //   //createTaskEl(savedTasks[i]);
    // }

}

loadScores()