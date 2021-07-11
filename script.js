const guessBtn = document.getElementById("submit");
const guessField = document.getElementById("guess");
const prevGuesses = document.getElementById("guesses");
const infoDiv = document.getElementById("info");
const error = document.getElementById("input-error");
const feedback = document.getElementById("feedback");

const feedbackHigh = "Last guess was too high!";
const feedbackLow = "Last guess was too low!"

const banner = document.getElementById("banner");
const newGameBtn = document.getElementById("new-game");
const turns = document.getElementById("turns");

let guessesArr = [];

const MIN = 1;
const MAX = 100;
const turnLimit = 5;

const descString = `We have selected a random number between ${MIN} and ${MAX}. 
See if you can guess it in <strong>${turnLimit}</strong> turns or fewer. We'll tell you if your guess was too high or too low.`;

document.getElementById("description").innerHTML = descString;

guessField.value = "";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

let guess = getRandomInt(MIN, MAX+1);

function elemIsInvisible(elem){
    return elem.classList.contains("invisible");
}

function toggleElement(elem){
    vis = !elemIsInvisible(elem);

    function makeElemVisible(){
        elem.classList.remove("invisible");
    }
    
    function makeElemInvisible(){
        elem.classList.add("invisible");
    }

    if(!vis){
        makeElemVisible();
        vis = true;
    }

    else{
        makeElemInvisible();
        vis = false;
    }
}


function getGuess(){
    const guess = guessField.value;

    if(guess == "" || guess < MIN || guess > MAX){
        return null;
    }

    else{
        return Number(guess);
    }
}

// add the last element to the text
function writePrevGuesses(){
    prevGuesses.innerText += " " + guessesArr[guessesArr.length-1];
}

function writeTurns(){
    turns.innerText =  "Turns: " + (counter+1);
}

function handleInput(guessVal){
    // guess not null: push to arr, if error visible make it invis, if infoDiv invis make it vis
    if(guessVal != null){
        guessesArr.push(guessVal);

        if(!elemIsInvisible(error)){
            toggleElement(error);
        }

        if(elemIsInvisible(infoDiv)){
            toggleElement(infoDiv);
        }

        // write previous guesses into p tag
        writePrevGuesses();
        writeTurns();
    }

    // null: if error invisible toggle error. don't need to make infodiv invis.
    else{
        if(elemIsInvisible(error)){
            toggleElement(error);
        }
    }
}

function toggleBanner(option){
    switch(option){
        case "correct":
            banner.style.backgroundColor = "rgb(133, 206, 24)";
            banner.innerText = "Right!"
            break;
        case "over":
            banner.innerText = `Game Over! Answer was ${guess}`;
            break;
        case "reset":
            banner.innerText = "Wrong!";
            banner.style.backgroundColor = "rgb(231, 33, 33)";
            break;
    }
}

function toggleFeedback(string){
    feedback.innerText = string;
}

function disableElement(elem){
    elem.disabled = true;
}

function checkGuess(guessVal){
    // game over, disable submit guess 
    // correct - change banner color/content, show new game button, hide feedback p

     if(guessVal != null){
        if(guessVal == guess){
            toggleBanner("correct");
            toggleElement(newGameBtn);
            toggleElement(feedback);
        }

        else if (counter >= turnLimit-1){
            toggleBanner("over");
            toggleElement(feedback);
            toggleElement(newGameBtn);
            disableElement(guessBtn);
            disableElement(guessField);
        }

        else{
            if(guessVal < guess){
                toggleFeedback(feedbackLow);
            }

            else{
                toggleFeedback(feedbackHigh);
            }
        }
    }
}

function incrementCounter(guessVal){
    if(guessVal != null){
        counter++;
    }
}

let counter = 0;
guessBtn.onclick = function(){
    const guessVal = getGuess();
    handleInput(guessVal);
    checkGuess(guessVal); 
    incrementCounter(guessVal);
    guessField.value = "";
}


newGameBtn.onclick = function(){
    location.reload();
}

// function sum(args){
//     let total = 0;

//     for(let i = 0; i < arguments.length; i++){
//         total += arguments[i];
//     }

//     return total;
// }