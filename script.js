const QS = (q) => document.querySelector(q)

// Declare global variables
const message = QS("#message")
var specialMessage = QS("#specialMessage")
const guessInput = QS("#guessInput")
const guessButton = QS("#guessButton")
const restartButton = QS("#restartButton")
var minNumber
var maxNumber
var winningNumber
var guessedNumber
var gameWon = false
var gameOver = false
var numbersGuessed = []
var guessCount
const MAXTRIES = 10

// Set Event Listeners
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
    winningNumber = getRandomNum()
    message.innerText = "Guess a number between 1 and 100."
    document.getElementById("specialMessage").innerText = `Guess the number within ${MAXTRIES} tries.`
    gameWon = false
    gameOver = false
    var triesRemaining = MAXTRIES
    guessButton.style.display = "initial"
}

function guessNumber() {
    if (gameWon || gameOver) return

    guessedNumber = parseInt(guessInput.value)
    guessInput.value = ""

    if (!isInRange()) {
        message.innerHTML = `Guess a number between <b>${minNumber}</b> and <b>${maxNumber}</b>.`
        return
    }

    if (numbersGuessed.includes(guessedNumber)) {
        message.innerText = `You already guessed ${guessedNumber}. Try another number.`
        return
    }

    numbersGuessed.push(guessedNumber)
    guessCount++
    triesRemaining = MAXTRIES - guessCount

    if (guessedNumber == winningNumber) {
        message.innerText = `You won! It took you only ${guessCount} guesses.`
        specialMessage.innerText = "My daughters are my favorite beta testers! I love my daughters!!!"
        gameWon = true
        guessButton.style.display = "none"
    } else collapseNumRange()

    if (triesRemaining <= 0 && !gameWon) {
        message.innerText = `You lost. You could not guess the number within ${MAXTRIES} tries.`
        guessButton.style.display = "none"
        gameOver = true
    }

    if (!gameWon && !gameOver) {
        message.innerHTML = `Guess a number between ${minNumber} and ${maxNumber}.
                            </br>You have <i>${triesRemaining}</i> tries remaining.`
        guessInput.setAttribute("min", minNumber)
        guessInput.setAttribute("max", maxNumber)
    }
}

//May use to simply (re)startGame function
function resetVariables() {

}

function getRandomNum() {
    let randomNumber = Math.ceil(Math.random() * 100)
    console.log(`Random Number:  ${randomNumber}`)
    return randomNumber
}

function isInRange() {
    if (guessedNumber >= minNumber && guessedNumber <= maxNumber) {
        return true
    }
    return false
}

const collapseNumRange = () => {
    if (guessedNumber >= minNumber && guessedNumber < winningNumber) {
        minNumber = guessedNumber
    }
    else {
        maxNumber = guessedNumber
    }
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
