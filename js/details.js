import showErrorMessage from "../components/feedback/showErrorMessage.js";
import { scrollToTop, showScrollToTop } from "../components/ui/toTheTop.js";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const detailsContainer = document.querySelector(".details-container");
const detailsHeader = document.querySelector(".details-header");
const imageContainer = document.querySelector(".details-image");
const title = document.querySelector("title");
const activePage = document.querySelector(".active-page");
const authorContainer = document.querySelector(".author-info");
const postNavigation = document.querySelector(".next-previous");
const nextPost = document.querySelector(".next-post");
const previousPost = document.querySelector(".previous-post");
const commentSection = document.querySelector(".comment-section");
const commentAmount = document.querySelector(".comment-amount");
const firstComment = document.querySelector(".be-the-first-to-comment");
const modalContainer = document.querySelector(".modal-container");
// const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const loaderContainer = document.querySelector(".loader-container");
const loader = document.querySelector(".loader");
const readerComments = document.querySelector(".reader-comments");
// comment form consts
const commentForm = document.querySelector(".comment-form");
const submitButton = document.querySelector(".submit-button");
const postIdInForm = document.querySelector("#postId");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const commentInput = document.querySelector("#comment");
const commentErrorMessage = document.querySelector(".post-comment-error-message");
const commentLoader = document.querySelector(".comment-loader");

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// API URLS
const detailsUrl = "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed&include[]=" + id;
const authorUrl = "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users/";
const commentUrl = "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments?&per_page=100&post=" + id;
const postsUrl = "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed";

async function fetchDetailsAndAuthor(urlForDetails, urlForAthor) {
  try {
    const detailsResponse = await fetch(urlForDetails);
    const detailsResults = await detailsResponse.json();

    const resultsData = detailsResults[0];
    const authorId = detailsResults[0].author;

    const authorResponse = await fetch(urlForAthor + authorId);
    const authorResults = await authorResponse.json();

    // Creates the title of post in the breadcrumbs
    activePage.innerHTML = `${resultsData.title.rendered}`;

    createDetails(detailsResults, authorResults);
  } catch (error) {
    commentLoader.style.display = "none";
    loaderContainer.style.display = "none";
    detailsContainer.innerHTML = showErrorMessage(error);
  }
}

fetchDetailsAndAuthor(detailsUrl, authorUrl);

// Creates the Next and Previous post links under post details.
async function getAllPosts(urlForPosts) {
  const postsResponse = await fetch(urlForPosts);
  const postsResults = await postsResponse.json();

  createNextAndPreviousSection(postsResults);
}

getAllPosts(postsUrl);

function createNextAndPreviousSection(allPosts) {
  const index = allPosts.findIndex(function (post) {
    return post.id == id;
  });

  // finds next index of posts array and creates the next post link
  const nextIndex = index + 1;

  try {
    nextPost.innerHTML = `
    <a href="details.html?id=${allPosts[nextIndex].id}" style="text-decoration:none" class="next-container">
      <h3 class="next-header"> Next post:</h3>
      <div class="title-and-arrow">
        <p class="next-title">${allPosts[nextIndex].title.rendered}</p>
        <i class="fas fa-arrow-circle-right"></i>
      </div>
    </a>
    `;
  } catch {
    nextPost.style.display = "none";
  }

  // Finds the previous index of posts and creates the previous post link
  const previousIndex = index - 1;

  try {
    previousPost.innerHTML = `
    <a href="details.html?id=${allPosts[previousIndex].id}" style="text-decoration:none" class="previous-container">
      <h3 class="next-header"> Previous post:</h3>
      <div class="title-and-arrow">
        <i class="fas fa-arrow-circle-left"></i>
        <p class="next-title">  ${allPosts[previousIndex].title.rendered}</p>
      </div>
    </a>
  `;
  } catch {
    postNavigation.style.justifyContent = "right";
    previousPost.style.display = "none";
  }
}

function createDetails(post, author) {
  loader.style.display = "none";
  loaderContainer.style.display = "none";

  const data = post[0];
  const postImage = data._embedded["wp:featuredmedia"][0];
  // Month construction
  const dateCreation = new Date(data.date);
  const year = dateCreation.getFullYear();
  const monthIndex = dateCreation.getMonth();
  const day = dateCreation.getDate();
  const date = day + "." + month[monthIndex] + "." + year;

  // Page content
  detailsHeader.innerHTML = `${data.title.rendered}`;
  imageContainer.innerHTML = `<img src="${postImage.source_url}" class="post-img" alt="${postImage.alt_text}">`;
  detailsContainer.innerHTML = `${data.content.rendered}`;

  // dynamic title and meta description
  const dataHeader = document.querySelector(".details-container h2");
  title.innerHTML = `The Environmentalist | ${data.title.rendered}`;
  const metaDescription = document.querySelector("#meta-description");
  metaDescription.content = `${data.title.rendered}: ${dataHeader.innerText}`;

  // MODAL for image container

  imageContainer.addEventListener("click", function () {
    modalContainer.classList.add("visible");
    modalContent.innerHTML = `<img src="${postImage.source_url}" class="modal-img" alt="${postImage.alt_text}">`;
  });
  modalContainer.addEventListener("click", function () {
    modalContainer.classList.remove("visible");
  });
  modalContent.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
  });

  // Author information

  authorContainer.innerHTML = `
  <div>
    <img src="${author.simple_local_avatar[64]}" class="author-img" alt="profile picture of ${author.name}">
    <p> Written by ${author.name}</p>
  </div>
  <p>${date}</p>
  `;
  postIdInForm.value = Number(data.id);
}

// Creates comments section

async function createComments(commentUrl) {
  try {
    readerComments.innerHTML = "";
    const commentResponse = await fetch(commentUrl);
    const commentResults = await commentResponse.json();
    commentAmount.innerHTML = `
    Comments(${commentResults.length})`;

    if (commentResults.length === 0) {
      firstComment.innerHTML = "Be the first to leave a comment";
    } else {
      firstComment.style.display = "none";
    }
    commentResults.forEach(function (data) {
      const dateCreation = new Date(data.date);
      const year = dateCreation.getFullYear();
      const monthIndex = dateCreation.getMonth();
      const day = dateCreation.getDate();
      const date = day + "." + month[monthIndex] + "." + year;
      readerComments.innerHTML += `
      <div class="user-comment-container">
        <div class="user-comment-top"> <h3 class="comment-name">Comment by: ${data.author_name}</h3><p class="comment-date">on ${date}</p>
        </div>  
        <div class="comment-content"> ${data.content.rendered}</div>
      </div>
      `;
    });
    commentLoader.style.display = "none";
  } catch (error) {
    commentLoader.style.display = "none";
    readerComments.innerHTML = showErrorMessage(error);
  }
}

createComments(commentUrl);

function validateForm(event) {
  event.preventDefault();
  if (nameValid && emailValid && commentValid) {
    commentLoader.style.display = "block";
    postComment();
    commentForm.reset();
    nameValid = false;
    emailValid = false;
    commentValid = false;
  } else {
    validateName();
    validateEmail();
    validateComment();
  }
}

commentForm.addEventListener("submit", validateForm);

function postComment() {
  const postData = JSON.stringify({
    author_name: nameInput.value,
    author_email: emailInput.value,
    content: commentInput.value,
    post: postIdInForm.value,
  });
  fetch("https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: postData,
  });

  const reloadComments = setTimeout(() => {
    successMessage.style.display = "flex";
    createComments(commentUrl);
  }, 1000);
}

// Comment validation functions
// On form submission the error message and red border will show. When user inputs valid values, the error message is removed and border reset to black.

const nameError = document.querySelector(".name-error");
const emailError = document.querySelector(".email-error");
const commentError = document.querySelector(".comment-error");
const successMessage = document.querySelector(".success-message");

var nameValid = false;
var emailValid = false;
var commentValid = false;

// Name Validation

function validateName() {
  if (checkLength(nameInput.value, 5)) {
    nameValid = true;
    nameError.style.display = "none";
    nameInput.classList.remove("input-error-border-red");
  } else {
    nameValid = false;
    nameError.style.display = "flex";
    nameInput.classList.add("input-error-border-red");
  }
}

function validateNameKeyup() {
  if (checkLength(nameInput.value, 5)) {
    nameValid = true;
    nameError.style.display = "none";
    nameInput.classList.remove("input-error-border-red");
  } else {
    nameValid = false;
  }
}

nameInput.addEventListener("input", validateNameKeyup);

// Email Validation

function validateEmail(event) {
  if (checkEmail(email.value)) {
    emailValid = true;
    emailError.style.display = "none";
    emailInput.classList.remove("input-error-border-red");
  } else {
    emailValid = false;
    emailError.style.display = "flex";
    emailInput.classList.add("input-error-border-red");
  }
}

function validateEmailKeyup() {
  if (checkEmail(email.value, 5)) {
    emailValid = true;
    emailError.style.display = "none";
    emailInput.classList.remove("input-error-border-red");
  } else {
    emailValid = false;
  }
}
email.addEventListener("input", validateEmailKeyup);

// Comment Validation

function validateComment() {
  if (checkLength(commentInput.value, 1)) {
    commentValid = true;
    commentError.style.display = "none";
    commentInput.classList.remove("input-error-border-red");
  } else {
    commentValid = false;
    commentError.style.display = "flex";
    commentInput.classList.add("input-error-border-red");
  }
}

function validateCommentKeyup() {
  if (checkLength(commentInput.value, 1)) {
    commentValid = true;
    commentError.style.display = "none";
    commentInput.classList.remove("input-error-border-red");
  } else {
    commentValid = false;
  }
}

commentInput.addEventListener("input", validateCommentKeyup);

// To the top button

const toTopButton = document.querySelector(".to-the-top");
toTopButton.addEventListener("click", scrollToTop);
document.addEventListener("scroll", showScrollToTop);
