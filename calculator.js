// Global Variables
const MAX_LENGTH = 9;
let firstDigit = true;
let hasDecimal = false;
let screen = document.getElementById("result");
let firstNum = 0;
let secondNum = 0;
let operator = "";

// Functions to display to the screen
function displayNumber(num) {
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

function getNum(num) {
    if (parseFloat(num) % 1 === 0) {
        return parseInt(num);
    } else {
        return parseFloat(num);
    }
}

// Functions to resolve edge cases
function parseDecimal(value) {
    // Keep decimal answer within defined max length
    const quotientLength = Math.trunc(value).toString().length;
    let solution = value.toFixed(MAX_LENGTH-quotientLength);
  
    // Remove trailing zeros
    let solText = solution.toString();
    let solLength = solText.length;
    if (solText[solLength-1] === "0") {
        while(solText[solLength-1] === "0") {
            solText.slice(0,-1); 
            solLength -= 1;
        }
    }
    
    return parseFloat(solText);
}

// Functions for calculator operations
function clearResult() {
    screen.textContent = "0";
    firstDigit = true;
    hasDecimal = false;
}

function getOperator(operatorId) {
    firstNum = getNum(screen.textContent);
    
    switch (operatorId) {
        case "add":
            operator = "+";
            break;
        case "subtract":
            operator = "-";
            break;
        case "multiply":
            operator = "*";
            break;
        case "divide":
            operator = "/";
            break;
    }
    
    firstDigit = true;
    hasDecimal = false;
}

function solve() {
    secondNum = getNum(screen.textContent);
    
    console.log("First num: ", firstNum);
    console.log("Operator: ", operator);
    console.log("Second num: ", secondNum);
    
    switch (operator) {
      case "+":
        solution = firstNum + secondNum;
        break;
      case "-":
        solution = firstNum - secondNum;
        break;
      case "*":
        solution = firstNum * secondNum;
        break;
      case "/":
        solution = firstNum / secondNum;
        break;
    }
    
    console.log("Solution: ", solution);

    // Handle decimal solutions
    if (solution % 1 !== 0) {
        solution = parseDecimal(solution);
    }

    screen.textContent = solution;

    // Reset the firstNum to the solution in case user clicks operator immediately
    firstNum = solution;
    firstDigit = true;
    hasDecimal = false;
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

    // Clear the screen
    document.getElementById('clear').addEventListener('click', () => {
        clearResult();
    });

    // Handle operator button clicks
    document.querySelectorAll('.operator').forEach(operator => {
        operator.addEventListener('click', () => {
            getOperator(operator.id);
        });
    });

    // Handle click for equals button
    document.getElementById('equals').addEventListener('click', () => {
        solve();
    });
});