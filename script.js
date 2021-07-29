/*
    When a user "submits" the form aka presses the generate password button
        -Need the value of each of the selections in the form
*/

// Target elements below
const form = document.getElementById("form");
const randomPassword = document.getElementById("random_password");

// Variable declarations
const numbersList = "1234567890";
const symbolsList = "!@#$%^&*";
const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseList = uppercaseList.toLowerCase();
const initialPassword = "l823Zs78#Css09@";

function getPassword(password) {
	randomPassword.innerText = password;
}

function handleFormSubmit(e) {
	e.preventDefault();

	const passwordLength = e.target.len.value;
	const includeUppercase = e.target.uppercase.checked;
	const includeLowercase = e.target.lowercase.checked;
	const includeNumbers = e.target.numbers.checked;
	const includeSymbols = e.target.symbols.checked;

	generatePassword(
		passwordLength,
		includeUppercase,
		includeLowercase,
		includeNumbers,
		includeSymbols
	);
}

function generatePassword(length, uppercase, lowercase, numbers, symbols) {
	if (!uppercase && !lowercase && !numbers && !symbols) {
		getPassword("");
		return;
	}

	let randomPassword = "";
	let randomCollection = [];

	if (uppercase) {
		randomPassword += generateRandomCharacter(uppercaseList);
		randomCollection.push("uppercaseList");
	}

	if (lowercase) {
		randomPassword += generateRandomCharacter(lowercaseList);
		randomCollection.push("lowercaseList");
	}

	if (numbers) {
		randomPassword += generateRandomCharacter(numbersList);
		randomCollection.push("numbersList");
	}

	if (symbols) {
		randomPassword += generateRandomCharacter(symbolsList);
		randomCollection.push("symbolsList");
	}

	let currentLength = randomPassword.length;

	while (currentLength < length) {
		let randomIndex = Math.round(Math.random() * (randomCollection.length - 1));

		let randomChoice = randomCollection[randomIndex];

		if (randomChoice === "numbersList")
			randomPassword += generateRandomCharacter(numbersList);
		else if (randomChoice === "symbolsList")
			randomPassword += generateRandomCharacter(symbolsList);
		else if (randomChoice === "uppercaseList")
			randomPassword += generateRandomCharacter(uppercaseList);
		else {
			randomPassword += generateRandomCharacter("lowercaseList");
		}

		currentLength++;
	}

	const finalPassword = randomizeCharacters(randomPassword);

	getPassword(finalPassword);
}

// Randomize the characters in a string
function randomizeCharacters(password) {
	return password
		.split("")
		.sort(function () {
			return 0.5 - Math.random();
		})
		.join("");
}

// Generate character functions
function generateRandomCharacter(str) {

	const arrOfStr = str.split("");

	const randomIndex = Math.floor(Math.random() * arrOfStr.length);

	const randomCharacter = arrOfStr[randomIndex];

	return randomCharacter;
}

form.addEventListener("submit", handleFormSubmit);

getPassword(initialPassword);
