// fifteen.js

document.addEventListener('DOMContentLoaded', function () {
    const puzzleContainer = document.getElementById('puzzle-container');
    const size = 4; // 4x4 puzzle
    const tileSize = 100; // Each tile is 100px x 100px

    // Initialize the puzzle
    function initializePuzzle() {
        for (let i = 0; i < size * size; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.innerText = i + 1;
            tile.style.width = tileSize + 'px';
            tile.style.height = tileSize + 'px';
            puzzleContainer.appendChild(tile);

            tile.addEventListener('click', function () {
                handleTileClick(tile);
            });
        }
        shufflePuzzle();
    }

    // Shuffle the puzzle tiles
    function shufflePuzzle() {
        const tiles = Array.from(puzzleContainer.children);
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
        tiles.forEach((tile, index) => {
            tile.innerText = index + 1;
        });
    }

    // Handle tile click
    function handleTileClick(tile) {
        const tileIndex = Array.from(puzzleContainer.children).indexOf(tile);
        const emptyIndex = Array.from(puzzleContainer.children).indexOf(getEmptyTile());

        if (isAdjacent(tileIndex, emptyIndex)) {
            swapTiles(tileIndex, emptyIndex);
            if (isSolved()) {
                alert('Congratulations! You solved the puzzle!');
                shufflePuzzle();
            }
        }
    }

    // Check if two tiles are adjacent
    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / size);
        const col1 = index1 % size;
        const row2 = Math.floor(index2 / size);
        const col2 = index2 % size;

        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    }

    // Swap two tiles
    function swapTiles(index1, index2) {
        const tiles = Array.from(puzzleContainer.children);
        [tiles[index1].innerText, tiles[index2].innerText] = [tiles[index2].innerText, tiles[index1].innerText];
    }

    // Get the empty tile
    function getEmptyTile() {
        const tiles = Array.from(puzzleContainer.children);
        return tiles.find(tile => tile.innerText === '');
    }

    // Check if the puzzle is solved
    function isSolved() {
        const tiles = Array.from(puzzleContainer.children);
        return tiles.every((tile, index) => tile.innerText === (index + 1).toString());
    }

    // Initialize the puzzle when the DOM is loaded
    initializePuzzle();
});