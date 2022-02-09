const navMenu = document.querySelector(".nav-menu");
const hamburgerMenu = document.querySelector(".hamburger");
const hamburgerBars = document.querySelector(".fa-bars");
const hamburgerX = document.querySelector(".far");

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

// hamburgerBars.addEventListener("click", function () {
//   if (navMenu.style.display === "none") {
//     navMenu.style.display = "block";

//     hamburgerBars.style.display = "none";
//     hamburgerX.style.display = "block";
//   }
// });

// hamburgerX.addEventListener("click", function () {
//   if (navMenu.style.display === "block") {
//     hamburgerBars.style.display = "none";
//     hamburgerX.style.display = "block";
//     navMenu.style.display = "block";
//   }
// });

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
