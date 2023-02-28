const buttons = document.querySelectorAll('.button');
const previousOperandTextElement = document.querySelector('#previous-operand');
const currentOperandTextElement = document.querySelector('#current-operand');

let previousOperand = '';       // previousOperand - a let variable that stores the previous operand as a string.
let currentOperand = '';        // currentOperand - a let variable that stores the current operand as a string.
let operation = undefined;      // operation - a let variable that stores an operation (add, subtract, multiply, divide) as undefined by default

const clear = () => {           // clear() - a function to reset all variables to their default values.
  previousOperand = '';
  currentOperand = '';
  operation = undefined;
};

const deleteNumber = () => {     // deleteNumber() - a function to delete the last number in the current operand.
  currentOperand = currentOperand.toString().slice(0, -1);
};

const handleOperation = buttonValue => {      // handleOperation() - a function to set up an operation between two numbers.
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    performOperation();
  }
  operation = buttonValue;
  previousOperand = currentOperand;
  currentOperand = '';
};

const performOperation = () => {              // performOperation() - a function to perform an operation between two numbers.
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

const inputNumber = number => {           // inputNumber() -a function to add numbers to the current operand.
  currentOperand = currentOperand.toString() + number.toString();
};

const updateDisplay = () => {             // updateDisplay() -a function to update what is displayed on screen.
  currentOperandTextElement.innerText = currentOperand;
  previousOperandTextElement.innerText = `${previousOperand} ${operation || ''}`;
};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.innerText;
    buttonValue === 'AC' ? clear() : null;
    buttonValue === 'DEL' ? deleteNumber() : null;
    ['+', '-', '*', '÷'].includes(buttonValue) ? handleOperation(buttonValue) : null;
    buttonValue === '=' ? performOperation() : null;
    !isNaN(buttonValue) ? inputNumber(buttonValue) : null;
    updateDisplay();
  });
});
