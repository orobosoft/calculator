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
	Math.sign(currentNum) === 1
		? (currentNum = -Math.abs(currentNum))
		: (currentNum = Math.abs(currentNum));
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

//Calculate inputs
function calculate(input) {
	//toggle negative
	if (input === "-/+") {
		input = "";
		negative();
	}
	//Clear all button
	if (input === "AC") {
		input = "";
		prevNum = "";
		currentNum = "";
		operator = "";
		answer = "";
		display1.style.color = "black";
		display1.textContent = "0";
		display2.textContent = "";
		return;
	}
	//Delete button
	if (input === "C") {
		input = "";
		currentNum = currentNum.slice(0, -1);
		answer = prevNum;
		if (answer === "" && prevNum === "" && currentNum === "") {
			display1.textContent = "0";
			return;
		}
	}
	// Can't divide by 0 message
	if (
		(operator === "/" && currentNum === "" && input === "0") ||
		(operator === "/" && currentNum === "." && input === "0")
	) {
		display2.textContent = "Can't divide by 0";
		display2.style.color = "red";
		display1.style.color = "red";
		return;
	} else {
		display2.style.color = "black";
		display1.style.color = "black";
	}

	//Restrict multiple decimal
	if (input === "." && currentNum.includes(".")) {
		input = "";
	}

	//Do the calculation
	if (!signOp.includes(input)) {
		currentNum += input;
		if (prevNum && currentNum && operator) {
			answer = operate(theObject[operator], +prevNum, +currentNum);
		}
	}
	if (signOp.includes(input)) {
		operator = input;
		if (!prevNum && answer) {
			prevNum = Math.floor(answer * 100000) / 100000;
			currentNum = "";
		} else if (!prevNum) {
			prevNum = currentNum;
			currentNum = "";
		}
		if (prevNum && currentNum) {
			prevNum = Math.floor(answer * 100000) / 100000;
			currentNum = "";
		}
	}

	//Display
	if (isNaN(answer)) {
		answer = "";
	}
	display2.textContent = answer;
	display1.textContent = `${prevNum} ${operator} ${currentNum}`;

	//Evaluate result
	if (input === "=") {
		display1.textContent = Math.floor(answer * 100000) / 100000;
		display2.textContent = "";
		operator = "";
		prevNum = "";
		currentNum = "";
	}
}

// Event listener
document
	.querySelectorAll(".btn")
	.forEach((event) =>
		event.addEventListener("click", (e) => calculate(e.target.textContent))
	);
document.addEventListener("keydown", (e) => {
	keyboardInput(e.key);
});

// Keyboard support
function keyboardInput(key) {
	digits = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"0",
		".",
		"-",
		"+",
		"*",
		"/",
		"=",
	];
	let input = "";
	if (digits.includes(key)) {
		inKey = digits.indexOf(key);
		input = digits[inKey];
	}
	if (key === "Backspace") {
		input = "C";
	}
	if (key === "Delete" || key === "Escape") {
		input = "AC";
	}
	if (key === "Enter" || key === " ") {
		input = "=";
	}
	calculate(input);
}
