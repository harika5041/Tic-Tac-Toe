const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes('') ? null : 'T';
};

const handleClick = (event) => {
    if (!gameActive) return;
    
    const cellIndex = event.target.dataset.index;
    if (boardState[cellIndex]) return;

    boardState[cellIndex] = currentPlayer;
    event.target.classList.add(currentPlayer);
    event.target.textContent = currentPlayer; 
    
    const winner = checkWinner();
    if (winner) {
        if (winner === 'T') {
            message.textContent = "It's a Draw !!";
        } else {
            message.textContent = `Player ${winner} Wins !! `;
        }
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.textContent = ''; 
    });
};

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
