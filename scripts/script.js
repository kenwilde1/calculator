// Declare all constant variables e.g grab all HTML elements with data attributes.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Declare variables used to create if statements later on 
let previousOperand = '';
let currentOperand = '';
let prevOperation = undefined;
let operation = undefined;
let hasBeenCalculated = false;

// Create functions that we will call to do our math
function add(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function calculate(operation, a, b) {

  switch(operation) {
    case '*':
      previousOperandTextElement.innerHTML = multiply(a, b);
      currentOperandTextElement.innerHTML = '';
      break;
    case '/':
      previousOperandTextElement.innerHTML = divide(a, b);
      currentOperandTextElement.innerHTML = '';
      break;
    case '+':
      previousOperandTextElement.innerHTML = add(a, b);
      currentOperandTextElement.innerHTML = '';
      break;
    case '-':
      previousOperandTextElement.innerHTML = subtract(a, b);
      currentOperandTextElement.innerHTML = '';
      break;
  }
  hasBeenCalculated = true;
}

// Clear the current operation field 
function clearCurrent() {
  currentOperand = '';
  currentOperandTextElement.innerHTML = currentOperand;
}

// Clear the previous operation field 
function clearPrevious() {
  previousOperand = '';
  previousOperandTextElement.innerHTML = previousOperand;
}

// For every number button on the page, add a click event function that will: 
// 1. Ensure character limit of 12 so number doesn't get too big for calculator screen
// 2. If there is no operation on the screen, the current operation field is blank and there has already been a calculation made, then clear both screens i.e user is ready to make a new calculation. 
// 3. Display the current button pressed to the current operation field 
numberButtons.forEach(button => button.addEventListener('click', (e) => {

  if (currentOperandTextElement.innerHTML.length > 12) {
    alert("Exceed character limit");
    return;
  }

  if (previousOperandTextElement.innerHTML.slice(-1) != operation && previousOperandTextElement.innerHTML != '' && currentOperandTextElement.innerHTML == '' && hasBeenCalculated) {
    clearPrevious();
    clearCurrent();
  }

  currentOperand += button.innerHTML;
  currentOperandTextElement.innerHTML = currentOperand;
  
}));

// For every operation button on the page, add a click function event that will:
// 1. Make sure user does not press an operation button twice if the last character of previous field is an operation character i.e +, -, * or /.
// 2. Record previous operation and current operation 
// 3. If the operation pressed is not the last character in the previous operation field, its not blank, current operation field is empty and there has already been a calculation, then just append the operation to the previous operation field. 
// 4. After an operation is pressed and both previous and current field operation are not empty, then calculate them before asking for the next operation. 
operationButtons.forEach(button => button.addEventListener('click', (e) => {

  let getLastElement = previousOperandTextElement.innerHTML.slice(-1);

  if ( isNaN(getLastElement) && currentOperandTextElement.innerHTML == '') {
    alert("Invalid, operation already chosen, please select a number.")
    return;
  }

  prevOperation = operation;
  operation = button.innerHTML;

  if (previousOperandTextElement.innerHTML.slice(previousOperandTextElement.innerHTML.indexOf(operation)) != prevOperation && previousOperandTextElement.innerHTML != '' && currentOperandTextElement.innerHTML == '' && hasBeenCalculated) {

    previousOperandTextElement.innerHTML += operation;

  }

  if ( previousOperandTextElement.innerHTML.slice(previousOperandTextElement.innerHTML.indexOf(operation)) == prevOperation && currentOperandTextElement.innerHTML != '') {

    parsePrev = parseFloat(previousOperandTextElement.innerHTML.slice(0, previousOperandTextElement.innerHTML.indexOf(operation)));
    parseCurr = parseFloat(currentOperandTextElement.innerHTML)
    calculate(prevOperation, parsePrev, parseCurr);
    previousOperandTextElement.innerHTML += operation;
    hasBeenCalculated = true;

  }

  if (previousOperand == '') {

    previousOperand = currentOperand;
    previousOperandTextElement.innerHTML += previousOperand + operation;
    clearCurrent();
  }

  if (previousOperandTextElement.innerHTML.slice(previousOperandTextElement.innerHTML.indexOf(operation)) != prevOperation && previousOperandTextElement.innerHTML != '' && currentOperandTextElement.innerHTML != '') {

    parsePrev = parseFloat(previousOperandTextElement.innerHTML.slice(0, previousOperandTextElement.innerHTML.indexOf(operation)));
    parseCurr = parseFloat(currentOperandTextElement.innerHTML)
    calculate(operation, parsePrev,parseCurr);
    hasBeenCalculated = true;

  }
  
  clearCurrent();

}));

// Add an event listener to the equals button. If its pressed then turn the strings in previous and current fields to floats, then calculate them. 
equalButton.addEventListener('click', (e) => {

  parsePrev = parseFloat(previousOperandTextElement.innerHTML);
  parseCurr = parseFloat(currentOperandTextElement.innerHTML);

  if (previousOperandTextElement.innerHTML !== '' && currentOperandTextElement.innerHTML !== '' && operation !== undefined) {
    calculate(operation, parsePrev, parseCurr);
  }

  if (previousOperandTextElement.innerHTML !== '' && currentOperandTextElement.innerHTML !== '' && operation !== undefined) {
    calculate(operation, parsePrev, parseCurr);
  }
});

// If User presses CE button, then clear both fields. 
clearButton.addEventListener('click', (e) => {

  clearCurrent();
  clearPrevious();
  
});