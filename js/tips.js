import showErrorMessage from "../components/feedback/showErrorMessage.js";
import { scrollToTop, showScrollToTop } from "../components/ui/toTheTop.js";
const tipsSection = document.querySelector(".tips-section");
const loaderContainer = document.querySelector(".loader-container");
const showMore = document.querySelector(".show-more-btn");
const moreTipsInfoContainer = document.querySelector(".more-tips-info");
const tipsUrl = "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=20&per_page=100&_embed";
const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var currentPostCount = 0;
var morePostsCount = 9;

async function fetchApi(tipsUrl) {
  try {
    const response = await fetch(tipsUrl);
    const results = await response.json();

    createHtml(results);

    showMore.addEventListener("click", function () {
      showMoreTips(results);
    });
    loaderContainer.style.display = "none";
  } catch (error) {
    loaderContainer.style.display = "none";
    tipsSection.innerHTML = showErrorMessage(error);
  }
}
fetchApi(tipsUrl);

function createHtml(array) {
  if (currentPostCount === array.length) {
    return;
  } else {
    for (let i = 0; i < array.length; i++) {
      if (array.length === 10) {
        break;
      } else {
        const dateCreation = new Date(array[i].date);
        const year = dateCreation.getFullYear();
        const monthIndex = dateCreation.getMonth();
        const day = dateCreation.getDate();
        const date = day + "." + month[monthIndex] + "." + year;

        tipsSection.innerHTML += `
        <div class="tips">
          <h2 class="tips__heading"> Tip ${i + 1}: ${array[i].title.rendered}.</h2>         
          <div class="tips__main-content">${array[i].excerpt.rendered}</div>
        </div>
        <div class="tips__author-info ">
           <p> By ${array[i]._embedded.author[0].name}</p><p> ${date}</p>
        </div>
        <hr class="divider"/>
             `;
      }
    }
    morePostsCount = morePostsCount + 10;
    currentPostCount = currentPostCount + 10;
    if (array.length < 10) {
      showMore.style.display = "none";
      moreTipsInfoContainer.style.display = "block";
    } else {
      showMore.style.display = "block";
      moreTipsInfoContainer.style.display = "none";
    }
  }
}

function showMoreTips(results) {
  for (let i = currentPostCount; i <= morePostsCount; i++) {
    if (i === results.length) {
      // Hides button and displays "no more tips" when all tips are loaded
      moreTipsInfoContainer.style.display = "block";
      showMore.style.display = "none";
      return;
    } else {
      const data = results[i];
      const dateCreation = new Date(data.date);
      const year = dateCreation.getFullYear();
      const monthIndex = dateCreation.getMonth();
      const day = dateCreation.getDate();
      const date = day + "." + month[monthIndex] + "." + year;
      if (i === results.length) {
        break;
      } else {
        tipsSection.innerHTML += `
          <div class="tips">
            <h2 class="tips__heading"> Tip ${i + 1}: ${data.title.rendered}.</h2>         
            <div class="tips__main-content">${data.excerpt.rendered}</div>
          </div>
          <div class="tips__author-info ">
             <p>By ${data._embedded.author[0].name}</p><p> ${date}</p>
          </div>
          <hr class="divider"/>
            `;
      }
    }
  }
  // Ups value on variables for continous loading of posts.
  morePostsCount = morePostsCount + 10;
  currentPostCount = currentPostCount + 10;
}

const toTopButton = document.querySelector(".to-the-top");
toTopButton.addEventListener("click", scrollToTop);
document.addEventListener("scroll", showScrollToTop);
