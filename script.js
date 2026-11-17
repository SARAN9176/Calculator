// Basic Math Operations
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
  if (b === 0) return "Nice try! 😉"; // Divide by 0 error handling
  return a / b; 
}

// Variables for operation state
let firstNumber = null;
let currentOperator = null;
let secondNumber = null;
let resetScreen = false;

const display = document.getElementById('display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalsBtn = document.getElementById('equals');
const clearBtn = document.getElementById('clear');
const decimalBtn = document.getElementById('decimal');
const backspaceBtn = document.getElementById('backspace');

// Operate Function
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

function appendNumber(number) {
  if (display.textContent === '0' || resetScreen) {
    display.textContent = number;
    resetScreen = false;
  } else {
    display.textContent += number;
  }
}

function appendDecimal() {
  if (resetScreen) {
    display.textContent = '0.';
    resetScreen = false;
    return;
  }
  // Single decimal check
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function handleOperator(op) {
  if (currentOperator !== null && !resetScreen) {
    evaluate();
  }
  firstNumber = display.textContent;
  currentOperator = op;
  resetScreen = true;
}

function evaluate() {
  if (currentOperator === null || resetScreen) return;
  
  secondNumber = display.textContent;
  let result = operate(currentOperator, firstNumber, secondNumber);
  
  if (typeof result === 'number') {
    // Round long decimals to prevent display overflow
    result = Math.round(result * 100000) / 100000;
  }
  
  display.textContent = result;
  firstNumber = result;
  currentOperator = null;
  resetScreen = true;
}

function clear() {
  display.textContent = '0';
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  resetScreen = false;
}

function backspace() {
  if (resetScreen) return;
  if (display.textContent.length === 1 || display.textContent === 'Nice try! 😉') {
    display.textContent = '0';
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
}

// Event Listeners for UI
numberBtns.forEach(btn => btn.addEventListener('click', () => appendNumber(btn.textContent)));
operatorBtns.forEach(btn => btn.addEventListener('click', () => handleOperator(btn.dataset.op)));
equalsBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
decimalBtn.addEventListener('click', appendDecimal);
backspaceBtn.addEventListener('click', backspace);

// Keyboard Support (Extra Credit)
window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  if (e.key === '.') appendDecimal();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Escape') clear();
  if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key);
});