const QS = (q) => document.querySelector(q)

var message = QS("#message")
const guessInput = QS("#guessInput")
const guessButton = QS("#guessButton")
var minNumber = 1
var maxNumber = 100
var randomNumber
var guessedNumber
var gameWon = false
var numbersGuessed = []



//Event Listeners
guessButton.addEventListener("click", guessNumber)
window.addEventListener("keydown", function(event) {
    if (event.keyCode == "13") {guessNumber()}
})

function guessNumber() {
    guessedNumber = parseInt(guessInput.value)
    guessInput.value = ""

    if (numbersGuessed.includes(guessedNumber)) {
        message.innerText = `You already guessed ${guessedNumber}. Try another number.`
        return
        }
    numbersGuessed.push(guessedNumber)

    if (isInRange()) {
        if (guessedNumber == randomNumber) {
            message.innerText = "You won!"
            gameWon = true
        } else if (guessedNumber > minNumber && guessedNumber < randomNumber) {
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
}

const startGame = () => {
    numbersGuessed = []
    getRandomNum()
    message.innerText = "Guess a number between 1 and 100."
    console.log(`Random Number:  ${randomNumber}`)
    var gameWon = false
}

const getRandomNum = () => {
    randomNumber = Math.ceil(Math.random() * 100)
}

const collapseNumRange = () => {

}

const isInRange = () => {
    if (guessedNumber >= minNumber && guessedNumber <= maxNumber) {
        return true
    }
    return false
}


startGame()
