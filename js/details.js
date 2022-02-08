const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const detailsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?include[]=" +
  id;
const detailsContainer = document.querySelector(".details-container");
const detailsHeader = document.querySelector(".details-header");
const imageContainer = document.querySelector(".details-image");
const title = document.querySelector("title");
const allPostsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts/";

const authorUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users/";
const imageUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/media?parent=" + id;
const commentUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments?post=" + id;
const postsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=100";

const activePage = document.querySelector(".active-page");
const authorContainer = document.querySelector(".author-info");
const postNavigation = document.querySelector(".next-previous");
const nextPost = document.querySelector(".next-post");
const previousPost = document.querySelector(".previous-post");
const commentSection = document.querySelector(".comment-section");
const commentAmount = document.querySelector(".comment-amount");
const firstComment = document.querySelector(".be-the-first-to-comment");
const commentValue = document.querySelector("#postId");

const readerComments = document.querySelector(".reader-comments");

async function fetchApi(url, urlTwo, urlThree, urlFour, urlFive) {
  const response = await fetch(url);
  const results = await response.json();
  //   console.log(results[0].author);
  const resultsData = results[0];
  const authorId = results[0].author;

  const authorResponse = await fetch(urlTwo + authorId);
  const authorResults = await authorResponse.json();
  console.log(authorResults);

  // const imageResponse = await fetch(urlThree);
  // const imageResults = await imageResponse.json();
  // console.log(imageResults);

  const commentResponse = await fetch(urlFour);
  const commentResults = await commentResponse.json();
  console.log(commentResults);

  //
  const postsResponse = await fetch(urlFive);
  const postsResults = await postsResponse.json();
  console.log(postsResults);

  activePage.innerHTML = `${resultsData.title.rendered}`;

  // console.log(results);
  createHtml(results, authorResults, commentResults, postsResults);
  // const detailsData = results[0];
  // detailsContainer.innerHTML = `
  // <div>
  // ${detailsData.id}
  // ${authorResults.name}
  // </div>`;
}

function createHtml(post, author, comment, allPosts) {
  // HUSK Å FIKSE MÅNED // / //  / /  /  / /
  const commentData = comment[0];
  // console.log(commentData);

  const data = post[0];
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
  detailsContainer.innerHTML = `<img src="${data.content.rendered}`;

  detailsContainer.firstElementChild.style.display = "none";

  // Author information

  authorContainer.innerHTML = `
  <div>
  <img src="${author.simple_local_avatar[64]}" class="author-img">
  <p> Written by ${author.name}</p>
  </div>
  <p> ${date}</p>
  `;

  // Next and previous posts

  // finds next index of posts array

  const index = allPosts.findIndex(function (post) {
    return post.id == id;
  });
  console.log(index);

  const nextIndex = index + 1;

  try {
    nextPost.innerHTML = `
    <a href="details.html?id=${allPosts[nextIndex].id}" style="text-decoration:none" class="next-container">
    <p> Next post: ${allPosts[nextIndex].title.rendered}</p>
    <div><i class="fas fa-arrow-circle-right"></i> </div>
    </a>
    `;
  } catch {
    nextPost.innerHTML = `
    <p class="no-more-posts"> No more posts</p>
    `;
  }

  // Finds previous index in all posts
  const previousIndex = nextIndex - 2;

  try {
    previousPost.innerHTML = `
  <a href="details.html?id=${allPosts[previousIndex].id}" style="text-decoration:none" class="previous-container">
    <p> Next post: ${allPosts[previousIndex].title.rendered}</p>
    <div><i class="fas fa-arrow-circle-left"></i> </div>
    </a>
  `;
  } catch {
    previousPost.innerHTML = `
   <p class="no-more-posts"> No more posts</p>
   `;
  }

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

    // commentValue = `${data.id}`;
    // console.log(commentValue);
  });
}

fetchApi(detailsUrl, authorUrl, imageUrl, commentUrl, postsUrl);

// function findIndex(url) {
//   const response = await fetch(url);
//   const results = await response.json();
//   console.log(results);

//   console.log(next);

// }

// const isLargeNumber = (element) => element > 13;

// findIndex(postsUrl);
