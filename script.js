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



// Включаем блокировку выделения текста и контекстного меню
document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('touchstart', e => e.preventDefault());
});
// Удаляем e.preventDefault(), чтобы кнопка работала на мобильных устройствах
document.getElementById('cat-button').addEventListener('touchstart', function() {
    // Дополнительная логика, если нужно
});

// Если у тебя есть другие кнопки, тоже добавь touchstart для совместимости с мобильными устройствами
document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('touchstart', function() {
        // Дополнительная логика для меню
    });
});




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

// Изначальное обновление
updateCoinsDisplay();
updateStatsDisplay();

// Загрузка данных при загрузке страницы
window.addEventListener('load', loadGame);

// Сохранение данных при закрытии страницы
window.addEventListener('beforeunload', saveGame);
