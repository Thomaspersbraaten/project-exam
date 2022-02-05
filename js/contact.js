// Contact Consts

const fullName = document.querySelector("#name");
const nameError = document.querySelector(".name-error");

const email = document.querySelector("#email");
const emailError = document.querySelector(".email-error");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector(".subject-error");

const message = document.querySelector("#message");
const messageError = document.querySelector(".message-error");

const submitButton = document.querySelector(".submit-button");
const contactForm = document.querySelector("#contact-form");
const successMessage = document.querySelector(".success-message");

var nameValid = false;
var emailValid = false;
var subjectValid = false;
var messageValid = false;

// Form Validation function

function validateForm(event) {
  event.preventDefault();
  if (nameValid && emailValid && subjectValid && messageValid) {
    // contactForm.reset();
    successMessage.innerHTML = `<p>Thank you for contacting us!</p>`;
  } else {
    validateName();
    validateEmail();
    validateSubject();
    validateMessage();
  }
}

contactForm.addEventListener("submit", validateForm);

// Input validation function

function validateName() {
  if (checkLength(fullName.value, 5)) {
    nameValid = true;
    nameError.style.display = "none";
  } else {
    nameValid = false;
    nameError.style.display = "flex";
  }
}

function validateEmail() {
  if (checkEmail(email.value)) {
    emailValid = true;
    emailError.style.display = "none";
  } else {
    emailValid = false;
    emailError.style.display = "flex";
  }
}

function validateSubject() {
  if (checkLength(subject.value, 15)) {
    subjectValid = true;
    subjectError.style.display = "none";
  } else {
    subjectValid = false;
    subjectError.style.display = "flex";
  }
}

function validateMessage() {
  if (checkLength(message.value, 25)) {
    messageValid = true;
    messageError.style.display = "none";
  } else {
    messageValid = false;
    messageError.style.display = "flex";
  }
}

// Checks

function checkLength(value, length) {
  if (value.trim().length >= length) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patterMatches = regEx.test(email);
  return patterMatches;
}

// Events
