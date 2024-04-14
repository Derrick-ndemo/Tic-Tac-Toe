// Initialize game variables
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']; // Represents 3x3 grid

// Function to handle player moves
function handleMove(cellIndex) {
    if (board[cellIndex] === '') { // Check if cell is empty
        board[cellIndex] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            showMessage(currentPlayer + " wins!");
            disableBoard();
        } else if (checkDraw()) {
            showMessage("It's a draw!");
            disableBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check for a winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Function to check for a draw
function checkDraw() {
    return board.every(cell => cell !== '');
}

// Function to render the board
function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Function to show message
function showMessage(message) {
    document.getElementById('message').textContent = message;
}

// Function to disable the board
function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', cellClickHandler);
    });
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    showMessage('');
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    });
}

// Event listener for when a cell is clicked
function cellClickHandler() {
    const cellIndex = this.dataset.index;
    handleMove(cellIndex);
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', cellClickHandler);
});

document.getElementById('reset-btn').addEventListener('click', resetGame);

// Initialize the game
renderBoard();