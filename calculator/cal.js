const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';
let resultDisplayed = false;

keys.addEventListener('click', event => {
  const target = event.target;
  if (!target.classList.contains('key')) return;

  const number = target.dataset.number;
  const action = target.dataset.action;

  if (number) {
    if (resultDisplayed) {
      currentInput = number;
      resultDisplayed = false;
    } else {
      currentInput += number;
    }
    screen.value = currentInput;
  } else if (action) {
    switch (action) {
      case 'clear':
        currentInput = '';
        screen.value = '';
        break;

      case 'delete':
        currentInput = currentInput.slice(0, -1);
        screen.value = currentInput;
        break;

      case 'equals':
        try {
          // Replace special operators with JS operators
          let expression = currentInput
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-');

          // Evaluate the expression safely
          const evalResult = Function('"use strict";return (' + expression + ')')();
          screen.value = evalResult;
          currentInput = evalResult.toString();
          resultDisplayed = true;
        } catch (error) {
          screen.value = 'Error';
          currentInput = '';
        }
        break;

      case 'add':
        currentInput += '+';
        screen.value = currentInput;
        break;

      case 'subtract':
        currentInput += '−';
        screen.value = currentInput;
        break;

      case 'multiply':
        currentInput += '×';
        screen.value = currentInput;
        break;

      case 'divide':
        currentInput += '÷';
        screen.value = currentInput;
        break;
    }
  }
});
