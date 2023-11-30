const puzzleContainer = document.getElementById('puzzle-container');
const gridSize = 4;
let tiles = [];
const imageSize = 400;


function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function createTiles() {
    tiles = [];
    for (let i = 0; i < gridSize * gridSize - 1; i++) {
        tiles.push(i + 1);
    }
    tiles.push(null);
    shuffleTiles();
}

function renderTiles() {
    puzzleContainer.innerHTML = '';
    tiles.forEach((number, index) => {
        const tile = document.createElement('div');
        tile.id = `tile-${index}`;
        tile.className = 'tile';
        tile.style.width = imageSize / gridSize + 'px';
        tile.style.height = imageSize / gridSize + 'px';

        if (number !== null) {
            tile.addEventListener('click', () => moveTile(index));
        }

        puzzleContainer.appendChild(tile);
    });

    // Set default background image when rendering initially
    setDefaultBackgroundImage();
}

function setDefaultBackgroundImage() {
    const selectedImage = document.getElementById('imageSelector').value;

    tiles.forEach((number, index) => {
        const tile = document.getElementById(`tile-${index}`);
        if (tile && number !== null) {
            tile.style.backgroundImage = `url('${selectedImage}')`;
            tile.style.backgroundSize = `${imageSize}px ${imageSize}px`;
            tile.style.backgroundPositionX = `${-(number % gridSize) * (imageSize / gridSize)}px`;
            tile.style.backgroundPositionY = `${-Math.floor(number / gridSize) * (imageSize / gridSize)}px`;
        }
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - gridSize, emptyIndex + gridSize];
    if (validMoves.includes(index)) {
        const tile = document.getElementById(`tile-${index}`);
        const emptyTile = document.getElementById(`tile-${emptyIndex}`);

        // Add animation class to the tiles
        tile.classList.add('animated-tile');
        emptyTile.classList.add('animated-tile');

        // Swap the tiles
        [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];

        // After the animation ends, remove the animation class
        setTimeout(() => {
            tile.classList.remove('animated-tile');
            emptyTile.classList.remove('animated-tile');
            renderTiles();
            checkWin();
        }, 200); // Use the same duration as the CSS transition
    }
}

function checkWin() {
    if (tiles.every((tile, i) => tile === i + 1 || tile === null)) {
        // Redirect to another webpage
        window.location.href = 'congrats.html';
    }
}

function cheat() {
    const solvedState = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1);
    solvedState.push(null);
    tiles = solvedState.slice(); 
    renderTiles();
}

function changePuzzleImage() {
    const select = document.getElementById('imageSelector');
    const selectedImage = select.value;
	

    tiles.forEach((number, index) => {
        const tile = document.getElementById(`tile-${index}`);
        if (tile && number !== null) {
            tile.style.backgroundImage = `url('${selectedImage}')`;
            tile.style.backgroundSize = `${imageSize}px ${imageSize}px`;
            tile.style.backgroundPositionX = `${-(number % gridSize) * (imageSize / gridSize)}px`;
            tile.style.backgroundPositionY = `${-Math.floor(number / gridSize) * (imageSize / gridSize)}px`;
        }
    });
	
}

createTiles();
renderTiles();