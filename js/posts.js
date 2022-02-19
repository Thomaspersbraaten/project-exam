const postsContainer = document.querySelector(".post__posts-container");
const searchInfo = document.querySelector(".search-info");
const morePostsInfo = document.querySelector(".more-posts-info");
const loader = document.querySelector(".loader");
const morePostsContainer = document.querySelector(".more-posts-info");

const showMore = document.querySelector(".show-more-btn");
const searchField = document.querySelector("#search");
const searchForm = document.querySelector(".search-container");
const searchUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed&search=";

const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed";

var currentPostCount = 0;
var morePostsCount = 9;

async function getPosts(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    createHtml(results);
    showMore.addEventListener("click", function () {
      showMorePosts(results);
    });
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      searchFunction(searchUrl);
    });
  } catch (error) {
    console.error(error);
    postsContainer.innerHTML = showErrorMessage(error);
  }
}

async function searchFunction(searchUrl) {
  postsContainer.innerHTML = "";
  morePostsContainer.innerHTML = "";
  loader.style.display = "block";
  showMore.style.display = "none";
  const response = await fetch(searchUrl + searchField.value);
  const results = await response.json();
  loader.style.display = "none";
  searchInfo.innerHTML = `
  <h2> Showing search results for "${searchField.value}"...</h2>`;

  console.log(results);
  for (let i = 0; i < results.length; i++) {
    const d = new Date(results[i].date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const date = day + "." + month + 1 + "." + year;

    const postAuthor = results[i]._embedded.author[0].name;

    postsContainer.innerHTML += `
      <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post">
        <div>
         <h3>
          ${results[i].title.rendered}
         </h3>
         <div class="author-info">
         <p>Written by ${postAuthor} </p>
         <p>${date}</p>
         </div>
         <div class="post-intro">
          ${results[i].excerpt.rendered}
         </div>
        </div>
        <p class="link-text">Read More &rightarrow;</p>
        </a>
        `;
    // createHtml(results);
  }
}

getPosts(postUrl);

function createHtml(results) {
  loader.style.display = "none";
  // const dateCreation = new Date(results[0].date);
  // const year = dateCreation.getFullYear();
  // const month = dateCreation.getMonth();
  // const day = dateCreation.getDate();
  // const date = day + "." + month + 1 + "." + year;
  // console.log(date);

  for (let i = currentPostCount; i <= morePostsCount; i++) {
    const d = new Date(results[i].date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const date = day + "." + month + 1 + "." + year;

    const postAuthor = results[i]._embedded.author[0].name;

    postsContainer.innerHTML += `
      <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post">
        <div>
         <h3>
          ${results[i].title.rendered}
         </h3>
         <div class="author-info">
         <p>Written by ${postAuthor} </p>
         <p>${date}</p>
         </div>
         <div class="post-intro">
          ${results[i].excerpt.rendered}
         </div>
        </div>
        <p class="link-text">Read More &rightarrow;</p>
        </a>
        `;
    const post = document.querySelector(".post");

    // console.log(currentPostCount);
  }

  currentPostCount = currentPostCount + 10;
  morePostsCount = morePostsCount + 10;
  // console.log(currentPostCount);
  // console.log(postsContainer.childElementCount);
  // console.log(results.length);
  // console.log(latestPost.childElementCount);

  if (postsContainer.childElementCount === results.length) {
    morePostsInfo.innerHTML = `<p>There are no more posts to show...</p>`;
  } else {
    morePostsInfo.innerHTML = `<p>There are more posts to show</p>`;
  }
}

function showMorePosts(results) {
  if (postsContainer.childElementCount === results.length) {
    return;
  } else {
    for (let i = currentPostCount; i < results.length; i++) {
      const d = new Date(results[i].date);
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      const date = day + "." + month + 1 + "." + year;

      const postAuthor = results[i]._embedded.author[0].name;
      if (i === results.length) {
        break;
      } else {
        postsContainer.innerHTML += `
        <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post">
          <div>
           <h3>
            ${results[i].title.rendered}
           </h3>
           <div class="author-info">
           <p>Written by ${postAuthor} </p>
           <p>${date}</p>
           </div>
           <div class="post-intro">
            ${results[i].excerpt.rendered}
           </div>
          </div>
          <p class="link-text">Click to read more</p>
          </a>
          `;
      }
    }
  }
  if (postsContainer.childElementCount === results.length) {
    morePostsInfo.innerHTML = `<p>There are no more posts to show...</p>`;
    showMore.classList.add("inactive-button");
    showMore.classList.remove("active-button");
  } else {
    morePostsInfo.innerHTML = `<p>There are more posts to show</p>`;
  }
}
