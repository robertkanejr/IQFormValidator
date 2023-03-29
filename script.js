//Select form elements
const formEl = document.querySelector("#userForm");
const nameEl = document.querySelector("#uname");
const emailEl = document.querySelector("#uemail");
const countryEl = document.querySelector("#ucountry");

//------------Validate the form on submit------------
const submitForm = (e) => {
	e.preventDefault();

	let isNameValid = checkName(),
		isEmailValid = checkEmail(),
		isCountryValid = checkCountry();

	let isFormValid = isNameValid && isEmailValid && isCountryValid;

	if (isFormValid) {
		alert("Form Submit Success!");
		formEl.reset();
	}
};

//------------add event listener for the form submission------------
formEl.addEventListener("submit", submitForm);

//------------Validate the form on submit------------
const isFieldEmpty = (value) => (value === "" ? true : false);

//------------add error to the element where it occurs and update the class accordingly------------
const addErrors = (element, error) => {
	let errorElParent = element.parentElement;
	let errorEl = errorElParent.querySelector(".errorMsg");
	errorEl.classList.add("shown");
	errorEl.innerHTML = error;
	element.classList.add("invalid");
};

//------------when data is corrected, remove previous errors and update the class accordingly------------
const removeErrors = (element) => {
	let errorElParent = element.parentElement;
	let errorEl = errorElParent.querySelector(".errorMsg");
	errorEl.classList.remove("shown");
	errorEl.innerHTML = "";
	element.classList.remove("invalid");
};

//------------Validate name field and add errors if necessary------------
const checkName = () => {
	if (isFieldEmpty(nameEl.value)) {
		addErrors(nameEl, "Username is required");
	} else if (!checkCharLength(nameEl.value, 2, 65)) {
		addErrors(nameEl, "Username must be at min 2 characters and at max 65 characters long");
	} else {
		removeErrors(nameEl);
		return true;
	}
};

//------------Validate the character length between min and max value------------
const checkCharLength = (value, min, max) =>
	value.length >= min && value.length <= max ? true : false;

//------------Validate email field and add errors if necessary------------
const checkEmail = () => {
	if (isFieldEmpty(emailEl.value)) {
		addErrors(emailEl, "Email is required");
	} else if (!emailRegex(emailEl.value)) {
		addErrors(emailEl, "Please enter a valid email");
	} else {
		removeErrors(emailEl);
		return true;
	}
};

//------------Validate user input is a valid email address------------
const emailRegex = (email) => {
	const regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
};

//------------Validate country field and add errors if necessary------------
const checkCountry = () => {
	if (countryEl.value === "Select") {
		addErrors(countryEl, "Please select your country");
	} else {
		removeErrors(countryEl);
		return true;
	}
};
