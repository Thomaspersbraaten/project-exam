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
const month = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
//

// API URLS
const detailsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&_embed&include[]=" +
  id;
const authorUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users/";
const commentUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments?post=" + id;
// const commentUrl =
//   "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments";
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

  const data = post[0];
  console.log(data);
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

  // title and meta description
  const dataHeader = document.querySelector(".details-container h2");
  title.innerHTML = `The Environmentalist | ${data.title.rendered}`;
  const metaDescription = document.createElement("meta");

  metaDescription.name = "content";
  metaDescription.setAttribute(
    `content`,
    `${data.title.rendered}: ${dataHeader.innerHTML}`
  );
  console.log(metaDescription);

  // MODAL

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

  // Next and previous posts

  // finds next index of posts array

  const index = allPosts.findIndex(function (post) {
    return post.id == id;
  });

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
  // Comment form : Post.ID value inserted into the comment form

  postIdInForm.value = Number(data.id);
  console.log(postIdInForm);

  // Comment section
  commentAmount.innerHTML = `
  Comments(${comment.length})`;

  if (comment.length === 0) {
    firstComment.innerHTML = "Be the first to leave a comment";
  } else {
    firstComment.innerHTML = "";
  }
  comment.forEach(function (data) {
    //

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
    // successMessage.style.display = "flex";
    // successMessage.innerHTML = `<p>Thank you for commenting!</p>`;
    // submitButton.disabled = true;
    postComment();
    commentForm.reset();
    nameValid = false;
    emailValid = false;
    commentValid = false;

    // Reloads page after comment submission
    const delayedRedirect = setTimeout(() => {
      location.reload();
    }, 500);
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
  fetch(
    "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments",

    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: postData,
    }
  );
}

const toTopButton = document.querySelector(".to-the-top");
toTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("scroll", function () {
  if (
    document.documentElement.scrollTop + window.innerHeight ==
    document.documentElement.scrollHeight
  ) {
    if (window.innerWidth > 1800) {
      toTopButton.style.right = 500 + "px";
    } else {
      toTopButton.style.right = 20 + "px";
    }
  } else {
    toTopButton.style.right = -140 + "px";
  }
});
