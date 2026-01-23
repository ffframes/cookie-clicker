const cookieCountDisplay = document.querySelector('#cookie-count');
const cpsDisplay = document.querySelector('#cookiespersecond-display');
const cookieButton = document.querySelector('#cookie-button');
const resetButton = document.querySelector('#reset-button');
const upgradeContainer = document.querySelector('#upgrade-container');

let cookies = Number(localStorage.getItem('cookies')) || 0;
let cookiesPerSecond = Number(localStorage.getItem('cookiesPerSecond')) || 0;

const updateDisplay = () => {
    cookieCountDisplay.textContent = Math.floor(cookies);
    cpsDisplay.textContent = cookiesPerSecond;
    localStorage.setItem('cookies', cookies);
    localStorage.setItem('cookiesPerSecond', cookiesPerSecond);
};
cookieButton.addEventListener('click', () => {
    cookies = cookies + 10000;
    updateDisplay();
});
async function getUpgrades() {
    const response = await fetch('https://cookie-upgrade-api.vercel.app/api/upgrades');
    const upgrades = await response.json();

    upgrades.forEach((item) => {
        const button = document.createElement('button');
        button.classList.add('upgrade-button');
        
        button.innerHTML = `
            ${item.name} <br>
            Cost: ${item.cost} | Boost: +${item.increase}
        `;
        button.addEventListener('click', () => {
            if (cookies >= item.cost) {
                cookies = cookies - item.cost;
                cookiesPerSecond = cookiesPerSecond + item.increase;
                updateDisplay();
            } else {
                alert("You don't have enough cookies yet!");
            }
        });
        upgradeContainer.appendChild(button);
    });
}

resetButton.addEventListener('click', () => {
    localStorage.removeItem('cookies');
    localStorage.removeItem('cookiesPerSecond');
    cookies = 0;
    cookiesPerSecond = 0;
    updateDisplay();
});

setInterval(() => {
    if (cookiesPerSecond > 0) {
        cookier = cookies + cookiesPerSecond;
        updateDisplay();
    }
}, 1000);

updateDisplay();
getUpgrades();