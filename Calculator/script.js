const buttons = document.querySelectorAll('.button');
const previousOperandTextElement = document.querySelector('#previous-operand');
const currentOperandTextElement = document.querySelector('#current-operand');

let previousOperand = '';
let currentOperand = '';
let operation = undefined;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.innerText;
    if (buttonValue === 'AC') {
      clear();
      updateDisplay();
      return;
    }
    if (buttonValue === 'DEL') {
      deleteNumber();
      updateDisplay();
      return;
    }
    if (buttonValue === '+' ||
        buttonValue === '-' ||
        buttonValue === '*' ||
        buttonValue === '÷') {
      handleOperation(buttonValue);
      updateDisplay();
      return;
    }
    if (buttonValue === '=') {
      performOperation();
      updateDisplay();
      return;
    }
    inputNumber(buttonValue);
    updateDisplay();
  });
});

const clear = () => {
  previousOperand = '';
  currentOperand = '';
  operation = undefined;
};

const deleteNumber = () => {
  currentOperand = currentOperand.toString().slice(0, -1);
};

const handleOperation = buttonValue => {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    performOperation();
  }
  operation = buttonValue;
  previousOperand = currentOperand;
  currentOperand = '';
};

const performOperation = () => {
  let result;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous) || isNaN(current)) return;
  switch (operation) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '÷':
      result = previous / current;
      break;
    default:
      return;
  }
  currentOperand = result;
  operation = undefined;
  previousOperand = '';
};

const inputNumber = number => {
  currentOperand = currentOperand.toString() + number.toString();
};

const updateDisplay = () => {
  currentOperandTextElement.innerText = currentOperand;
  if (operation != null) {
    previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousOperandTextElement.innerText = '';
  }
};
