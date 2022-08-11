const toTopButton = document.querySelector(".to-the-top");
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function showScrollToTop() {
  if (document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight) {
    if (window.innerWidth > 1500) {
      toTopButton.style.right = 25 + "%";
    } else {
      toTopButton.style.right = 5 + "%";
    }
  } else {
    toTopButton.style.right = -140 + "px";
  }
}
