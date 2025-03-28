"use strict";
// src/index.ts
let count = 0;
const counterElement = document.getElementById("counter");
const incrementButton = document.getElementById("increment");
const decrementButton = document.getElementById("decrement");
const resetButton = document.getElementById("reset");
const updateCounter = () => {
    counterElement.textContent = count.toString();
};
incrementButton.addEventListener("click", () => {
    count++;
    updateCounter();
});
decrementButton.addEventListener("click", () => {
    count--;
    updateCounter();
});
resetButton.addEventListener("click", () => {
    count = 0;
    updateCounter();
});
updateCounter();
