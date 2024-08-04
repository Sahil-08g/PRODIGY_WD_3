document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart');

    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let isGameActive = true;

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = () => {
        for (const [a, b, c] of WINNING_COMBINATIONS) {
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return gameState.includes(null) ? null : 'T';
    };

    const handleCellClick = (event) => {
        const cell = event.target;
        const index = cell.dataset.index;

        if (!isGameActive || gameState[index]) return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        const result = checkWin();

        if (result) {
            isGameActive = false;
            status.textContent = result === 'T' ? "It's a Tie!" : `Player ${result} Wins!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const restartGame = () => {
        gameState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        isGameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
    };

    board.addEventListener('click', handleCellClick);
    restartButton.addEventListener('click', restartGame);
});
