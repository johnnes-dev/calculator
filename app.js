const valueKeys = document.querySelectorAll('.numbers, .operators');
const acKey = document.querySelector('#acKey')
const deleteKey = document.querySelector('#deleteKey')
const equalKey = document.querySelector('#equalKey')
const operationDisplay = document.querySelector('.operationDisplay')
const resultDisplay = document.querySelector('.resultDisplay')
//const allKey = document.querySelectorAll('.numbers, .operators, #acKey, #deleteKey, #equalKey')

let operandA = '';
let operandB = '';
let operator = '';
// let operation = '';
let answer = '';
let fase = 'A';
let afterEqual = false;

window.addEventListener('load', () => getUserInput());
equalKey.addEventListener('click', showResult);
deleteKey.addEventListener('click', deleteLast);
acKey.addEventListener('click', clearAll);
// allKey.forEach(key => {
//     key.addEventListener('click', () => {
//         adjustText(operation);
// })})

function getUserInput() {
    valueKeys.forEach(valueKey => {
        valueKey.addEventListener('click', () => {
            let userInput = valueKey.textContent;
            
            if (valueKey.className === 'numbers') {    

                if (afterEqual === true) {
                    operandA = '';
                    operationDisplay.textContent = '';
                    afterEqual = false;
                }

                if (fase === 'A') {
                    if (userInput === '.' && operandA.includes('.')) return;                    
                    if (userInput === '.' && operandA === '') {
                        operandA = '0.';
                    } else {
                        operandA += userInput;
                    }
                    operationDisplay.append(userInput);
                    console.log('operandA :', operandA);
                    console.log('fase :', fase);
                } else if (fase === 'B') {
                    if (userInput === '.' && operandB.includes('.')) return;
                    if (userInput === '.' && operandB === '') {
                        operandB = '0.';
                    } else {
                        operandB += userInput;
                    }
                    operationDisplay.append(userInput);
                    console.log('operandB :', operandB);
                    console.log('fase :', fase);
                }
            }

            if (valueKey.className === 'operators') {
                let lastChar = operationDisplay.textContent.slice(-1);
                
                if (operandA !== '' && operandB !== '' && operator !== '') return;
                if (operandA === '') return;

                if (afterEqual === true) {
                    afterEqual = false;
                }
                
                operator = userInput;
                operationDisplay.append(operator);
                fase = 'B'
                console.log('fase :', fase);
                console.log('operator :', operator);
            }
            console.log('texto do div Display: ', operationDisplay.textContent);
            if ( answer = '')
            resultDisplay.textContent = operate(answer, operandB);
        })
    })
}

function operate(a, b) {
    if (operandA === '' || operator === '' || operandB === '') {
        return '';
    }

    numberA = Number(a);
    numberB = Number(b);

    switch (operator) {
        case '+':
            result = add(numberA, numberB);
            break;
        case '-':
            result = subtract(numberA, numberB);
            break;
        case '*':
            result = multiply(numberA, numberB);
            break;
        case '/':
            result = divide(numberA, numberB);
            break;
        default:
            return '';
    }
    return formatResult(result);
}

function add(operandA, operandB) {
    let result = Number((operandA + operandB).toFixed(20));
    return result;
}

function subtract(operandA, operandB) {
    let result = Number((operandA - operandB).toFixed(20));
    return result;
}

function multiply(operandA, operandB) {
    let result = Number((operandA * operandB).toFixed(0));
    return result;
}

function divide(operandA, operandB) {
    if (operandB === 0) return '';
    let result = Number((operandA / operandB).toFixed(20));
    return result;
}

function showResult() {
    if (operandA !== '' && operandB !== '' && operator !== '') {
        const result = operate();
        operationDisplay.textContent = result;
        
        resultDisplay.textContent = '';
        operandA = result;
        operandB = '';
        operator = '';
        fase = 'A';
        afterEqual = true;
    } else {
        return;
    }
}

function deleteLast() {
    let lastChar = operationDisplay.textContent.slice(-1);
    operationDisplay.textContent = operationDisplay.textContent.slice(0, -1);

    if (fase === 'A') {
        operandA = String(operandA).slice(0, -1);
    }

    if (['+', '-', '*', '/'].includes(lastChar)) {
        operator = '';
        fase = 'A'
    }

    if (fase === 'B') {
        operandB = String(operandB).slice(0, -1);

        if (operandB === '' && operator ==='') {
            fase = 'A';
        }
    }

    resultDisplay.textContent = operate();
}

function clearAll() {
    operandA = '';
    operandB = '';
    operator = '';
    operation = '';
    fase = 'A';
    afterEqual = false;
    operationDisplay.textContent = '';
    resultDisplay.textContent = '';
}

function formatResult(num) {
  if (num.toString().length > 20) {
    return Number(num).toExponential(15);
  }
  return num;
}

operationDisplay.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    operationDisplay.scrollLeft += e.deltaY;
    e.preventDefault();
  }
}, { passive: false });


// Use the first button of the mouse to scroll horizontally the taxt in the operation display 

// let isDown = false;
// let startX;
// let scrollLeft;

// operationDisplay.addEventListener("mousedown", e => {
//   isDown = true;
//   startX = e.pageX - operationDisplay.offsetLeft;
//   scrollLeft = operationDisplay.scrollLeft;
// });
// operationDisplay.addEventListener("mouseleave", () => isDown = false);
// operationDisplay.addEventListener("mouseup", () => isDown = false);
// operationDisplay.addEventListener("mousemove", e => {
//   if (!isDown) return;
//   e.preventDefault();
//   const x = e.pageX - operationDisplay.offsetLeft;
//   const walk = (x - startX);
//   operationDisplay.scrollLeft = scrollLeft - walk;
// });


// function adjustText(text) {
//     const opText = operationDisplay
//     const maxWidth = opText.clientWidth;
//     const minFontSize = 12;
//     let fontSize = parseFloat(getComputedStyle(opText).fontSize);

//     opText.textContent = text

//     opText.style.fontSize = fontSize + 'px';

//     while (opText.scrollWidth > maxWidth && fontSize > minFontSize) {
//         fontSize -= 1;
//         opText.style.fontSize = fontSize + 'px';
//     }
// }