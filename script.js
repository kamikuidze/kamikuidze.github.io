// Изначальные значения
let balance = 1000000;
let coinsPerTap = 1;
let coinsPerSec = 0;
let nesquikPrice = 150;
let beerPrice = 150;

// Получаем элементы
const coinsDisplay = document.getElementById('coins-display');
const coinsPerTapDisplay = document.getElementById('coins-per-tap');
const coinsPerSecDisplay = document.getElementById('coins-per-sec');
const nesquikPriceDisplay = document.getElementById('nesquik-price');
const beerPriceDisplay = document.getElementById('beer-price');
const catButton = document.getElementById('cat-button');

// Функция для загрузки данных из LocalStorage
function loadGame() {
    if (localStorage.getItem('balance')) {
        balance = parseInt(localStorage.getItem('balance'), 10);
        coinsPerTap = parseInt(localStorage.getItem('coinsPerTap'), 10);
        coinsPerSec = parseInt(localStorage.getItem('coinsPerSec'), 10);
        nesquikPrice = parseInt(localStorage.getItem('nesquikPrice'), 10);
        beerPrice = parseInt(localStorage.getItem('beerPrice'), 10);
    }
    updateCoinsDisplay();
    updateStatsDisplay();
}

// Функция для сохранения данных в LocalStorage
function saveGame() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('coinsPerTap', coinsPerTap);
    localStorage.setItem('coinsPerSec', coinsPerSec);
    localStorage.setItem('nesquikPrice', nesquikPrice);
    localStorage.setItem('beerPrice', beerPrice);
}

// Функция обновления баланса на экране
function updateCoinsDisplay() {
    coinsDisplay.textContent = balance;
}

// Обновление значений на экране
function updateStatsDisplay() {
    coinsPerTapDisplay.textContent = `+${coinsPerTap}`;
    coinsPerSecDisplay.textContent = `+${coinsPerSec}`;
    nesquikPriceDisplay.textContent = nesquikPrice;
    beerPriceDisplay.textContent = beerPrice;
}

// Функция для нажатия на кота
catButton.addEventListener('click', function() {
    balance += coinsPerTap;
    updateCoinsDisplay();
});

// Покупка Несквика
function buyNesquik() {
    if (balance >= nesquikPrice) {
        balance -= nesquikPrice;
        coinsPerTap += 1;
        nesquikPrice += 150;
        updateCoinsDisplay();
        updateStatsDisplay();
        saveGame(); // Сохраняем данные после покупки
    } else {
        alert('Not enough coins!');
    }
}

// Покупка Пива
function buyBeer() {
    if (balance >= beerPrice) {
        balance -= beerPrice;
        coinsPerSec = coinsPerSec === 0 ? 2 : coinsPerSec * 2;
        beerPrice += 150;
        updateCoinsDisplay();
        updateStatsDisplay();
        saveGame(); // Сохраняем данные после покупки
    } else {
        alert('Not enough coins!');
    }
}

// Автоматическое добавление монет каждую секунду
setInterval(function() {
    balance += coinsPerSec;
    updateCoinsDisplay();
    saveGame(); // Сохраняем данные каждую секунду
}, 1000);


// Переключение между страницами
function showMain() {
    document.getElementById('main-page').classList.remove('hidden');
    document.getElementById('shop-page').classList.add('hidden');
    document.getElementById('help-page').classList.add('hidden');
    document.getElementById('games-page').classList.add('hidden'); // скрыть страницу с играми
}

function showShop() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('shop-page').classList.remove('hidden');
    document.getElementById('help-page').classList.add('hidden');
    document.getElementById('games-page').classList.add('hidden'); // скрыть страницу с играми
}

function showHelp() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('shop-page').classList.add('hidden');
    document.getElementById('help-page').classList.remove('hidden');
    document.getElementById('games-page').classList.add('hidden'); // скрыть страницу с играми
}

function showGames() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('shop-page').classList.add('hidden');
    document.getElementById('help-page').classList.add('hidden');
    document.getElementById('games-page').classList.remove('hidden'); // показать страницу с играми
}

// Заглушки для начала игр
function start2048() {
    alert("2048 is under development!");
}


function startTicTacToe() {
    alert("Tic Tac Toe is under development!");
}

function startSnake() {
    alert("Snake is under development!");
}

// Переменные для игры 2048
let grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
let startX, startY, endX, endY;

// Начало игры 2048
function start2048() {
    document.getElementById('game-2048').classList.remove('hidden');
    reset2048();
}

// Сброс игры 2048
function reset2048() {
    grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    addNewTile();
    addNewTile();
    updateGrid();
}

// Добавление новой плитки
function addNewTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        let newTile = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[newTile.x][newTile.y] = Math.random() > 0.1 ? 2 : 4;
    }
}

// Обновление отображения сетки
function updateGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.textContent = grid[i][j] === 0 ? '' : grid[i][j];
            cell.style.backgroundColor = getTileColor(grid[i][j]);
        }
    }
}

// Цвет для каждой плитки
function getTileColor(value) {
    switch (value) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#edc850';
        case 1024: return '#edc53f';
        case 2048: return '#edc22e';
        default: return '#ccc0b3';
    }
}

// Добавление управления с помощью клавиш
window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
    addNewTile();
    updateGrid();
});

// Обработка сенсорных событий (свайпов)
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
}

function handleTouchEnd() {
    let deltaX = endX - startX;
    let deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Горизонтальное перемещение
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        // Вертикальное перемещение
        if (deltaY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    }
    addNewTile();
    updateGrid();
}

// Логика движения плиток
function moveUp() {
    for (let col = 0; col < 4; col++) {
        let merged = [false, false, false, false]; // Отслеживание слияний
        for (let row = 1; row < 4; row++) {
            if (grid[row][col] !== 0) {
                let newRow = row;
                while (newRow > 0 && grid[newRow - 1][col] === 0) {
                    grid[newRow - 1][col] = grid[newRow][col];
                    grid[newRow][col] = 0;
                    newRow--;
                }
                if (newRow > 0 && grid[newRow - 1][col] === grid[newRow][col] && !merged[newRow - 1]) {
                    grid[newRow - 1][col] *= 2;
                    grid[newRow][col] = 0;
                    merged[newRow - 1] = true;
                }
            }
        }
    }
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        let merged = [false, false, false, false];
        for (let row = 2; row >= 0; row--) {
            if (grid[row][col] !== 0) {
                let newRow = row;
                while (newRow < 3 && grid[newRow + 1][col] === 0) {
                    grid[newRow + 1][col] = grid[newRow][col];
                    grid[newRow][col] = 0;
                    newRow++;
                }
                if (newRow < 3 && grid[newRow + 1][col] === grid[newRow][col] && !merged[newRow + 1]) {
                    grid[newRow + 1][col] *= 2;
                    grid[newRow][col] = 0;
                    merged[newRow + 1] = true;
                }
            }
        }
    }
}

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let merged = [false, false, false, false];
        for (let col = 1; col < 4; col++) {
            if (grid[row][col] !== 0) {
                let newCol = col;
                while (newCol > 0 && grid[row][newCol - 1] === 0) {
                    grid[row][newCol - 1] = grid[row][newCol];
                    grid[row][newCol] = 0;
                    newCol--;
                }
                if (newCol > 0 && grid[row][newCol - 1] === grid[row][newCol] && !merged[newCol - 1]) {
                    grid[row][newCol - 1] *= 2;
                    grid[row][newCol] = 0;
                    merged[newCol - 1] = true;
                }
            }
        }
    }
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        let merged = [false, false, false, false];
        for (let col = 2; col >= 0; col--) {
            if (grid[row][col] !== 0) {
                let newCol = col;
                while (newCol < 3 && grid[row][newCol + 1] === 0) {
                    grid[row][newCol + 1] = grid[row][newCol];
                    grid[row][newCol] = 0;
                    newCol++;
                }
                if (newCol < 3 && grid[row][newCol + 1] === grid[row][newCol] && !merged[newCol + 1]) {
                    grid[row][newCol + 1] *= 2;
                    grid[row][newCol] = 0;
                    merged[newCol + 1] = true;
                }
            }
        }
    }
}


// Изначальное обновление
updateCoinsDisplay();
updateStatsDisplay();

// Загрузка данных при загрузке страницы
window.addEventListener('load', loadGame);

// Сохранение данных при закрытии страницы
window.addEventListener('beforeunload', saveGame);

