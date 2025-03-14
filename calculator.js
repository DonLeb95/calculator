//arithmetic functions

function add(n1, n2) {
    return n1 + n2
}

function subtract (n1, n2) {
    return n1 - n2
}

function multiply (n1, n2) {
    return n1 * n2
}

function divide (n1, n2) {
    return n1 / n2
}
let operator;
let num1;
let num2;
function operate (operator, num1, num2) {
    switch(operator){
        case "+" :
            return add(num1,num2);
        case "-" :
            return subtract(num1,num2);
        case "*" :
            return multiply(num1,num2);
        case "/" :
            return divide(num1,num2);
    }
}
const display = document.querySelector(".calculator-display");

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function () {
        if (this.textContent.trim() == "C"){
            return display.textContent = ""
        } else if (this.textContent.trim() == "="){
            const arr = display.textContent.split(/([^0-9]+)/);
            num1 = Number(arr[0]);
            num2 = Number(arr[2]);
            operator = arr[1];
            return display.textContent = operate(operator,num1,num2);
        }
        display.textContent += this.textContent.trim();
    })                                                                               
})