let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const squares = document.querySelectorAll('.square');
const message = document.querySelector('.message');

squares.forEach(square => {
    square.addEventListener('click', () => {
        const squareIndex = square.dataset.index;

        if (board[squareIndex] !== '') {
            return;
        }

        board[squareIndex] = currentPlayer;
        square.classList.add(currentPlayer.toLowerCase());
        square.textContent = currentPlayer;

        const winner = checkForWinner();

        if (winner) {
            message.textContent = `${winner} wins!`;
            squares.forEach(square => {
                square.style.pointerEvents = 'none';
            });
        } else if (checkForDraw()) {
            message.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `It's ${currentPlayer}'s turn`;
        }
    });
});

function checkForWinner() {
    for (let i = 0; i < 9; i += 3) {
        if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
            return board[i];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
            return board[i];
        }
    }

    if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
        return board[0];
    }

    if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
        return board[2];
    }

    return null;
}

function checkForDraw() {
    return board.every(square => square !== '');
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    squares.forEach(square => {
        square.classList.remove('x', 'o');
        square.textContent = '';
        square.style.pointerEvents = 'auto';
    });
    message.textContent = 'It\'s X\'s turn';
}

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetGame);
