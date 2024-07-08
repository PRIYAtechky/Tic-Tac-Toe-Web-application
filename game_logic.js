let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let gameboard = document.getElementById('gameboard');
let friendBtn = document.getElementById('friendBtn');
let aiBtn = document.getElementById('aiBtn');
let modeSelection = document.getElementById('modeSelection');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let playWithAI = false;

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            endGame();
            return;
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        if (playWithAI && currentPlayer === O_TEXT) {
            aiMove();
        }
    }
}

const aiMove = () => {
    let availableSpaces = spaces.map((space, index) => space === null ? index : null).filter(val => val !== null);
    let randomMove = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];

    spaces[randomMove] = currentPlayer;
    boxes[randomMove].innerText = currentPlayer;

    if (playerHasWon() !== false) {
        playerText.innerHTML = `${currentPlayer} has won!`;
        let winning_blocks = playerHasWon();

        winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
        endGame();
        return;
    }

    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;

    gameboard.style.display = 'none';
    modeSelection.style.display = 'block';
    restartBtn.style.display = 'none';

    boxes.forEach(box => box.removeEventListener('click', boxClicked)); // Remove event listeners to reset
}

function endGame() {
    boxes.forEach(box => box.removeEventListener('click', boxClicked));
    restartBtn.style.display = 'block';
}

function startWithFriend() {
    playWithAI = false;
    modeSelection.style.display = 'none';
    gameboard.style.display = 'flex';
    restartBtn.style.display = 'block';
    startGame();
}

function startWithAI() {
    playWithAI = true;
    modeSelection.style.display = 'none';
    gameboard.style.display = 'flex';
    restartBtn.style.display = 'block';
    startGame();
}

friendBtn.addEventListener('click', startWithFriend);
aiBtn.addEventListener('click', startWithAI);
restartBtn.addEventListener('click', restart);
