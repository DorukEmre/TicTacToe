const Game = (() => {
    let availableBoxes = [];
    let waitingForReset = 0;

    const createPlayer = (name, score, boxes) => {
        return { name, score, boxes };
    };
    const human = createPlayer("You", 0, []);
    const computer = createPlayer("Computer", 0, []);

    const gameboard = (() => {

        const drawBoard = () => {
            const board = document.querySelector(".board");
            
            for (let i = 1; i <= 9; i++) {
                const box = document.createElement("section");
                box.className = `box${i}`;
                board.appendChild(box);
                availableBoxes.push(`box${i}`) 
                box.addEventListener("click", () => {actions.playerAction(box)})
            };               
        };

        const resetBoard = () => {
            const boxes = document.querySelectorAll("[class^=box]");
            boxes.forEach((item) => item.remove())
    
            const win = document.querySelector(".win")
            if (win.classList.contains("popup")) {
                win.classList.remove("popup")
                const restart = document.querySelector(".restart")
                restart.classList.remove("popup")

            }
    
            human.boxes = [];
            computer.boxes = [];
            availableBoxes = [];
            waitingForReset = 0;
            
            drawBoard()    
        }

        const restart = () => {
            const restart = document.querySelector(".restart")
            if (restart.classList.contains("popup")) { return }

            human.score = 0;
            computer.score = 0;
            const pPlayerScore = document.querySelector(".playerScore");
            pPlayerScore.textContent = human.score;
            const pComputerScore = document.querySelector(".computerScore");
            pComputerScore.textContent = computer.score;
            gameboard.resetBoard();
        }

        return { resetBoard, restart } 
    })();

    
    const actions = ((box) => {
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
    
                const win = document.querySelector(".win")
                win.classList.add("popup")
                const restart = document.querySelector(".restart")
                restart.classList.add("popup")
    
                const winMessage = document.querySelector(".winMessage")
                
                if (who === "You") { 
                    human.score++;
                    const pPlayerScore = document.querySelector(".playerScore");
                    pPlayerScore.textContent = human.score;
                    winMessage.textContent = `${who} win this round!`
                    win.style.borderColor = "#B176AC"
    
                } else {
                    computer.score++;
                    const pComputerScore = document.querySelector(".computerScore");
                    pComputerScore.textContent = computer.score;
                    winMessage.textContent = `${who} wins this round!`
                    win.style.borderColor = "#75B09A"
                }
    
                waitingForReset = 1;
                return
            }   
            checkDraw();
        };

        const checkDraw = () => {
            if (waitingForReset === 0 && availableBoxes.length === 0) { 
                waitingForReset = 1;

                const win = document.querySelector(".win")
                win.classList.add("popup")
                const restart = document.querySelector(".restart")
                restart.classList.add("popup")
    
                const winMessage = document.querySelector(".winMessage")
                winMessage.textContent = `It's a draw!`
                win.style.borderColor = "#fff"                
            }
        };

        const playerAction = (box) => {
            console.log(`You clicked ${box.className}`);
            if (waitingForReset === 1) { return }
            if (availableBoxes.includes(box.className) === false) { return }
            
            const cross = document.createElement("section");
            cross.className = "cross";
            box.appendChild(cross);
            
            human.boxes.push(box.className);

            clickedBoxIndex = availableBoxes.indexOf(box.className);
            availableBoxes.splice(clickedBoxIndex, 1);

            checkWin("You", human.boxes)
            if (waitingForReset === 0) { computerAction() }
        };
            
        const computerAction = () => {        
            let computerBoxPick = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
            console.log(`Computer picked ${computerBoxPick}`)

            computer.boxes.push(computerBoxPick)  
            
            const computerBox = document.querySelector(`.${computerBoxPick}`)
            const nought = document.createElement("section");
            nought.className = "nought";
            computerBox.appendChild(nought);

            computerBoxPickIndex = availableBoxes.indexOf(computerBoxPick);
            availableBoxes.splice(computerBoxPickIndex, 1);

            checkWin("Computer", computer.boxes);
        };

        return { playerAction }
    })();

    gameboard.resetBoard();

    const resetButton = document.querySelector(".reset")
    resetButton.addEventListener("click", gameboard.resetBoard)

    const restartButton = document.querySelector(".restart")
    restartButton.addEventListener("click", gameboard.restart)

    const playAgainButton = document.querySelector(".playAgain")
    playAgainButton.addEventListener("click", gameboard.resetBoard)

    const okButton = document.querySelector(".ok")
    okButton.addEventListener("click", e => {
        const win = document.querySelector(".win")
        win.classList.remove("popup")
        const restart = document.querySelector(".restart")
        restart.classList.remove("popup")
    })
})();
