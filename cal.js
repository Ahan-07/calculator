const display = document.getElementById("result");
let justCalculated = false; // Track last action

// Clear the screen
function clearScreen() {
    display.value = "0";
    justCalculated = false;
}

// Delete the last character
function deleteLast() {
    if (display.value.length === 1 || display.value === "Error") {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Append a value to the display
function appendValue(value) {
    if (justCalculated) {
        display.value = value;
        justCalculated = false;
    } else {
        if (display.value === "0" || display.value === "Error") {
            display.value = value;
        } else {
            display.value += value;
        }
    }
}

// Calculate result safely
function calculate() {
    try {
        let expression = display.value.trim();
 // Handle ^ symbol for squaring numbers
 expression = expression.replace(/(\d+)\^/g, "Math.pow($1, 2)");

        // Validate before evaluation
        if (!isValidExpression(expression)) {
            display.value = "Error";
            return;
        }

        // Prevent division by zero
        if (expression.includes("/0")) {
            display.value = "Error";
            return;
        }

        // Safely evaluate the expression
        display.value = safeEval(expression);
        justCalculated = true;
    } catch {
        display.value = "Error";
    }
}

// Safe evaluation of math expressions
function safeEval(expr) {
    return new Function(`'use strict'; return (${expr})`)();
}

// Validate input expression
function isValidExpression(expr) {
    // Allow numbers, basic math operators, parentheses, decimals, and modulo (%)
    return /^-?(\d+(\.\d*)?|\.\d+)([-+*/%](-?(\d+(\.\d*)?|\.\d+)))*$/.test(expr);
}

// Dark Mode Toggle
function toggleDarkMode() {
    const x=document.getElementsByClassName("container")[0]
 x.classList.toggle("dark-mode");

    // Change button text
    const btn = document.getElementById("darkModeBtn");
    btn.innerText = x.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
}
