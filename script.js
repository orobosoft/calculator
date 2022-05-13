//Basic math function
function add(a, b) {
	return a + b;
}
function subtract(a, b) {
	return a - b;
}
function multiply(a, b) {
	return a * b;
}
function divide(a, b) {
	return a / b;
}
function operate(operator, num1, num2) {
	return operator(num1, num2);
}
function negative() {
	Math.sign(currentNum) === 1 ?
		currentNum = -Math.abs(currentNum) : currentNum = Math.abs(currentNum);
}
// Variables
let display1 = document.querySelector(".display--first");
let display2 = document.querySelector(".display--second");
let prevNum = "";
let currentNum = "";
let operator = "";
let answer = "";
let display = "";

theObject = {
	"*": multiply,
	"+": add,
	"-": subtract,
	"/": divide,
	"=": operate,
};
let signOp = Object.keys(theObject);

// Event listener
document
	.querySelectorAll(".btn")
	.forEach((event) =>
		event.addEventListener("click", (e) => calculate(e.target.textContent))
	);