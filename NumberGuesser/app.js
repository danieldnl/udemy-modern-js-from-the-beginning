/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game Values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

//UI Elements
const   game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check If Won
    if(guess === winningNum) {
        gameOver(true, `${guess} is correct, YOU WIN!`, true);
    } else {
        //Wrong number
        guessesLeft -= 1;
        if(guessesLeft === 0) {
            //Game over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`, true);
        } else {
            //Game continues - answer wrong
            gameOver(false, `${guess} is not correct, ${guessesLeft} guesses left`, false);

            //Clear input
            guessInput.value = '';
            guessInput.focus();
        }
    }
});

function gameOver(won, msg, inputDisabled) {
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disabled = inputDisabled;
    //Change border color
    guessInput.style.borderColor = color;
    //Set the text color
    message.style.color = color;
    //Set message
    setMessage(msg);
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}