const postsContainer = document.querySelector(".post__posts-container");
const searchInfo = document.querySelector(".search-info");
const morePostsInfo = document.querySelector(".more-posts-info");
const loaderContainer = document.querySelector(".loader-container");

const loader = document.querySelector(".loader");
const morePostsContainer = document.querySelector(".more-posts-info");
const month = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];

const showMore = document.querySelector(".show-more-btn");
const searchField = document.querySelector("#search");
const searchForm = document.querySelector(".search-form");
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
      // createHtml(results);
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
getPosts(postUrl);

async function searchFunction(searchUrl) {
  postsContainer.innerHTML = "";
  morePostsContainer.innerHTML = "";
  searchInfo.innerHTML = "";
  loader.style.display = "block";
  showMore.style.display = "none";
  const response = await fetch(searchUrl + searchField.value);
  const results = await response.json();
  loader.style.display = "none";
  loaderContainer.style.display = "none";

  console.log(results);
  if (results.length === 0) {
    // createHtml(results);
    postsContainer.innerHTML = `<div class="search__nothing">No search results found for "${searchField.value}" </div> `;
    postsContainer.style.display = "flex";
  } else {
    postsContainer.style.display = "grid";
    searchInfo.innerHTML = `
    <h2> Showing search results for "${searchField.value}"...</h2>`;
    for (let i = 0; i < results.length; i++) {
      const d = new Date(results[i].date);
      const year = d.getFullYear();
      const monthIndex = d.getMonth();
      const day = d.getDate();
      const date = day + "." + month[monthIndex] + "." + year;
      console.log(date);

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
          <p class="link-text">Read more  <i class="fas fa-arrow-right"></i></p>
          </a>
          `;
    }
  }
}

function createHtml(results) {
  loader.style.display = "none";
  loaderContainer.style.display = "none";
  if (currentPostCount === results.length) {
    return;
  } else {
    for (let i = 0; i < 10; i++) {
      const d = new Date(results[i].date);
      const year = d.getFullYear();
      const monthIndex = d.getMonth();
      const day = d.getDate();
      const date = day + "." + month[monthIndex] + "." + year;

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
          <p class="link-text">Read more  <i class="fas fa-arrow-right"></i></p>
          </a>
          `;
      const post = document.querySelector(".post");
    }
    morePostsCount = morePostsCount + 10;

    currentPostCount = currentPostCount + 10;
  }

  console.log(currentPostCount);
  console.log(morePostsCount);
  console.log(postsContainer.childElementCount);
  console.log(results.length);

  if (postsContainer.childElementCount === results.length) {
    morePostsInfo.innerHTML = `<p>There are <b>no</b> more posts to show...</p>`;
  } else {
    morePostsInfo.innerHTML = `<p>There are more posts to show</p>`;
  }
}

function showMorePosts(results) {
  console.log(results.length);
  // Function keep showing 10 more posts.
  for (let i = currentPostCount; i <= morePostsCount; i++) {
    if (i === results.length) {
      morePostsInfo.innerHTML = `<p>There are <b>no</b> more posts to show...</p>`;
      showMore.classList.add("inactive-button");
      showMore.classList.remove("active-button");
      return;
    } else {
      const d = new Date(results[i].date);
      const year = d.getFullYear();
      const monthIndex = d.getMonth();
      const day = d.getDate();
      const date = day + "." + month[monthIndex] + "." + year;

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
          <p class="link-text">Read more  <i class="fas fa-arrow-right"></i></p>
          </a>
          `;
      }
    }
    morePostsInfo.innerHTML = `<p>There are more posts to show</p>`;
  }

  morePostsCount = morePostsCount + 10;
  currentPostCount = currentPostCount + 10;
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
