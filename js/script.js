const postContainer = document.querySelector(".posts-container");
const navigationPages = document.querySelector(".navigation-pages");
const totalPages = document.querySelector(".total-pages");
const nextPageButton = document.querySelector(".next-page");
const previousPageButton = document.querySelector(".previous-page");
const currentPageIndex = document.querySelector(".current-page-indicator");
const loader = document.querySelector(".loader");
const postNavigation = document.querySelector(".post-navigation");
const postHeader = document.querySelector(".post-header");
const carouselContainer = document.querySelector(".carousel-container");

const month = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
console.log(month);

const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed";
var pageIndex = 1;
var pageValue = 3;

var minimumPostValue = 0;
var maximumPostValue = 3;

var testValue = 0;

async function getPosts(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    const posts = results.length;
    const pageNumbers = posts / 4;
    const calculatedPageNumbers = Math.ceil(pageNumbers);
    function splitResultsArray(results, splitSize) {
      const splittedArray = [];
      for (let i = 0; i < results.length; i += splitSize) {
        const split = results.slice(i, i + splitSize);
        splittedArray.push(split);
      }
      return splittedArray;
    }

    const pageArray = splitResultsArray(results, 4);
    for (let i = 0; i < pageNumbers; i++) {
      postContainer.innerHTML += `
  <div class="post-container__page-container"></div>`;
    }

    const containerForPage = document.querySelectorAll(
      ".post-container__page-container"
    );

    const pageContainerArray = Array.from(containerForPage);
    pageContainerArray[0].classList.add("active-post-page");

    console.log(pageArray);
    console.log(calculatedPageNumbers);
    console.log(pageContainerArray);

    createHtml(results, calculatedPageNumbers, pageArray, pageContainerArray);
    const containerWidth = pageContainerArray[0].getBoundingClientRect().width;
    console.log(containerWidth);
    // arrange pages
    // for (let i = 0; i < pageContainerArray.length; i++) {
    //   pageContainerArray[i].style.left = containerWidth * i + "px";
    // }
    const setPagePositioning = (page, index) => {
      page.style.left = containerWidth * index + "px";
    };
    pageContainerArray.forEach(setPagePositioning);

    const moveToPage = (postContainer, currentPage, targetPage) => {
      postContainer.style.transform =
        "translateX(-" + targetPage.style.left + ")";
      currentPage.classList.remove("active-post-page");
      targetPage.classList.add("active-post-page");
    };
    // Previous button moves to the previous page
    previousPageButton.addEventListener("click", (e) => {
      if (pageIndex === 1) {
        return;
      } else {
        const currentPage = postContainer.querySelector(".active-post-page");
        const previousPage = currentPage.previousElementSibling;
        pageIndex--;
        currentPageIndex.innerHTML = pageIndex;
        moveToPage(postContainer, currentPage, previousPage);
      }
    });

    // Next button moves to the next page
    nextPageButton.addEventListener("click", (e) => {
      const currentPage = postContainer.querySelector(".active-post-page");
      console.log(currentPage);
      const nextPage = currentPage.nextElementSibling;
      console.log(nextPage);
      const amountToMove = nextPage.style.left;
      console.log(amountToMove);
      // move to the next page
      pageIndex++;
      currentPageIndex.innerHTML = pageIndex;
      moveToPage(postContainer, currentPage, nextPage);
      // postContainer.style.transform = "translateX(-" + amountToMove + ")";
      // currentPage.classList.remove("active-post-page");
      // nextPage.classList.add("active-post-page");
    });
  } catch (error) {
    postContainer.innerHTML = showErrorMessage(error);
  }
}

getPosts(postUrl);

function createHtml(results, pageNumbers, pageArray, pageContainerArray) {
  loader.style.display = "none";
  currentPageIndex.innerHTML = pageIndex;

  //   for (let i = 0; i < pageNumbers; i++) {
  //     postContainer.innerHTML += `
  // <div class="post-container__page-container"></div>`;
  //   }

  //   const containerForPage = document.querySelectorAll(
  //     ".post-container__page-container"
  //   );

  //   const pageContainerArray = Array.from(containerForPage);
  //   // console.log(pageContainerArray);

  //   // Creates a new array from the results and places four posts in each index
  //   function splitResultsArray(results, splitSize) {
  //     const splittedArray = [];
  //     for (let i = 0; i < results.length; i += splitSize) {
  //       const split = results.slice(i, i + splitSize);
  //       splittedArray.push(split);
  //     }
  //     return splittedArray;
  //   }

  //   const pageArray = splitResultsArray(results, 4);
  // console.log(pageArray);

  // containerForPage.forEach((element) => {
  //   console.log(testValue);
  //   for (let i = 0; i < pageArray.length; i++) {
  //     console.log(pageArray[testValue][i].id);

  //     containerForPage.innerHTML += `
  //     ${pageArray[testValue][i].id}`;
  //   }
  //   testValue++;
  //   console.log(testValue);
  // });
  // Creates the date of the post

  for (let i = 0; i < pageContainerArray.length; i++) {
    // console.log(testValue);
    for (let j = 0; j < pageArray[i].length; j++) {
      const data = pageArray[testValue][j];
      const dateCreation = new Date(data.date);
      const year = dateCreation.getFullYear();
      const monthIndex = dateCreation.getMonth();

      console.log(monthIndex);
      const day = dateCreation.getDate();

      const date = day + "." + month[monthIndex] + "." + year;
      // console.log(pageArray[testValue][j].id);
      pageContainerArray[testValue].innerHTML += `
       <a href="details.html?id=${pageArray[testValue][j].id}" style="text-decoration:none" class="post old-post">
         <div>
          <h3>
           ${pageArray[testValue][j].title.rendered}
         </h3>
          <div class="author-info">
          <p>Written by ${pageArray[testValue][j]._embedded.author[0].name} </p>
         <p>${date}</p>
          </div>
          <div class="post-intro">
           ${pageArray[testValue][j].excerpt.rendered}
          </div>
         </div>
         <p class="link-text">Read More &rightarrow;</p>
         </a>
         `;
    }

    testValue++;
  }
  // for (let i = 0; i < results.length; i++) {
  //   const postAuthor = results[i]._embedded.author[0].name;
  //   const data = results[i];

  //   // Creates the date of the post
  //   const dateCreation = new Date(data.date);
  //   const year = dateCreation.getFullYear();
  //   const month = dateCreation.getMonth();
  //   const day = dateCreation.getDate();
  //   const date = day + "." + month + 1 + "." + year;

  totalPages.innerHTML = `${pageNumbers}`;
  // }
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchFunction(searchUrl, searchField.value, carouselContainer);
});
