const QS = (q) => document.querySelector(q)

var message = QS("#message")
const guessInput = QS("#guessInput")
const guessButton = QS("#guessButton")
const restartButton = QS("#restartButton")
var minNumber = 1
var maxNumber = 100
var randomNumber
var guessedNumber
var gameWon = false
var numbersGuessed = []
var guessCount = 0


//Event Listeners
guessButton.addEventListener("click", guessNumber)
restartButton.addEventListener("click", startGame)
window.addEventListener("keydown", function (event) {
    if (event.keyCode == "13") { guessNumber() }
})

function guessNumber() {
    if (gameWon) return
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

    if (guessedNumber == randomNumber) {
        message.innerText = `You won! It took you only ${guessCount} guesses.`
        gameWon = true
    } else if (guessedNumber >= minNumber && guessedNumber < randomNumber) {
        minNumber = guessedNumber

    } else {
        maxNumber = guessedNumber
    }
    if (!gameWon) {
        message.innerText = `Guess a number between ${minNumber} and ${maxNumber}.`
    }

    guessInput.setAttribute("min", minNumber)
    guessInput.setAttribute("max", maxNumber)
    guessInput.value = ""
}


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
    console.log(`Random Number:  ${randomNumber}`)
    gameWon = false
}

const getRandomNum = () => {
    randomNumber = Math.ceil(Math.random() * 100)
}

const collapseNumRange = () => {

}

function isInRange() {
    if (guessedNumber >= minNumber && guessedNumber <= maxNumber) {
        return true
    }
    return false
}


startGame()
