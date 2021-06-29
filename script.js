const QS = (q) => document.querySelector(q)

var message = QS("#message")
var specialMessage = QS("#specialMessage")
const guessInput = QS("#guessInput")
const guessButton = QS("#guessButton")
const restartButton = QS("#restartButton")
var minNumber = 1
var maxNumber = 100
var randomNumber
var guessedNumber
var gameWon = false
var gameOver = false
var numbersGuessed = []
var guessCount = 0
const MAXTRIES = 10
var triesRemaining = MAXTRIES


//Event Listeners
guessButton.addEventListener("click", guessNumber)
restartButton.addEventListener("click", startGame)
window.addEventListener("keydown", function (event) {
    if (event.keyCode == "13") { guessNumber() }
})

function startGame() {
    minNumber = 1
    maxNumber = 100
    guessInput.setAttribute("min", minNumber)
    guessInput.setAttribute("max", maxNumber)
    guessInput.value = ""
    numbersGuessed = []
    guessCount = 0
    getRandomNum()
    message.innerText = "Guess a number between 1 and 100."
    document.getElementById("specialMessage").innerText = ""
    gameWon = false
    gameOver = false
    triesRemaining = MAXTRIES
    guessButton.style.display = "initial"
}

function guessNumber() {
    if (gameWon || gameOver) return

    guessedNumber = parseInt(guessInput.value)
    guessInput.value = ""

    if (!isInRange()) {
        message.innerText = `Make sure you guess a number between ${minNumber} and ${maxNumber}.`
        return
    }

    if (numbersGuessed.includes(guessedNumber)) {
        message.innerText = `You already guessed ${guessedNumber}. Try another number.`
        return
    }

    numbersGuessed.push(guessedNumber)
    guessCount++
    triesRemaining = MAXTRIES - guessCount

    if (guessedNumber == randomNumber) {
        message.innerText = `You won! It took you only ${guessCount} guesses.`
        specialMessage.innerText = "My daughters are my favorite beta testers! I love my daughters!!!"
        gameWon = true
        guessButton.style.display = "none"
    } else collapseNumRange()

    if (triesRemaining <= 0 && !gameWon) {
        message.innerText = `You lost. You could not guess the number within ${MAXTRIES} tries.`
        gameOver = true
        return
    }

    if (!gameWon) {
        message.innerText = `Guess a number between ${minNumber} and ${maxNumber}. You have ${triesRemaining} tries remaining.`
        guessInput.setAttribute("min", minNumber)
        guessInput.setAttribute("max", maxNumber)
    }
}

function resetVariables() {

}

const getRandomNum = () => {
    randomNumber = Math.ceil(Math.random() * 100)
    console.log(`Random Number:  ${randomNumber}`)
}

const collapseNumRange = () => {
    if (guessedNumber >= minNumber && guessedNumber < randomNumber) {
        minNumber = guessedNumber
    }
    else {
        maxNumber = guessedNumber
    }
}

function isInRange() {
    if (guessedNumber >= minNumber && guessedNumber <= maxNumber) {
        return true
    }
    return false
}

/*
function insertSpecialMessage(specialMessage) {
    let p = document.createElement("p")
    p.innerHTML = specialMessage;
    p.setAttribute("id", "specialMessage")
    game.append(p)
}
*/

startGame()


//var game = document.getElementById("game")

