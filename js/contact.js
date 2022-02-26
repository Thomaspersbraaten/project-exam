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
  // validateName();
  // validateEmail();
  // validateSubject();
  // validateMessage();
  event.preventDefault();
  if (nameValid && emailValid && subjectValid && messageValid) {
    sendContactForm();
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

// Send contact form to wordpress -> redirected to my personal email and stored in "flamingo" plugin on wordpress.

function sendContactForm(e) {
  var formData = new FormData();
  formData.append("your-name", fullName.value);
  formData.append("your-email", email.value);
  formData.append("your-subject", subject.value);
  formData.append("your-message", message.value);
  fetch(
    "https://tpbro.online/The-Environmentalist/wp-json/contact-form-7/v1/contact-forms/147/feedback",
    {
      method: "post",
      body: formData,
    }
  );
}

// Name validation

function validateName() {
  if (checkLength(fullName.value, 5)) {
    nameValid = true;
    nameError.style.display = "none";
    fullName.classList.remove("input-error-border-red");
  } else {
    nameValid = false;
    nameError.style.display = "flex";
    fullName.classList.add("input-error-border-red");
  }
}

function validateNameKeyup() {
  if (checkLength(fullName.value, 5)) {
    nameValid = true;
    nameError.style.display = "none";
    fullName.classList.remove("input-error-border-red");
  } else {
    nameValid = false;
  }
}

fullName.addEventListener("keyup", validateNameKeyup);

// Email validation

function validateEmail() {
  if (checkEmail(email.value)) {
    emailValid = true;
    emailError.style.display = "none";
    email.classList.remove("input-error-border-red");
  } else {
    emailValid = false;
    emailError.style.display = "flex";
    email.classList.add("input-error-border-red");
  }
}

function validateEmailKeyup() {
  if (checkEmail(email.value, 5)) {
    emailValid = true;
    emailError.style.display = "none";
    email.classList.remove("input-error-border-red");
  } else {
    emailValid = false;
  }
}
email.addEventListener("input", validateEmailKeyup);

// Subject validation

function validateSubject() {
  if (checkLength(subject.value, 15)) {
    subjectValid = true;
    subjectError.style.display = "none";
    subject.classList.remove("input-error-border-red");
  } else {
    subjectValid = false;
    subjectError.style.display = "flex";
    subject.classList.add("input-error-border-red");

  }
}

function validateSubjectKeyup() {
  if (checkLength(subject.value, 15)) {
    subjectValid = true;
    subjectError.style.display = "none";
    subject.classList.remove("input-error-border-red");
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
    message.classList.remove("input-error-border-red");
  } else {
    messageValid = false;
    messageError.style.display = "flex";
    message.classList.add("input-error-border-red");
  }
}

function validateMessageKeyup() {
  if (checkLength(message.value, 25)) {
    messageValid = true;
    messageError.style.display = "none";
    message.classList.remove("input-error-border-red");
  } else {
    messageValid = false;
    
  }
}

message.addEventListener("keyup", validateMessageKeyup);

// Checks

// function checkLength(value, length) {
//   if (value.trim().length > length) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function checkEmail(email) {
//   const regEx = /\S+@\S+\.\S+/;
//   const patterMatches = regEx.test(email);
//   return patterMatches;
// }
// window.addEventListener("resize", function() {
//   console.log(contactForm.getBoundingClientRect().width);

//   if (contactForm.getBoundingClientRect().width > 620) {
//     contactForm.style.margin = "20px auto 80px auto";
//     console.log("greater");
//   }


// });


// window.addEventListener("resize", function() {
  
//   if (contactForm.getBoundingClientRect().width < 620) {
//     contactForm.style.margin = "20px 20px 80px 20px";
//     console.log("less");
//   }


// });


