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
const searchButton = document.querySelector(".search-button");

const searchUrl = "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed&search=";
const postUrl = "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed";

var currentPostCount = 0;
var morePostsCount = 9;

// async function getPosts(url) {
//   try {
//     const response = await fetch(url);
//     const results = await response.json();
//     console.log(results);
//     createHtml(results);
//     showMore.addEventListener("click", function () {
//       showMorePosts(results);
//     });
//   }
//   catch (error) {
//     loaderContainer.style.display = "none";
//     postsContainer.innerHTML = showErrorMessage(error);
//     postsContainer.style.display = "flex";
//     showMore.style.display = "none";
//   }
// }


async function getPosts(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    // console.log(results);
    // const postsboi = Array.from(results)
    // return postsboi;
    createHtml(results);
    showMore.addEventListener("click", function () {
      showMorePosts(results);
    });
  }
  catch (error) {
    loaderContainer.style.display = "none";
    postsContainer.innerHTML = showErrorMessage(error);
    postsContainer.style.display = "flex";
    showMore.style.display = "none";
  }
}

// console.log(getPosts(postUrl)); 
// const posts = getPosts(postUrl);
// console.log(posts);
// // console.log(postsboi);
// createHtml(posts)

getPosts(postUrl);

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
      }
      morePostsCount = morePostsCount + 10;
      currentPostCount = currentPostCount + 10;
    }
    if (postsContainer.childElementCount === results.length) {
      morePostsInfo.innerHTML = `<p>There are <b>no</b> more posts to show...</p>`;
    } 
}

function showMorePosts(results) {
   // Function keep showing 10 more posts.
  for (let i = currentPostCount; i <= morePostsCount; i++) {
    if (i === results.length) {
      morePostsInfo.style.display = "block";
      // showMore.classList.add("inactive-button");
      // showMore.classList.remove("active-button");
      showMore.style.display = "none";
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
            <h3>${results[i].title.rendered}</h3>
            <div class="author-info">
              <p>Written by ${postAuthor} </p>
              <p>${date}</p>
            </div>
            <div class="post-intro">${results[i].excerpt.rendered}</div>
          </div>
          <p class="link-text">Read more  <i class="fas fa-arrow-right"></i></p>
        </a>
          `;
      }
    }
  }
  // Ups value on variables for continous loading of posts.
  morePostsCount = morePostsCount + 10;
  currentPostCount = currentPostCount + 10;
}

// Search functions
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchFunction(searchUrl);
});

async function searchFunction(searchUrl) {
  // Clear page and show loader
  postsContainer.innerHTML = "";
  morePostsContainer.innerHTML = "";
  searchInfo.innerHTML = "";
  showMore.style.display = "none";
  loaderContainer.style.display = "block";
  loader.style.display = "block"
  try {   
    // get results, hide loader and create page
      const response = await fetch(searchUrl + searchField.value);
      const results = await response.json();
      loader.style.display = "none";
      loaderContainer.style.display = "none";
      if (results.length === 0) {
        postsContainer.innerHTML = `<div class="search__nothing">No search results found for "${searchField.value}" </div> `;
        postsContainer.style.display = "flex";
      } else {
        postsContainer.style.display = "grid";
        searchInfo.innerHTML = `<h2> Showing search results for "${searchField.value}"...</h2>`;
        for (let i = 0; i < results.length; i++) {
          const d = new Date(results[i].date);
          const year = d.getFullYear();
          const monthIndex = d.getMonth();
          const day = d.getDate();
          const date = day + "." + month[monthIndex] + "." + year;    
          const postAuthor = results[i]._embedded.author[0].name;
          postsContainer.innerHTML += `
            <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post">
              <div>
                <h3>${results[i].title.rendered}</h3>
                <div class="author-info">
                  <p>Written by ${postAuthor} </p>
                  <p>${date}</p>
                </div>
                <div class="post-intro">${results[i].excerpt.rendered}</div>
              </div>
              <p class="link-text">Read more  <i class="fas fa-arrow-right"></i></p>
            </a>
              `;
        }
      }
  }
  catch (error) {
    loader.style.display = "none";
    loaderContainer.style.display = "none";
    postsContainer.innerHTML = showErrorMessage();
  }
}

// Scroll to to top functions
const toTopButton = document.querySelector(".to-the-top");
toTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("scroll", function () {
  if (
    document.documentElement.scrollTop + window.innerHeight ==
    document.documentElement.scrollHeight
  ) {
    if (window.innerWidth > 1500) {
      toTopButton.style.right = 25 + "%";
    } else {
      toTopButton.style.right = 5 + "%";
    }
  } 
    else {
    toTopButton.style.right = -140 + "px";
  }
});
