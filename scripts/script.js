const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

let previousOperand = '';
let currentOperand = '';
let prevOperation = undefined;
let operation = undefined;
let hasBeenCalculated = false;

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
      console.log("multiply");
      previousOperandTextElement.innerHTML = multiply(a, b);
      currentOperandTextElement.innerHTML = '';
      hasBeenCalculated = true;
      break;
    case '/':
      console.log("divide");
      console.log(a, b);
      previousOperandTextElement.innerHTML = divide(a, b);
      currentOperandTextElement.innerHTML = '';
      hasBeenCalculated = true;
      break;
    case '+':
      console.log("add");
      previousOperandTextElement.innerHTML = add(a, b);
      currentOperandTextElement.innerHTML = '';
      hasBeenCalculated = true;
      break;
    case '-':
      console.log("subtract");
      previousOperandTextElement.innerHTML = subtract(a, b);
      currentOperandTextElement.innerHTML = '';
      hasBeenCalculated = true;
      break;
  }

}

function clearCurrent() {
  currentOperand = '';
  currentOperandTextElement.innerHTML = currentOperand;
}

function clearPrevious() {
  previousOperand = '';
  previousOperandTextElement.innerHTML = previousOperand;
}

numberButtons.forEach(button => button.addEventListener('click', (e) => {

  console.log(operation, prevOperation);

  if (previousOperandTextElement.innerHTML.slice(-1) != operation && previousOperandTextElement.innerHTML != '' && currentOperandTextElement.innerHTML == '' && hasBeenCalculated) {
    console.log("yes");
    clearPrevious();
    clearCurrent();
  }

  currentOperand += button.innerHTML;
  currentOperandTextElement.innerHTML = currentOperand;
  
}));

operationButtons.forEach(button => button.addEventListener('click', (e) => {

  if ( previousOperandTextElement.innerHTML.slice(previousOperandTextElement.innerHTML.indexOf(operation)) == prevOperation || previousOperandTextElement.innerHTML.slice(previousOperandTextElement.innerHTML.indexOf(operation)) == operation && currentOperandTextElement.innerHTML == '') {
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
    console.log(operation, parsePrev, parseCurr);
    calculate(operation, parsePrev,parseCurr);
    hasBeenCalculated = true;
  }
  
  clearCurrent();

}));

equalButton.addEventListener('click', (e) => {

  parsePrev = parseFloat(previousOperandTextElement.innerHTML);
  parseCurr = parseFloat(currentOperandTextElement.innerHTML);

  if (previousOperandTextElement.innerHTML !== '' && currentOperandTextElement.innerHTML !== '' && operation !== undefined) {

    let result = calculate(operation, parsePrev, parseCurr);
    console.log(result);
  }

  if (previousOperandTextElement.innerHTML !== '' && currentOperandTextElement.innerHTML !== '' && operation !== undefined) {

    let result = calculate(operation, parsePrev, parseCurr);
    console.log(result);
  }
  
});

clearButton.addEventListener('click', (e) => {
  clearCurrent();
  clearPrevious();
});