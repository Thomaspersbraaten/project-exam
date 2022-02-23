// const postContainer = document.querySelector(".posts-container");
// const navigationPages = document.querySelector(".navigation-pages");
// const totalPages = document.querySelector(".total-pages");
// const nextPageButton = document.querySelector(".next-page");
// const previousPageButton = document.querySelector(".previous-page");
// const currentPageIndex = document.querySelector(".current-page-indicator");
// const loaderContainer = document.querySelector(".loader-container");

// const loader = document.querySelector(".loader");
// const postNavigation = document.querySelector(".post-navigation");
// const postHeader = document.querySelector(".post-header");
// const carouselContainer = document.querySelector(".carousel-container");
// const welcomeContainer = document.querySelector(".welcome");
// const month = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
// const postUrl =
//   "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed";
// // const postUrl =
// //   "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&_fields[]=title&_fields[]=excerpt&per_page=100&_embed";

// var pageIndex = 1;
// var arrayIndex = 0;

// async function getPosts(url) {
//   try {
//     const response = await fetch(url);
//     console.log(response);
//     const results = await response.json();

//     // creates the variable that calculates the number of pages to create
//     const posts = results.length;
//     const pageNumbers = posts / 4;
//     const calculatedPageNumbers = Math.ceil(pageNumbers);

//     // Splits the results(posts) into chunks of 4 into an array.
//     function splitResultsArray(results, splitSize) {
//       const splittedArray = [];
//       for (let i = 0; i < results.length; i += splitSize) {
//         const split = results.slice(i, i + splitSize);
//         splittedArray.push(split);
//       }
//       return splittedArray;
//     }

//     const pageArray = splitResultsArray(results, 4);

//     // creates the container for each chunk
//     for (let i = 0; i < pageNumbers; i++) {
//       postContainer.innerHTML += `
//   <div class="post-container__page-container"></div>`;
//     }

//     const containerForPage = document.querySelectorAll(
//       ".post-container__page-container"
//     );

//     // creates an array for the page containers
//     const pageContainerArray = Array.from(containerForPage);
//     pageContainerArray[0].classList.add("active-post-page");

//     createHtml(calculatedPageNumbers, pageArray, pageContainerArray);

//     // Gets the width of the page container
//     const containerWidth = pageContainerArray[0].getBoundingClientRect().width;

//     const setPagePositioning = (page, index) => {
//       page.style.left = containerWidth * index + "px";
//     };
//     pageContainerArray.forEach(setPagePositioning);

//     const moveToPage = (postContainer, currentPage, targetPage) => {
//       postContainer.style.transform =
//         "translateX(-" + targetPage.style.left + ")";
//       currentPage.classList.remove("active-post-page");
//       targetPage.classList.add("active-post-page");
//     };

//     // Previous button moves to the previous page
//     function previousPageFunction() {
//       if (pageIndex === 1) {
//         return;
//       } else {
//         const currentPage = postContainer.querySelector(".active-post-page");
//         const previousPage = currentPage.previousElementSibling;
//         pageIndex--;
//         currentPageIndex.innerHTML = pageIndex;
//         moveToPage(postContainer, currentPage, previousPage);
//       }
//     }

//     previousPageButton.addEventListener("click", previousPageFunction);

//     // Next button moves to the next page
//     nextPageButton.addEventListener("click", nextPageFunction);
//     function nextPageFunction() {
//       if (pageIndex === pageContainerArray.length) {
//         return;
//       } else {
//         const currentPage = postContainer.querySelector(".active-post-page");
//         const nextPage = currentPage.nextElementSibling;
//         pageIndex++;
//         console.log(pageIndex);
//         currentPageIndex.innerHTML = pageIndex;
//         moveToPage(postContainer, currentPage, nextPage);
//       }
//     }
//   } catch (error) {
//     loaderContainer.style.display = "none";
//     loader.style.display = "none";
//     postContainer.innerHTML = showErrorMessage(error);
//   }
// }

// getPosts(postUrl);

// function createHtml(pageNumbers, pageArray, pageContainerArray) {
//   loader.style.display = "none";
//   loaderContainer.style.display = "none";
//   currentPageIndex.innerHTML = pageIndex;

//   // creates the posts inside the page(post) containers
//   for (let i = 0; i < pageContainerArray.length; i++) {
//     for (let j = 0; j < pageArray[i].length; j++) {
//       const data = pageArray[i][j];
//       const dateCreation = new Date(data.date);
//       const year = dateCreation.getFullYear();
//       const monthIndex = dateCreation.getMonth();
//       const day = dateCreation.getDate();
//       const date = day + "." + month[monthIndex] + "." + year;

//       pageContainerArray[i].innerHTML += `
//        <a href="details.html?id=${pageArray[i][j].id}" style="text-decoration:none" class="post">
//          <div>
//           <h3>
//            ${pageArray[i][j].title.rendered}
//          </h3>
//           <div class="author-info">
//           <p>Written by ${pageArray[i][j]._embedded.author[0].name} </p>
//          <p>${date}</p>
//           </div>
//           <div class="post-intro">
//            ${pageArray[i][j].excerpt.rendered}
//           </div>
//          </div>

//          <p class="link-text">Read more  <i class="fas fa-arrow-right"></i></p>

//          </a>
//          `;
//     }
//   }
//   totalPages.innerHTML = `${pageNumbers}`;
// }

const postContainer = document.querySelector(".posts-container");
const navigationPages = document.querySelector(".navigation-pages");
const totalPages = document.querySelector(".total-pages");
const nextPageButton = document.querySelector(".next-page");
const previousPageButton = document.querySelector(".previous-page");
const currentPageIndex = document.querySelector(".current-page-indicator");
const loaderContainer = document.querySelector(".loader-container");

const loader = document.querySelector(".loader");
const postNavigation = document.querySelector(".post-navigation");
const postHeader = document.querySelector(".post-header");
const carouselContainer = document.querySelector(".carousel-container");
const welcomeContainer = document.querySelector(".welcome");
const month = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&per_page=100&_embed";
const newUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=19&_fields[]=title&_fields[]=excerpt&per_page=100&_embed";

var pageIndex = 1;
var arrayIndex = 0;

async function getPosts(url, urlTwo) {
  try {
    const response = await fetch(url);
    console.log(response);
    const results = await response.json();

    const responseTwo = await fetch(urlTwo);

    const resultsTwo = await responseTwo.json();
    // console.log(resultsTwo);

    // const tryone = results[0].content.rendered;
    // console.log(tryone);
    // const trytwo = tryone.outerHTMl;
    // console.log(trytwo);
    // const trydata = { html: trytwo };
    // const jason = JSON.stringify(tryone);
    // console.log(jason);

    // creates the variable that calculates the number of pages to create
    const posts = results.length;
    const pageNumbers = posts / 4;
    const calculatedPageNumbers = Math.ceil(pageNumbers);

    // Splits the results(posts) into chunks of 4 into an array.
    function splitResultsArray(results, splitSize) {
      const splittedArray = [];
      for (let i = 0; i < results.length; i += splitSize) {
        const split = results.slice(i, i + splitSize);
        splittedArray.push(split);
      }
      return splittedArray;
    }

    const pageArray = splitResultsArray(results, 4);

    // creates the container for each chunk
    for (let i = 0; i < pageNumbers; i++) {
      postContainer.innerHTML += `
  <div class="post-container__page-container"></div>`;
    }

    const containerForPage = document.querySelectorAll(
      ".post-container__page-container"
    );

    // creates an array for the page containers
    const pageContainerArray = Array.from(containerForPage);
    pageContainerArray[0].classList.add("active-post-page");

    createHtml(calculatedPageNumbers, pageArray, pageContainerArray);

    // Gets the width of the page container
    const containerWidth = pageContainerArray[0].getBoundingClientRect().width;

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
    function previousPageFunction() {
      if (pageIndex === 1) {
        return;
      } else {
        const currentPage = postContainer.querySelector(".active-post-page");
        const previousPage = currentPage.previousElementSibling;
        pageIndex--;
        currentPageIndex.innerHTML = pageIndex;
        moveToPage(postContainer, currentPage, previousPage);
      }
    }

    previousPageButton.addEventListener("click", previousPageFunction);

    // Next button moves to the next page
    nextPageButton.addEventListener("click", nextPageFunction);
    function nextPageFunction() {
      if (pageIndex === pageContainerArray.length) {
        return;
      } else {
        const currentPage = postContainer.querySelector(".active-post-page");
        const nextPage = currentPage.nextElementSibling;
        pageIndex++;
        console.log(pageIndex);
        currentPageIndex.innerHTML = pageIndex;
        moveToPage(postContainer, currentPage, nextPage);
      }
    }
  } catch (error) {
    loaderContainer.style.display = "none";
    loader.style.display = "none";
    postContainer.innerHTML = showErrorMessage(error);
  }
}

getPosts(postUrl, newUrl);

function createHtml(pageNumbers, pageArray, pageContainerArray) {
  loader.style.display = "none";
  loaderContainer.style.display = "none";
  currentPageIndex.innerHTML = pageIndex;

  // creates the posts inside the page(post) containers
  for (let i = 0; i < pageContainerArray.length; i++) {
    for (let j = 0; j < pageArray[i].length; j++) {
      const data = pageArray[i][j];
      const dateCreation = new Date(data.date);
      const year = dateCreation.getFullYear();
      const monthIndex = dateCreation.getMonth();
      const day = dateCreation.getDate();
      const date = day + "." + month[monthIndex] + "." + year;

      pageContainerArray[i].innerHTML += `
       <a href="details.html?id=${pageArray[i][j].id}" style="text-decoration:none" class="post">
         <div>
          <h3>
           ${pageArray[i][j].title.rendered}
         </h3>
          <div class="author-info">
          <p>Written by ${pageArray[i][j]._embedded.author[0].name} </p>
         <p>${date}</p>
          </div>
          <div class="post-intro">
          ${pageArray[i][j].excerpt.rendered}
          </div>
         </div>
       
         <p class="link-text">Read more  <i class="fas fa-arrow-right"></i></p>
         
  
         </a>
         `;
    }
  }
  totalPages.innerHTML = `${pageNumbers}`;
}
