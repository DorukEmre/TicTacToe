const Gameboard = (() => {
    let availableBoxes = [];
    let playerBoxes = [];
    let computerBoxes = [];
    let waitingForReset = 0;
    let playerScore = 0;
    let computerScore = 0;

    const drawBoard = (() => {
        const board = document.querySelector(".board");
        
        for (let i = 1; i <= 9; i++) {
            const box = document.createElement("section");
            box.className = `box${i}`;
            board.appendChild(box);
            availableBoxes.push(`box${i}`)   
        };
        
        console.log(availableBoxes)     
    })();

    const boxes = document.querySelectorAll("[class^=box]");
    boxes.forEach((box) => {
        box.addEventListener("click", function(e) {
            console.log(`You clicked ${box.className}`);
            if (waitingForReset === 1) { return }
            if (availableBoxes.includes(box.className) === false) { return }
            
            const cross = document.createElement("section");
            cross.className = "cross";
            box.appendChild(cross);
            
            playerBoxes.push(box.className);

            clickedBoxIndex = availableBoxes.indexOf(box.className);
            availableBoxes.splice(clickedBoxIndex, 1);

            checkWin("You", playerBoxes)
            if (waitingForReset === 0) { computerPlay() }
        })
    });
    const computerPlay = () => {        
        let computerBoxPick = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        console.log(`Computer picked ${computerBoxPick}`)

        computerBoxes.push(computerBoxPick)  
        
        const computerBox = document.querySelector(`.${computerBoxPick}`)
        console.log(computerBox)
        const nought = document.createElement("section");
        nought.className = "nought";
        computerBox.appendChild(nought);

        computerBoxPickIndex = availableBoxes.indexOf(computerBoxPick);
        availableBoxes.splice(computerBoxPickIndex, 1);

        checkWin("Computer", computerBoxes);
    }

    const checkWin = (who, tickedBoxes) => {
        console.log({tickedBoxes})
        if ((tickedBoxes.includes("box1") === true && // 1st line
            tickedBoxes.includes("box2") === true &&
            tickedBoxes.includes("box3") === true) || 
            (tickedBoxes.includes("box4") === true && // 2nd line
            tickedBoxes.includes("box5") === true &&
            tickedBoxes.includes("box6") === true) || 
            (tickedBoxes.includes("box7") === true && // 3rd line
            tickedBoxes.includes("box8") === true &&
            tickedBoxes.includes("box9") === true) || 
            (tickedBoxes.includes("box1") === true && // TL diagonal
            tickedBoxes.includes("box5") === true &&
            tickedBoxes.includes("box9") === true) || 
            (tickedBoxes.includes("box3") === true && // TR diagonal
            tickedBoxes.includes("box5") === true &&
            tickedBoxes.includes("box7") === true) ||
            (tickedBoxes.includes("box1") === true && // 1st column
            tickedBoxes.includes("box4") === true &&
            tickedBoxes.includes("box7") === true) || 
            (tickedBoxes.includes("box2") === true && // 2nd column
            tickedBoxes.includes("box5") === true &&
            tickedBoxes.includes("box8") === true) || 
            (tickedBoxes.includes("box3") === true && // 3rd column
            tickedBoxes.includes("box6") === true &&
            tickedBoxes.includes("box9") === true)) {

            if (who === "You") { 
                playerScore++;
                const pPlayerScore = document.querySelector(".playerScore");
                pPlayerScore.textContent = playerScore;

            } else {
                computerScore++;
                const pComputerScore = document.querySelector(".computerScore");
                pComputerScore.textContent = computerScore;
            }

            const win = document.querySelector(".win")
            win.classList.add("popup")

            const winMessage = document.querySelector(".winMessage")
            winMessage.textContent = `${who} won this round!`

            waitingForReset = 1;
            return
        }   
    }
    const clearBoard = () => {
        const boxesWithCross = document.querySelectorAll(".cross");
        boxesWithCross.forEach((item) => item.remove())

        const boxesWithNought = document.querySelectorAll(".nought");
        boxesWithNought.forEach((item) => item.remove())

        const win = document.querySelector(".win")

        if (win.classList.contains("popup")) {
            win.classList.remove("popup")
        }

        waitingForReset = 0;
        playerBoxes = [];
        computerBoxes = [];
        availableBoxes = []
        for (let i = 1; i <= 9; i++) {
            availableBoxes.push(`box${i}`)   
        };      
    }

    const resetButton = document.querySelector(".reset")
    resetButton.addEventListener("click", clearBoard)

    const playAgainButton = document.querySelector(".playAgain")
    playAgainButton.addEventListener("click", clearBoard)

    const okButton = document.querySelector(".ok")
    okButton.addEventListener("click", function(e) {
        const win = document.querySelector(".win")
        win.classList.remove("popup")
    })


})();
