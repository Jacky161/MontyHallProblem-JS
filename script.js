// Monty Hall Problem JS Code

// Variables to Store HTML Elements
let montyDialogueEl = document.getElementById("dialogue"); // Monty's Dialogue
let door1El = document.getElementById("door1"); // Door 1 Image
let door2El = document.getElementById("door2"); // Door 2 Image
let door3El = document.getElementById("door3"); // Door 3 Image
let nextDialogueBtnEl = document.getElementById("nextDialogue-btn"); // Button to advance
let yesSwitchBtnEl = document.getElementById("yesSwitch"); // Button to switch
let noSwitchBtnEl = document.getElementById("noSwitch"); // Button to stay
let gameAmtEl = document.getElementById("gameAmt"); // Amount of games played stat
let totalWinsOutEl = document.getElementById("winsAmt"); // Wins Stat
let totalLossOutEl = document.getElementById("lossAmt"); // Losses Stat
let totalWinSwitchOutEl = document.getElementById("winAmtWhenSwitched"); // Wins when Switched Stat
let totalLossSwitchOutEl = document.getElementById("lossAmtWhenSwitched"); // Losses when Switched Stat
let totalWinStayOutEl = document.getElementById("winAmtWhenStayed"); // Wins when Stayed Stat 
let totalLossStayOutEl = document.getElementById("lossAmtWhenStayed"); // Losses when Stayed Stat
let numOfGamesInEl = document.getElementById("numOfGames-in"); // Number of games to automatically simulate
let simBtn = document.getElementById("simulate-btn"); // Button to start simulating the game

// Global Variables
// Game Variables
let doorPicked = "None";
let doorThatHasCar = "None";
let doorToOpen = "None";
let winner = "None";
let dialoguePos = 0;
let canAdvance = false;
let canChooseDoor = true;
let switching = false;
// Stat Variables
let wins = 0;
let loss = 0;
let winsWhenSwitched = 0;
let lossWhenSwitched = 0;
let winsWhenStayed = 0;
let lossWhenStayed = 0;

// Event Listeners
door1El.addEventListener("click", door1Select);
door1El.addEventListener("click", gameInit);
door2El.addEventListener("click", door2Select);
door2El.addEventListener("click", gameInit);
door3El.addEventListener("click", door3Select);
door3El.addEventListener("click", gameInit);
nextDialogueBtnEl.addEventListener("click", playGame);
yesSwitchBtnEl.addEventListener("click", yesSwitching);
noSwitchBtnEl.addEventListener("click", notSwitching);
simBtn.addEventListener("click", playSpecified);

// Event Functions
function door1Select() {
    if (canChooseDoor === true) {
        // Update Active Border
        door1El.classList.add("active");
        door2El.classList.remove("active");
        door3El.classList.remove("active");

        // Update Door Selection Variables
        doorPicked = 1;
        canChooseDoor = false;
    }
}

function door2Select() {
    if (canChooseDoor === true) {
        // Update Active Border
        door2El.classList.add("active");
        door1El.classList.remove("active");
        door3El.classList.remove("active");

        // Update Door Selection Variables
        doorPicked = 2;
        canChooseDoor = false;
    }
}

function door3Select() {
    if (canChooseDoor === true) {
        // Update Active Border
        door3El.classList.add("active");
        door2El.classList.remove("active");
        door1El.classList.remove("active");

        // Update Door Selection Variables
        doorPicked = 3;
        canChooseDoor = false;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
    // The maximum is inclusive and the minimum is inclusive 
}

function gameInit() {
    // Initalize the game and pick the door with the car
    if (canAdvance === false) {
        // Pick door that has car
        doorForCar = getRandomIntInclusive(1, 3);
        if (doorForCar === 1) {
            doorThatHasCar = 1;
            //console.log("Door #" + 1 + " has the car");
        } else if (doorForCar === 3) {
            doorThatHasCar = 2;
            //console.log("Door #" + 2 + " has the car");
        } else {
            doorThatHasCar = 3;
            //console.log("Door #" + 3 + " has the car");
        }

        // Show next button
        nextDialogueBtnEl.style.display = "inline";
        canAdvance = true;
    }
}

function playGame() {
    if (canAdvance) {
        // Advance the dialogue position
        dialoguePos++;
        if (dialoguePos === 1) {
            montyDialogueEl.innerHTML = "So, you decided to pick door #" + doorPicked + " eh?";
        } else if (dialoguePos === 2) {
            montyDialogueEl.innerHTML = "So here's what I'm going to do. I'm going to open one of these doors.";
        } else if (dialoguePos === 3) {
            while (true) {
                // Select a door that does not equal the door that has the car and the door that was picked
                let randInt = getRandomIntInclusive(1, 3);
                if (!(randInt === doorPicked || randInt === doorThatHasCar)) {
                    doorToOpen = randInt;
                    break;
                }
            }
            montyDialogueEl.innerHTML = "I'm going to open door #" + doorToOpen;
        } else if (dialoguePos === 4) {
            if (doorToOpen === 1) {
                door1El.src = "img/Door with Goat.png";
            } else if (doorToOpen === 2) {
                door2El.src = "img/Door with Goat.png";
            } else {
                door3El.src = "img/Door with Goat.png";
            }
        } else if (dialoguePos === 5) {
            montyDialogueEl.innerHTML = "Seems like that was a goat!";
        } else if (dialoguePos === 6) {
            montyDialogueEl.innerHTML = "I'm going to give you a choice now. Do you want to switch your door to the other one left? Or do you want to stay with your current choice?";
            // Show the yes/no dialogue buttons and hide the next
            nextDialogueBtnEl.style.display = "none";
            yesSwitchBtnEl.style.display = "inline";
            noSwitchBtnEl.style.display = "inline";
        } else if (dialoguePos === 7) {
            // Show the next dialogue button and hide the yes/no
            nextDialogueBtnEl.style.display = "inline";
            yesSwitchBtnEl.style.display = "none";
            noSwitchBtnEl.style.display = "none";
            if (switching === true) {
                // Get door to open that is not the one that was already opened and not the one the user first picked
                while (true) {
                    let randInt = getRandomIntInclusive(1, 3);
                    if (randInt != doorPicked && randInt != doorToOpen) {
                        if (randInt === 1) {
                            canChooseDoor = true;
                            door1Select();
                        } else if (randInt === 2) {
                            canChooseDoor = true;
                            door2Select();
                        } else {
                            canChooseDoor = true;
                            door3Select();
                        }
                        break;
                    }
                }
                montyDialogueEl.innerHTML = "Alright! So you decided to switch to door #" + doorPicked + "!";
            } else {
                montyDialogueEl.innerHTML = "Alright! So you decided to stay with door #" + doorPicked + "!";
            }
        } else if (dialoguePos === 8) {
            montyDialogueEl.innerHTML = "Let's see what's behind door #" + doorPicked + "!";
        } else if (dialoguePos === 9) {
            // Open the door that the user selected
            if (doorPicked === doorThatHasCar) {
                winner = true;
                wins++;
                if (switching === true) {
                    winsWhenSwitched++;
                } else {
                    winsWhenStayed++;
                }
                if (doorPicked === 1) {
                    door1El.src = "img/Door with Car.png";
                } else if (doorPicked === 2) {
                    door2El.src = "img/Door with Car.png";
                } else {
                    door3El.src = "img/Door with Car.png";
                }
            } else {
                winner = false;
                loss++;
                if (switching === true) {
                    lossWhenSwitched++;
                } else {
                    lossWhenStayed++;
                }
                if (doorPicked === 1) {
                    door1El.src = "img/Door with Goat.png";
                } else if (doorPicked === 2) {
                    door2El.src = "img/Door with Goat.png";
                } else {
                    door3El.src = "img/Door with Goat.png";
                }
            }
        } else if (dialoguePos === 10) {
            if (winner === true) {
                montyDialogueEl.innerHTML = "CONGRATULATIONS! YOU WON!";
            } else {
                montyDialogueEl.innerHTML = "That's too bad. You lost.";
            }
        } else if (dialoguePos === 11) {
            // Prep all variables for new game
            // All variables are reset aside from stat variables
            nextDialogueBtnEl.style.display = "none";
            doorPicked = "None";
            doorThatHasCar = "None";
            doorToOpen = "None";
            winner = "None";
            dialoguePos = 0;
            canAdvance = false;
            canChooseDoor = true;
            switching = false;
            door1El.src = "img/Closed Door.png";
            door2El.src = "img/Closed Door.png";
            door3El.src = "img/Closed Door.png";
            door1El.classList.remove("active");
            door2El.classList.remove("active");
            door3El.classList.remove("active");
            // Output new stat variables to HTML
            gameAmtEl.innerHTML = wins + loss;
            totalWinsOutEl.innerHTML = wins;
            totalLossOutEl.innerHTML = loss;
            totalWinSwitchOutEl.innerHTML = winsWhenSwitched;
            totalLossSwitchOutEl.innerHTML = lossWhenSwitched;
            totalWinStayOutEl.innerHTML =  winsWhenStayed;
            totalLossStayOutEl.innerHTML = lossWhenStayed;
            // Tell the player to select a new door to play again
            montyDialogueEl.innerHTML = "Select a door to play again!";
        }
    }
}

function yesSwitching() {
    // Set variable and move on to next dialogue
    switching = true;
    playGame();
}

function notSwitching() {
    // Set variable and move on to next dialogue
    switching = false;
    playGame();
}

// This function will play one full game automatically
function playAutomatically() {
    // Whether the ai will switch or stay
    let aiSwitching = false;
    let aiDoorChoice;
    
    // Choose the ai door choice randomly
    // The following code can be commented out and manually specified above if desired
    aiDoorChoice = getRandomIntInclusive(1,3); // Get random door between 1 and 3
    //console.log("AI has picked door #" + aiDoorChoice);

    // Call correct function depending on door choice
    if (aiDoorChoice === 1) {
        door1Select();
    } else if (aiDoorChoice === 2) {
        door2Select();
    } else {
        door3Select();
    }
    // Initialize the game
    gameInit();

    // Proceed with dialogue
    for (let i = 1; i <= 6; i++) {
        playGame();
    }
    // After 6 dialogues, game will ask whether we want to switch
    // Make choice depending on variable
    if (aiSwitching) {
        yesSwitching();
    } else {
        notSwitching();
    }
    // Proceed with dialogue
    for (let i = 1; i <= 4; i++) {
        playGame();
    }
}

// Play for a user specified amount of games
function playSpecified() {
    // Get how many games the user wants to simulate
    let amtOfGames = +numOfGamesInEl.value;
    if (amtOfGames < 1) {
        amtofGames = 1;
        numOfGamesInEl.value = 1;
    }
    // Loop play game automatically function
    for (let i = 1; i <= amtOfGames; i++) {
        playAutomatically();
    }
}