const QS = (q) => document.querySelector(q)

const DARKBLUE = "rgb(44, 66, 99)"
const DARKRED = "rgb(190, 0, 50)"
const LIGHTERBLUE = "rgba(50, 75, 125, .5)"

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
    specialMessage.innerText = `Guess the number within ${MAXTRIES} tries.`
    gameWon = false
    gameOver = false
    var triesRemaining = MAXTRIES
    guessButton.style.visibility = "initial";
    QS("#game").style.borderColor = DARKBLUE
    restartButton.style.visibility = "hidden"
    restartButton.style.backgroundColor = DARKBLUE
}

function guessNumber() {
    if (gameWon || gameOver) return

    if (!guessInput.value || isNaN(guessInput.value)) {
        message.innerHTML = `Guess a <b>number</b> between ${minNumber} and ${maxNumber}.`
        console.log("Number wasn't guessed")
        guessInput.value = ""
        QS("#game").style.borderColor = DARKRED
    
        return
    }

    restartButton.style.visibility = "initial"
    guessedNumber = parseInt(guessInput.value)
    guessInput.value = ""

    if (!isInRange()) {
        message.innerHTML = `Guess a number between <b>${minNumber}</b> and <b>${maxNumber}</b>.`
        QS("#game").style.borderColor = DARKRED
    
        console.log("Guess was out of range.")
        return
    }

    if (numbersGuessed.includes(guessedNumber)) {
        message.innerText = `You already guessed ${guessedNumber}.\n Try a number between ${minNumber} and ${maxNumber}.`
        QS("#game").style.borderColor = DARKRED
    
        console.log("Guessed number was already tried.")
        return
    }

    QS("#game").style.borderColor = DARKBLUE
    numbersGuessed.push(guessedNumber)
    guessCount++
    triesRemaining = MAXTRIES - guessCount

    if (guessedNumber == winningNumber) {
        message.innerHTML = `<b style="color: ${DARKBLUE}">You won!</b></br> You got the answer in ${guessCount} guess`
        message.innerHTML += (guessCount > 1 ? "es." : ".")
        specialMessage.innerText = `The winning number was ${winningNumber}.`
        gameWon = true
        console.log("game won")
    } else collapseNumRange()

    if (triesRemaining <= 0 && !gameWon) {
        message.innerHTML = `<b style="color: ${DARKRED
    }">You lost.</b></br>You did not guess the number in ${MAXTRIES} tries.`
        gameOver = true
        console.log("game lost")
    }

    if (gameWon || gameOver) {
        specialMessage.innerText = `The number was ${winningNumber}.`
        guessButton.style.visibility = "hidden"
        restartButton.style.backgroundColor = DARKRED

        QS("#game").style.borderColor = LIGHTERBLUE
        setTimeout(() => {
            QS("#game").style.borderColor = DARKBLUE
        }, 500)
        setTimeout(() => {
            QS("#game").style.borderColor = LIGHTERBLUE
        }, 1000)
        setTimeout(() => {
            QS("#game").style.borderColor = DARKBLUE
        }, 1500)
    }

    if (!gameWon && !gameOver) {
        message.innerHTML = `Guess a number between ${minNumber} and ${maxNumber}.`     
        specialMessage.innerHTML = `You have <i>${triesRemaining}</i> tries remaining.`
        guessInput.setAttribute("min", minNumber)
        guessInput.setAttribute("max", maxNumber)
    }
}

//May use to simplify (re)startGame function
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
