const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

let currentInput = "";
let previousInput = "";
let operator = null;

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentInput += button.textContent;
        display.value = currentInput;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentInput === "") return;

        if (previousInput !== "") {
            calculate();
        }

        operator = button.textContent;
        previousInput = currentInput;
        currentInput = "";
    });
});

equalsButton.addEventListener("click", () => {
    if (currentInput === "" || previousInput === "") return;
    calculate();
    operator = null;
});

clearButton.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = null;
    display.value = "";
});

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if (current === 0) {
                display.value = "Error";
                currentInput = "";
                previousInput = "";
                operator = null;
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    display.value = result;
    currentInput = result.toString();
    previousInput = "";
}