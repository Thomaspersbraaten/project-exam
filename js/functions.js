const navMenu = document.querySelector(".nav-menu");
const hamburgerMenu = document.querySelector(".hamburger");
const hamburgerBars = document.querySelector(".fa-bars");
const hamburgerX = document.querySelector(".far");
hamburgerX.style.display = "none";
// Shows and hides the navigation menu on smaller screens

var navHidden = true;

// hamburgerMenu.addEventListener("click", function () {
//   if (navMenu.style.display === "none") {
//     hamburgerBars.style.display = "none";
//     hamburgerX.style.display = "block";
//     navMenu.style.display = "flex";
//   } else {
//     navMenu.style.display = "none";
//     hamburgerBars.style.display = "block";
//     hamburgerX.style.display = "none";
//   }
// });

// tryy
hamburgerMenu.addEventListener("click", function () {
  console.log(navMenu);
  if (navHidden) {
    if (window.innerWidth > 700) {
      toggleNavList(73, false, "none", "block");
    } else {
      toggleNavList(41, false, "none", "block");
    }
  } else {
    toggleNavList(-200, true, "block", "none");
  }
});

function toggleNavList(pixelValue, hiddenValue, barsValue, XValue) {
  navMenu.style.top = pixelValue + "px";
  navHidden = hiddenValue;
  hamburgerBars.style.display = barsValue;
  hamburgerX.style.display = XValue;
}
function setTransition() {
  navMenu.style.transition = "all 0.4s";
}
window.addEventListener("resize", function () {
  const windowWidth = window.innerWidth;
  if (windowWidth >= 700 && windowWidth < 1000 && navHidden === false) {
    navMenu.style.transition = "none";
    navMenu.style.top = 73 + "px";
    setTimeout(setTransition, 400);
  }
  if (windowWidth < 700 && navHidden === false) {
    navMenu.style.transition = "none";
    navMenu.style.top = 41 + "px";
    setTimeout(setTransition, 400);
  }

  //
  if (windowWidth >= 1000) {
    navMenu.style.transition = "none";
    toggleNavList(0, true);
    setTimeout(setTransition, 400);
  }
  if (navHidden === false) {
    return;
  }
  if (windowWidth < 1000) {
    navMenu.style.transition = "none";
    setTimeout(setTransition, 400);
    toggleNavList(-200, true, "block", "none");
  }
  //   if (windowWidth < 400) {
  //     toTheTopText.innerHTML = "";
  //   } else {
  //     toTheTopText.innerHTML = "Scroll to top";
  //     toTheTopText.style.width = 75 + "px";
  //   }
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

// Global form checks

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
