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
    contactForm.reset();
    successMessage.style.display = "flex";
    successMessage.innerHTML = `<p>Thank you for contacting us!</p>`;
    // submitButton.disabled = true;
  } else {
    validateName();
    validateEmail();
    validateSubject();
    validateMessage();
  }
}

contactForm.addEventListener("submit", validateForm);

// function sendContactForm() {
//   const postData = JSON.stringify({
//     post: postIdInForm.value,
//     author_name: nameInput.value,
//     author_email: emailInput.value,
//     content: commentInput.value,
//   });

// }
function sendContactForm() {
  const postData = JSON.stringify({
    fullName: fullName.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  });
  console.log(postData);

  fetch(
    "https://tpbro.online/The-Environmentalist/wp-json/contact-form-7/v1/contact-forms/147/feedback"
  ),
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: postData,
    };
}

// Input validation function //

// Name validation

function validateName() {
  if (checkLength(fullName.value, 5)) {
    nameValid = true;
    nameError.style.display = "none";
  } else {
    nameValid = false;
    nameError.style.display = "flex";
  }
}

function validateNameKeyup() {
  if (checkLength(fullName.value, 5)) {
    nameValid = true;
    nameError.style.display = "none";
  } else {
    nameValid = false;
  }
}

fullName.addEventListener("keyup", validateNameKeyup);

// Email validation

function validateEmail(event) {
  if (checkEmail(email.value)) {
    emailValid = true;
    emailError.style.display = "none";
  } else {
    emailValid = false;
    emailError.style.display = "flex";
  }
}

function validateEmailKeyup() {
  if (checkEmail(email.value, 5)) {
    emailValid = true;
    emailError.style.display = "none";
  } else {
    emailValid = false;
  }
}
email.addEventListener("keyup", validateEmailKeyup);

// Subject validation

function validateSubject() {
  if (checkLength(subject.value, 15)) {
    subjectValid = true;
    subjectError.style.display = "none";
  } else {
    subjectValid = false;
    subjectError.style.display = "flex";
  }
}

function validateSubjectKeyup() {
  if (checkLength(subject.value, 15)) {
    subjectValid = true;
    subjectError.style.display = "none";
  } else {
    subjectValid = false;
  }
}
subject.addEventListener("keyup", validateSubjectKeyup);

// Message Validation

function validateMessage() {
  if (checkLength(message.value, 25)) {
    messageValid = true;
    messageError.style.display = "none";
  } else {
    messageValid = false;
    messageError.style.display = "flex";
  }
}

function validateMessageKeyup() {
  if (checkLength(message.value, 25)) {
    messageValid = true;
    messageError.style.display = "none";
  } else {
    messageValid = false;
  }
}

message.addEventListener("keyup", validateMessageKeyup);

// Checks

function checkLength(value, length) {
  if (value.trim().length > length) {
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
