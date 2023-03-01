let currentNumber = '';
let numbers = [];
let operators = [];
let result = null;

function addNumber(number) {
  currentNumber += number;
  updateDisplay();
}

function addOperator(operator) {
  if (result === null) {
    numbers.push(parseFloat(currentNumber));
  } else {
    numbers.push(result);
    result = null;
  }
  operators.push(operator);
  currentNumber = '';
  updateDisplay();
}

function calculate() {
  numbers.push(parseFloat(currentNumber));
  result = null;

  // Traiter la multiplication et la division
  for (let i = 0; i < operators.length; i++) {
    let operator = operators[i];
    let number = numbers[i + 1];
    if (operator === '*' || operator === '/') {
      let previousNumber = numbers[i];
      let res = operator === '*' ? previousNumber * number : previousNumber / number;
      numbers.splice(i, 2, res);
      operators.splice(i, 1);
      i--;
    }
  }

  // Traiter l'addition et la soustraction
  result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    let operator = operators[i];
    let number = numbers[i + 1];
    if (operator === '+') {
      result += number;
    } else if (operator === '-') {
      result -= number;
    }
  }

  currentNumber = '';
  updateDisplay();
  numbers = [];
  operators = [];
}

function updateDisplay() {
  let displayString = '';
  for (let i = 0; i < numbers.length; i++) {
    displayString += numbers[i];
    if (i < operators.length) {
      displayString += operators[i];
    }
  }
  if (result !== null) {
    displayString = result;
  } else {
    displayString += currentNumber;
  }
  document.getElementById('result').value = displayString;
}

function clearResult() {
  currentNumber = '';
  numbers = [];
  operators = [];
  result = null;
  document.getElementById('result').value = '';
}
