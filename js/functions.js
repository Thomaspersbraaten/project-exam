const navMenu = document.querySelector(".nav-menu");
const hamburgerMenu = document.querySelector(".hamburger");
const hamburgerBars = document.querySelector(".fa-bars");
const hamburgerX = document.querySelector(".far");

// const searchUrl =
//   "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed&search=";

// Shows and hides the navigation menu on smaller screens
hamburgerMenu.addEventListener("click", function () {
  if (navMenu.style.display === "none") {
    hamburgerBars.style.display = "none";
    hamburgerX.style.display = "block";
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
    hamburgerBars.style.display = "block";
    hamburgerX.style.display = "none";
  }
});

// Shows error message

function showErrorMessage(error) {
  const errorHtml = `<div class="error"> 
  <p>There was an error while loading this page.</p>
  <p>
  Error type: ${error}.
  </p>
  </div>
  `;
  return errorHtml;
}

// console.log(window.innerHeight);
// if (window.innerWidth === 1000) {
//   navMenu.style.display = "flex";
// }
// const postContainer = document.querySelector(".post");
