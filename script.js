let balance = 1000000; // Изначальный баланс
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
    } else {
        alert('Not enough coins!');
    }
}

// Автоматическое добавление монет каждую секунду
setInterval(function() {
    balance += coinsPerSec;
    updateCoinsDisplay();
}, 1000);

// Переключение между страницами
function showMain() {
    document.getElementById('main-page').classList.remove('hidden');
    document.getElementById('shop-page').classList.add('hidden');
    document.getElementById('help-page').classList.add('hidden');
}

function showShop() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('shop-page').classList.remove('hidden');
    document.getElementById('help-page').classList.add('hidden');
}

function showHelp() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('shop-page').classList.add('hidden');
    document.getElementById('help-page').classList.remove('hidden');
}

// Изначальное обновление
updateCoinsDisplay();
updateStatsDisplay();
