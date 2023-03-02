const buttons = document.querySelectorAll('.button');
const previousOperandTextElement = document.querySelector('#previous-operand');
const currentOperandTextElement = document.querySelector('#current-operand');

let previousOperand = '';
let currentOperand = '';
let operation = undefined;

const clear = () => {
  previousOperand = '';
  currentOperand = '';
  operation = undefined;
};

const deleteNumber = () => {
  currentOperand = currentOperand.toString().slice(0, -1);
};

const handleOperation = buttonValue => {
  if (buttonValue === '.') {
    inputDecimal();
    return;
  }

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
    case '.':
      result = previous + current;
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

const inputDecimal = () => {
  if (currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + '.';
};

const updateDisplay = () => {
  currentOperandTextElement.innerText = currentOperand;
  previousOperandTextElement.innerText = `${previousOperand} ${operation || ''}`;
};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.innerText;
    buttonValue === 'AC' ? clear() : null;
    buttonValue === 'DEL' ? deleteNumber() : null;
    ['+', '-', '*', '÷', '.'].includes(buttonValue) ? handleOperation(buttonValue) : null;
    buttonValue === '=' ? performOperation() : null;
    !isNaN(buttonValue) ? inputNumber(buttonValue) : null;
    updateDisplay();
  });
});
