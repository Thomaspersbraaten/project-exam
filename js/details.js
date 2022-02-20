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
const modal = document.querySelector(".modal");

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

//

// API URLS
const detailsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&_embed&include[]=" +
  id;
const authorUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users/";
// const commentUrl =
//   "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments?post=" + id;
const commentUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments";
const postsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed";

//

async function fetchApi(
  urlForDetails,
  urlForAthor,
  urlForComments,
  urlForPosts
) {
  const detailsResponse = await fetch(urlForDetails);
  const detailsResults = await detailsResponse.json();
  //   console.log(results[0].author);
  const resultsData = detailsResults[0];
  const authorId = detailsResults[0].author;

  const authorResponse = await fetch(urlForAthor + authorId);
  const authorResults = await authorResponse.json();
  console.log(authorResults);

  const commentResponse = await fetch(urlForComments);
  const commentResults = await commentResponse.json();
  console.log(commentResults);

  //
  const postsResponse = await fetch(urlForPosts);
  const postsResults = await postsResponse.json();
  console.log(postsResults);

  activePage.innerHTML = `${resultsData.title.rendered}`;

  createHtml(detailsResults, authorResults, commentResults, postsResults);
}
fetchApi(detailsUrl, authorUrl, commentUrl, postsUrl);

function createHtml(post, author, comment, allPosts) {
  loader.style.display = "none";
  loaderContainer.style.display = "none";
  // HUSK Å FIKSE MÅNED // / //  / /  /  / /
  const commentData = comment[0];
  // console.log(commentData);

  const data = post[0];
  console.log(data);
  const postImage = data._embedded["wp:featuredmedia"][0].source_url;
  const d = new Date(data.date);
  // console.log(d);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const date = day + "." + month + 1 + "." + year;
  // console.log(date);
  // console.log(data.content.rendered);
  // console.log(data);
  title.innerHTML = `The Environmentalist | ${data.title.rendered}`;
  detailsHeader.innerHTML = `${data.title.rendered}`;
  imageContainer.innerHTML = `<img src="${postImage}" class="post-img">`;
  detailsContainer.innerHTML = `<div>${data.content.rendered}</div>`;
  // const imageContainer = document.querySelector(".post-img");
  // console.log(imageContainer);

  // MODAL MODAL MODAL

  imageContainer.addEventListener("click", function () {
    modalContainer.classList.add("visible");
    modalContent.innerHTML = `<img src="${postImage}" class="modal-img">`;
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

  //

  // Author information

  authorContainer.innerHTML = `
  <div>
    <img src="${author.simple_local_avatar[64]}" class="author-img">
    <p> Written by ${author.name}</p>
  </div>
  <p>${date}</p>
  `;

  // Next and previous posts

  // finds next index of posts array

  const index = allPosts.findIndex(function (post) {
    return post.id == id;
  });
  console.log(index);

  const nextIndex = index + 1;
  // TRY NEW NEW NEW NEW NEW

  // TRY NEW NEW NEW NEW NEW

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
    nextPost.classList.add("hover-style");
  } catch {
    nextPost.innerHTML = `
    <h3 class="no-more-posts"> No more posts</h3>
    `;
  }

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
    previousPost.classList.add("hover-style");
  } catch {
    previousPost.innerHTML = `
   <h3 class="no-more-posts"> No more posts</h3>
   `;
  }
  // Comment form : POSTID value inserted into the form
  // commentForm.innerHTML += `
  //  <input type="hidden" id="postId" value=${data.id} />`;

  // console.log(data.id);
  postIdInForm.value = Number(data.id);

  const postId = postIdInForm.value;
  console.log(postId);
  // Comment section
  commentAmount.innerHTML = `
  Comments(${comment.length})`;

  if (comment.length === 0) {
    firstComment.innerHTML = "Be the first to leave a comment";
  } else {
    firstComment.innerHTML = "";
  }
  comment.forEach(function (data) {
    readerComments.innerHTML += `
    <div class="user-comment-container">
    <h3>Comment by: ${data.author_name}</h3>
    <p>${data.content.rendered}</p>
    </div>`;
  });
}

// function modalFunction() {
//   modalContainer.style.display = "block";
// }

// modalContainer.addEventListener("click", function () {
//   modalContainer.style.display = "none";
// });

// Comment validation
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
  } else {
    nameValid = false;
    nameError.style.display = "flex";
  }
}

function validateNameKeyup() {
  if (checkLength(nameInput.value, 5)) {
    nameValid = true;
    nameError.style.display = "none";
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
email.addEventListener("input", validateEmailKeyup);

// Comment Validation

function validateComment() {
  if (checkLength(commentInput.value, 2)) {
    commentValid = true;
    commentError.style.display = "none";
  } else {
    commentValid = false;
    commentError.style.display = "flex";
  }
}

function validateCommentKeyup() {
  console.log(commentValid);
  if (checkLength(commentInput.value, 2)) {
    commentValid = true;
    commentError.style.display = "none";
  } else {
    commentValid = false;
  }
}

commentInput.addEventListener("input", validateCommentKeyup);

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

function validateForm(event) {
  event.preventDefault();
  if (nameValid && emailValid && commentValid) {
    successMessage.style.display = "flex";
    successMessage.innerHTML = `<p>Thank you for commenting!</p>`;
    // submitButton.disabled = true;
    postComment();
    commentForm.reset();
  } else {
    validateName();
    validateEmail();
    validateComment();
  }
}

commentForm.addEventListener("submit", validateForm);

function postComment() {
  // const [postIdInForm, nameInput, emailInput, commentInput] =
  //   event.target.elements;
  const postData = JSON.stringify({
    post: postIdInForm.value,
    author_name: nameInput.value,
    author_email: emailInput.value,
    content: commentInput.value,
  });
  console.log(postData);

  fetch("https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments"),
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: postData,
    };
}
