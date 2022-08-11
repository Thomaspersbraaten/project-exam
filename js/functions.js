const navMenu = document.querySelector(".nav-menu");
const ham = document.querySelector(".ham-container");
// Shows and hides the navigation menu on smaller screens

let navHidden = true;

ham.addEventListener("click", function () {
  if (navHidden) {
    if (window.innerWidth > 700) {
      toggleNavList(72, false, "none", "block");
    } else {
      toggleNavList(44, false, "none", "block");
    }
  } else {
    toggleNavList(-140, true, "block", "none");
  }
});
const hamburgerContainer = document.querySelector(".ham-container");
const lineOne = document.querySelector(".ham-line-one");
const lineTwo = document.querySelector(".ham-line-two");
const lineThree = document.querySelector(".ham-line-three");
const lineFour = document.querySelector(".ham-line-four");

hamburgerContainer.addEventListener("click", toggleMenu);

function toggleMenu() {
  lineOne.classList.toggle("opacity-two");
  lineFour.classList.toggle("opacity-two");
  //
  lineTwo.classList.toggle("rotate-two");
  lineThree.classList.toggle("rotate-three");
}

function toggleNavList(pixelValue, hiddenValue) {
  navMenu.style.top = pixelValue + "px";
  navHidden = hiddenValue;
}
function setTransition() {
  navMenu.style.transition = "all 0.4s";
}
window.addEventListener("resize", function () {
  const windowWidth = window.innerWidth;
  if (windowWidth >= 700 && windowWidth < 1000 && navHidden === false) {
    navMenu.style.transition = "none";
    navMenu.style.top = 72 + "px";
    setTimeout(setTransition, 400);
  }
  if (windowWidth < 700 && navHidden === false) {
    navMenu.style.transition = "none";
    navMenu.style.top = 44 + "px";
    setTimeout(setTransition, 400);
  }

  //
  if (windowWidth >= 1000) {
    navMenu.style.transition = "none";
    toggleNavList(0, true);
    setTimeout(setTransition, 400);
    ham.style.display = "none";

    if (lineTwo.className === "ham-line-two ham-line rotate-two" && lineThree.className === "ham-line-three ham-line rotate-three") {
      // lineTwo.classList.toggle("rotate-two");

      // lineThree.classList.toggle("rotate-three");
      toggleMenu();
      // console.log("yes");
    }
  }
  if (navHidden === false) {
    return;
  }
  if (windowWidth < 1000) {
    ham.style.display = "flex";
    navMenu.style.transition = "none";
    setTimeout(setTransition, 400);
    toggleNavList(-200, true, "block", "none");

    //
  }
  //   if (windowWidth < 400) {
  //     toTheTopText.innerHTML = "";
  //   } else {
  //     toTheTopText.innerHTML = "Scroll to top";
  //     toTheTopText.style.width = 75 + "px";
  //   }
});
const windowWidth = window.innerWidth;
if (windowWidth >= 1000) {
  ham.style.display = "none";
} else {
  ham.style.display = "flex";
}
