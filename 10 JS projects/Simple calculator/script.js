const num1 = document.getElementById("number1");
const num2 = document.getElementById("number2");

const result = document.getElementById("result");

const buttons = document.querySelectorAll(".buttons button");
const evaluate = document.querySelector(".evaluate");
const evalutioninput = document.getElementById("evaluation");
const result2 = document.getElementById("result2");
console.log(buttons);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value1 = parseFloat(num1.value);
    const value2 = parseFloat(num2.value);

    let operationResult;

    switch (button.textContent) {
      case "-":
        operationResult = value1 - value2;
        break;
      case "+":
        operationResult = value1 + value2;
        break;
      case "/":
        if (value2 !== 0) {
          operationResult = value1 / value2;
        } else {
          operationResult = "Cannot divide by zero";
        }
        break;
      case "*":
        operationResult = value1 * value2;
        break;
      default:
        operationResult = "Unknown operation";
    }

    result.textContent = `Result: ${operationResult}`;
  });
});

evaluate.addEventListener("click", () => {
  const value = eval(evalutioninput.value);

  result2.textContent = `Result: ${value}`;
});
