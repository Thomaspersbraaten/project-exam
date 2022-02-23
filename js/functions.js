const navMenu = document.querySelector(".nav-menu");
const hamburgerMenu = document.querySelector(".hamburger");
const hamburgerBars = document.querySelector(".fa-bars");
const hamburgerX = document.querySelector(".far");
const toTopButton = document.querySelector(".to-the-top");

// const searchUrl =
//   "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed&search=";

// Shows and hides the navigation menu on smaller screens

hamburgerMenu.addEventListener("click", function () {
  if (navMenu.style.display === "none") {
    hamburgerBars.style.display = "none";
    hamburgerX.style.display = "block";
    navMenu.style.display = "flex";
    const navMenuHeight = navMenu.getBoundingClientRect().height;
    console.log(navMenuHeight);
  } else {
    navMenu.style.display = "none";
    hamburgerBars.style.display = "block";
    hamburgerX.style.display = "none";
  }
});

// navMenu.style.display = "flex";
// // navMenu.style.top = -180 + "px";
// const navMenuHeight = navMenu.getBoundingClientRect().height;
// console.log(navMenuHeight);
// // function previousPageFunction() {
// //   moveNavMenu(navMenu);
// // }

// const moveNavMenuDown = () => {
//   hamburgerBars.style.display = "none";
//   hamburgerX.style.display = "block";
//   navMenu.style.transform = "translateY(+" + 281 + "px" + ")";
// };

// const moveNavMenuUp = () => {
//   hamburgerBars.style.display = "block";
//   hamburgerX.style.display = "none";
//   navMenu.style.transform = "translateY(-" + 241 + "px" + ")";
// };

// hamburgerBars.addEventListener("click", moveNavMenuDown);

// hamburgerX.addEventListener("click", moveNavMenuUp);

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

toTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// document.onscroll = function () {
//   if (
//     document.documentElement.scrollTop + window.innerHeight ==
//     document.documentElement.scrollHeight
//   ) {
//     if (window.innerWidth > 2000) {
//       toTopButton.style.right = 500 + "px";
//     } else {
//       toTopButton.style.right = 20 + "px";
//     }
//   } else {
//     toTopButton.style.right = -140 + "px";
//   }
// };
// };
document.addEventListener("scroll", function () {
  if (
    document.documentElement.scrollTop + window.innerHeight ==
    document.documentElement.scrollHeight
  ) {
    if (window.innerWidth > 2000) {
      toTopButton.style.right = 500 + "px";
    } else {
      toTopButton.style.right = 20 + "px";
    }
  } else {
    toTopButton.style.right = -140 + "px";
  }
});
