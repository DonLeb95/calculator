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
let check = false;
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function () {
        
        if (this.textContent.trim() == "C"){
            display.textContent = "";
            check = false;
            return;
        }
        
        if (this.textContent.trim() == "Remove"){
            display.textContent = display.textContent.slice(0,-1);
            check = false;
            return;
        }

        if (this.textContent.trim() == "="){
            const arr = display.textContent.split(/([^\d.])/).filter(Boolean);

            //in case of consecutive operator uses and no number post operator
            const doubleOperatorCheck = arr.map((check,ind) => isNaN(check) && isNaN(arr[ind+1]));
            const badCalc = doubleOperatorCheck.filter(Boolean);
            if(badCalc.length > 0){
                display.textContent = "You can't calculate that";
                check = false;
                return;
            }

            const division0Check = arr.map((check,ind) => check + arr[ind+1]);
            const divBy0 = division0Check.filter(check => check == "/0")
            if(divBy0.length > 0){
                display.textContent = "That ain't it dawg";
                check = false;
                return;
            }

            let nums = arr.filter(numbers => !isNaN(numbers)).map(Number);
            let oper = arr.filter(operators => isNaN(operators));
            for(let i = 0;i < oper.length;i++){
                nums[i+1] = operate(oper[i],nums[i],nums[i+1]);   
            }
            display.textContent = nums[nums.length - 1];
            check = true;
            return; 
        }

        if (check) {
            display.textContent = "";
            check = false;          
        }
         
        display.textContent += this.textContent.trim();
    })                                                                               
})

document.addEventListener("keyup", function (e) {
        
    const requiredKeys = ["Enter", "Backspace", "Delete", "+", "-", "*", "/", ".", "="];

    if (!/\d/.test(e.key) && !requiredKeys.includes(e.key)) {
        return;
    }

    if (e.key == "Delete"){
        display.textContent = "";
        check = false;
        return;
    }
    
    if (e.key == "Backspace"){
        display.textContent = display.textContent.slice(0,-1);
        check = false;
        return;
    }

    if (e.key == "Enter"){
        const arr = display.textContent.split(/([^\d.])/).filter(Boolean);

        //in case of consecutive operator uses and no number post operator
        const doubleOperatorCheck = arr.map((check,ind) => isNaN(check) && isNaN(arr[ind+1]));
        const badCalc = doubleOperatorCheck.filter(Boolean);
        if(badCalc.length > 0){
            display.textContent = "You can't calculate that";
            check = false;
            return;
        }

        const division0Check = arr.map((check,ind) => check + arr[ind+1]);
        const divBy0 = division0Check.filter(check => check == "/0")
        if(divBy0.length > 0){
            display.textContent = "That ain't it dawg";
            check = false;
            return;
        }

        let nums = arr.filter(numbers => !isNaN(numbers)).map(Number);
        let oper = arr.filter(operators => isNaN(operators));
        for(let i = 0;i < oper.length;i++){
            nums[i+1] = operate(oper[i],nums[i],nums[i+1]);   
        }
        display.textContent = nums[nums.length - 1];
        check = true;
        return; 
    }

    if (check) {
        display.textContent = "";
        check = false;          
    }
     
    display.textContent += e.key.trim();
})