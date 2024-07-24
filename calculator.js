// Global Variables
const MAX_LENGTH = 9;
let firstDigit = true;
let hasDecimal = false;
let screen = document.getElementById("result");

// Functions to display to the screen
function displayNumber(num) {
    // console.log("Number to display on screen: ", num);
    if (firstDigit) {
        screen.textContent = num;
        firstDigit = false;
    } else {
        if (screen.textContent.length !== MAX_LENGTH) {
        screen.textContent += num;
        }
    }
}

function displayDecimal() {
    const dec = ".";

    if (firstDigit && screen.textContent === "0") {
        screen.textContent += dec;
        firstDigit = false;
        hasDecimal = true;
    } else if (!firstDigit && !hasDecimal) {
        if (screen.textContent.length !== MAX_LENGTH) {
            screen.textContent += dec;
            hasDecimal = true;
        }
    } else {
        if (!hasDecimal) {
            screen.textContent = "0" + dec;
            firstDigit = false;
            hasDecimal = true;
        }
    }
}

// Calculator Events
window.addEventListener('DOMContentLoaded', () => {  
    // Add number to screen when clicked
    document.querySelectorAll('.digit').forEach(digit => {
        digit.addEventListener('click', () => {
            if (digit.id === "period") {
                displayDecimal();
            } else {
            displayNumber(digit.textContent);
            }
        });
    });
});