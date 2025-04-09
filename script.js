function operate(leftOperand, rightOperand, operator) {
  switch (operator) {
    case "+":
      return leftOperand + rightOperand;
    case "-":
      return leftOperand - rightOperand;
    case "*":
      return leftOperand * rightOperand;
    case "/":
      if (rightOperand === 0) {
        alert("Cannot divide by zero");
        return null;
      }
      let result = leftOperand / rightOperand;
      return result.toPrecision(Math.min(result.toString().length, 6));
    case "%":
      return leftOperand % rightOperand;
    default:
      throw new Error("Invalid operator");
  }
}

function clear(display) {
  display.textContent = "0";
}

function updateDisplay(display, num, curValue) {
  if (curValue === null || curValue === 0) {
    display.textContent = num;
  } else {
    display.textContent += num;
  }
}

let leftOperand, rightOperand, operator, displayValue;
leftOperand = rightOperand = operator = null;
let curOperand = "left";
const display = document.querySelector(".display");
const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const backButton = document.querySelector(".backspace");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");

operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (display.textContent.length > 7) {
      return;
    }

    if (curOperand === "left") {
      updateDisplay(display, button.value, leftOperand);
      leftOperand = +display.textContent;
    } else {
      updateDisplay(display, button.value, rightOperand);
      rightOperand = +display.textContent;
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.value;

    if (curOperand === "left") {
      curOperand = "right";
    } else {
      leftOperand = operate(leftOperand, rightOperand, operator);
      rightOperand = null;
      display.textContent = leftOperand;
    }
  });
});

equalsButton.addEventListener("click", () => {
  console.log(leftOperand, rightOperand, operator);

  leftOperand = operate(leftOperand, rightOperand, operator);
  rightOperand = operator = null;
  display.textContent = leftOperand;
  curOperand = "left";
});

clearButton.addEventListener("click", () => {
  clear(display);
  displayValue = 0;
  leftOperand = rightOperand = operator = null;
});

backButton.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
  if (curOperand === "left") {
    leftOperand = +display.textContent;
  } else {
    rightOperand = +display.textContent;
  }
});

decimalButton.addEventListener("click", () => {
  if (display.textContent.includes(".")) {
    return;
  } else if (curOperand === "left") {
    updateDisplay(display, ".", leftOperand);
    leftOperand = +display.textContent;
  } else {
    updateDisplay(display, ".", rightOperand);
    rightOperand = +display.textContent;
  }
});
