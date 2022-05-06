const Game = (() => {

    const createPlayer = (name, score, boxes) => {
            return { name, score, boxes };
    };
    const human = createPlayer("You", 0, []);
    const computer = createPlayer("Computer", 0, []);
    
    
    const gameboard = (() => {
        // Draw the board's 9 cells and listens for player click
        // Each cell has a `box${i}` class
        const drawBoard = () => {
        }
        
        // Deletes all 9 cells and resets current player choices
        // Calls drawBoard()
        const resetBoard = () => {
            
            drawBoard()
        }
        
        // resets score variables to 0, displays score = 0
        // Calls resetBoard()
        const restart = () => {
            resetBoard()
        }
    })();

    const actions = ((box) => {
        // Checks if winning conditions fulfilled
        // If true, displays win popup and determines winner
        // If false, calls checkDraw()
        const checkWin = (who, tickedBoxes) => {
            checkDraw()
        }
        
        // Checks if any cell still available
        // If false, disaplys draw popup
        const checkDraw = () => {
        }

        // Assign 'cross' class to clicked cell
        // Calls checkWin()
        const playerAction = (box) => {
            checkWin()
        }
        
        // Assign 'nought' class to random cell
        // Calls checkWin()
        const computerAction = () => {   
            checkWin()
        }
    })()

    gameboard.resetBoard();

    // Event listeners for buttons: 
    // 'Clear board (reset)' and 'Restart' in header
    // 'Ok' and 'Play again' in win/draw popup

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