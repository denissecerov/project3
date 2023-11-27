const puzzleContainer = document.getElementById('puzzle-container');
const gridSize = 4;
let tiles = [];

function createTiles() {
    tiles = [];
    for (let i = 0; i < gridSize * gridSize - 1; i++) {
        tiles.push(i + 1);
    }
    tiles.push(null); // For the empty space
    shuffleTiles();
}

function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function renderTiles() {
    puzzleContainer.innerHTML = '';
    tiles.forEach((number, index) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        if (number !== null) {
            tile.textContent = number;
            tile.addEventListener('click', () => moveTile(index));
        }
        puzzleContainer.appendChild(tile);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - gridSize, emptyIndex + gridSize];
    if (validMoves.includes(index)) {
        [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
        renderTiles();
        checkWin();
    }
}

function checkWin() {
    if (tiles.every((tile, i) => tile === i + 1 || tile === null)) {
        alert('Congratulations! You solved the puzzle.');
    }
}

createTiles();
renderTiles();
