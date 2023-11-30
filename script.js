const puzzleContainer = document.getElementById('puzzle-container');
const gridSize = 4;
let tiles = [];
const imageSize = 400;

function createTiles() {
    tiles = [];
    for (let i = 0; i < gridSize * gridSize - 1; i++) {
        tiles.push(i + 1);
    }
    tiles.push(null);
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
        tile.style.width = imageSize / gridSize + 'px';
        tile.style.height = imageSize / gridSize + 'px';

        if (number !== null) {
            tile.style.backgroundImage = `url('macaw.jpg')`;
            tile.style.backgroundSize = `${imageSize}px ${imageSize}px`;

            const correctX = (number - 1) % gridSize;
            const correctY = Math.floor((number - 1) / gridSize);
            tile.style.backgroundPositionX = `${-correctX * (imageSize / gridSize)}px`;
            tile.style.backgroundPositionY = `${-correctY * (imageSize / gridSize)}px`;

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

function addCheatButton() {
    const cheatButton = document.createElement('button');
    cheatButton.textContent = 'Cheat';
    cheatButton.addEventListener('click', () => cheat());
    puzzleContainer.appendChild(cheatButton);
}

function cheat() {
    const solvedState = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1);
    solvedState.push(null);
    tiles = solvedState.slice(); 
    renderTiles();
}

createTiles();
renderTiles();
addCheatButton();
