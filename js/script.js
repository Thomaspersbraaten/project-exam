const postContainer = document.querySelector(".posts-container");
const navigationPages = document.querySelector(".navigation-pages");
const totalPages = document.querySelector(".total-pages");
const nextPageButton = document.querySelector(".next-page");
const previousPageButton = document.querySelector(".previous-page");
const currentPageIndex = document.querySelector(".current-page-indicator");
const loader = document.querySelector(".loader");
const postNavigation = document.querySelector(".post-navigation");
const postHeader = document.querySelector(".post-header");

const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=12&_embed";
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
        const nextPage = currentPage.previousElementSibling;
        pageIndex--;
        currentPageIndex.innerHTML = pageIndex;
        moveToPage(postContainer, currentPage, nextPage);
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
    // nextPageButton.addEventListener("click", function () {
    //   nextPage(results, calculatedPageNumbers);
    // });
    // previousPageButton.addEventListener("click", function () {
    //   previousPage(results, calculatedPageNumbers);
    // });
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
    for (let j = 0; j < 4; j++) {
      const data = pageArray[testValue][j];
      const dateCreation = new Date(data.date);
      const year = dateCreation.getFullYear();
      const month = dateCreation.getMonth();
      const day = dateCreation.getDate();
      const date = day + "." + month + 1 + "." + year;
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

  for (let i = 0; i < results.length; i++) {
    const postAuthor = results[i]._embedded.author[0].name;
    const data = results[i];

    // Creates the date of the post
    const dateCreation = new Date(data.date);
    const year = dateCreation.getFullYear();
    const month = dateCreation.getMonth();
    const day = dateCreation.getDate();
    const date = day + "." + month + 1 + "." + year;

    // const posts = results.length;
    // const pageNumbers = posts / 4;
    // const calculatedPageNumbers = Math.ceil(pageNumbers);
    totalPages.innerHTML = `${pageNumbers}`;

    // console.log(Math.ceil(pageNumbers));
    // Creates the container for each page. this is calculated by the number of posts

    // if (i === 4) {
    //   return;
    // } else {
    //   postContainer.innerHTML += `
    // <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post">
    //   <div>
    //    <h3>
    //     ${results[i].title.rendered}
    //    </h3>
    //    <div class="author-info">
    //    <p>Written by ${postAuthor} </p>
    //    <p>${date}</p>
    //    </div>
    //    <div class="post-intro">
    //     ${results[i].excerpt.rendered}
    //    </div>
    //   </div>
    //   <p class="link-text">Read More &rightarrow;</p>
    //   </a>
    //   `;
    // }
  }
}

function nextPage(results, pageNumbers) {
  // const posts = results.length;
  // const pageNumbers = posts / 4;
  // const calculatedPageNumbers = Math.ceil(pageNumbers);

  if (pageIndex === pageNumbers || testValue === results.length) {
    return;
  } else {
    pageIndex = pageIndex + 1;
    currentPage.innerHTML = pageIndex;
    postContainer.innerHTML = "";
    pageValue = pageValue + 1;

    for (let i = pageValue; i < results.length; i++) {
      const data = results[i];
      const postAuthor = results[i]._embedded.author[0].name;

      // Creates the date of the post
      const dateCreation = new Date(data.date);
      const year = dateCreation.getFullYear();
      const month = dateCreation.getMonth();
      const day = dateCreation.getDate();
      const date = day + "." + month + 1 + "." + year;
      //

      if (i === pageValue + 4) {
        break;
      } else {
        testValue++;
        console.log(testValue);
        postContainer.innerHTML += `
        <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post show">
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
          <p class="link-text">Read More &rightarrow;</p>
          </a> 
          `;
      }
    }

    pageValue = pageValue + 3;
    console.log(pageValue);
    // console.log(pageIndex);
  }
}

function previousPage(results, pageNumbers) {
  if (pageIndex === 1) {
    return;
  } else {
    pageValue = pageValue - 8;
    postContainer.innerHTML = "";
    console.log(pageValue);
    pageIndex = pageIndex - 1;
    // console.log(pageIndex);
    currentPage.innerHTML = pageIndex;
    for (let i = pageValue; i < results.length; i++) {
      const data = results[i];
      const postAuthor = results[i]._embedded.author[0].name;

      // Creates the date of the post
      const dateCreation = new Date(data.date);
      const year = dateCreation.getFullYear();
      const month = dateCreation.getMonth();
      const day = dateCreation.getDate();
      const date = day + "." + month + 1 + "." + year;
      //

      if (i === pageValue + 4) {
        break;
      } else {
        postContainer.innerHTML += `
        <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post show">
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
          <p class="link-text">Read More &rightarrow;</p>
          </a>
          `;
      }
    }
  }

  // const postContainer = document.querySelector(".posts-container");

  // async function searchFunction(url) {
  //   const response = await fetch(url + searchField.value);
  //   const results = await response.json();
  //   console.log(results);
  //   console.log(searchField.value);
  //   postContainer.innerHTML = "";
  //   postNavigation.innerHTML = "";
  //   postHeader.innerHTML = `
  //   Showing search results for ${searchField.value}...`;

  //   // for (let i = 0; i < results.length; i++) {
  //   //   const postAuthor = results[i]._embedded.author[0].name;
  //   //   const data = results[i];

  //   //   // Creates the date of the post
  //   //   const dateCreation = new Date(data.date);
  //   //   const year = dateCreation.getFullYear();
  //   //   const month = dateCreation.getMonth();
  //   //   const day = dateCreation.getDate();
  //   //   const date = day + "." + month + 1 + "." + year;

  //   //   // const posts = results.length;
  //   //   // const pageNumbers = posts / 4;
  //   //   // const calculatedPageNumbers = Math.ceil(pageNumbers);

  //   //   // console.log(Math.ceil(pageNumbers));

  //   //   // if (i === 4) {
  //   //   //   return;
  //   //   // } else {
  //   //   postContainer.innerHTML += `
  //   //   <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post">
  //   //     <div>
  //   //      <h3>
  //   //       ${results[i].title.rendered}
  //   //      </h3>
  //   //      <div class="author-info">
  //   //      <p>Written by ${postAuthor} </p>
  //   //      <p>${date}</p>
  //   //      </div>
  //   //      <div class="post-intro">
  //   //       ${results[i].excerpt.rendered}
  //   //      </div>
  //   //     </div>
  //   //     <p class="link-text">Read More &rightarrow;</p>
  //   //     </a>
  //   //     `;
  //   // }
  // }

  // searchForm.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   searchFunction(searchUrl, searchField.value);
  // });

  // if (pageIndex <= pageNumbers) {
  //   return;
  // } else {
  //   pageIndex = pageIndex - 1;
  //   currentPage.innerHTML = pageIndex;
  //   postContainer.innerHTML = "";
  //   pageValue = pageValue - 1;

  //   for (let i = pageValue; i < results.length; i++) {
  //     const data = results[i];
  //     const postAuthor = results[i]._embedded.author[0].name;

  //     // Creates the date of the post
  //     const dateCreation = new Date(data.date);
  //     const year = dateCreation.getFullYear();
  //     const month = dateCreation.getMonth();
  //     const day = dateCreation.getDate();
  //     const date = day + "." + month + 1 + "." + year;
  //     //

  //     if (i === pageValue + 4) {
  //       break;
  //     } else {
  //       postContainer.innerHTML += `
  //       <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post show">
  //         <div>
  //          <h3>
  //           ${results[i].title.rendered}
  //          </h3>
  //          <div class="author-info">
  //          <p>Written by ${postAuthor} </p>
  //          <p>${date}</p>
  //          </div>
  //          <div class="post-intro">
  //           ${results[i].excerpt.rendered}
  //          </div>
  //         </div>
  //         <p class="link-text">Read More &rightarrow;</p>
  //         </a>
  //         `;
  //     }
  //   }

  // }
}
const yosha = Array.from(postContainer.children);
console.log(postContainer.children);

// const nextPageButton = document.querySelector(".next-page");
// const previousPageButton = document.querySelector(".previous-page");
// function previousPage(results) {
//   pageValue = pageValue - 4;
//   if (pageIndex === 1) {
//     return;
//   } else {
//     pageIndex = pageIndex - 1;
//     currentPage.innerHTML = pageIndex;
//     postContainer.innerHTML = "";
//     console.log(pageValue);

//     for (let i = pageValue; i < results.length; i++) {
//       const data = results[i];
//       const postAuthor = results[i]._embedded.author[0].name;

//       // Creates the date of the post
//       const dateCreation = new Date(data.date);
//       const year = dateCreation.getFullYear();
//       const month = dateCreation.getMonth();
//       const day = dateCreation.getDate();
//       const date = day + "." + month + 1 + "." + year;
//       //
//       if (pageValue === pageValue - 4) {
//         break;
//       } else {
//         postContainer.innerHTML = `
//         <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post">
//           <div>
//            <h3>
//             ${results[i].title.rendered}
//            </h3>
//            <div class="author-info">
//            <p>Written by ${postAuthor} </p>
//            <p>${date}</p>
//            </div>
//            <div class="post-intro">
//             ${results[i].excerpt.rendered}
//            </div>
//           </div>
//           <p class="link-text">Read More &rightarrow;</p>
//           </a>
//           `;
//       }
//     }

//     console.log(pageValue);
//   }
// }

// Creates the container for each page. this is calculated by the number of posts
// for (let i = 0; i < pageNumbers; i++) {
//   postContainer.innerHTML += `
//   <div class="post-container__page-container"></div>`;
// }

// const containerForPage = document.querySelectorAll(
//   ".post-container__page-container"
// );

// const pageContainerArray = Array.from(containerForPage);
// console.log(pageContainerArray);

// Creates a new array from the results and places four posts in each index
// function splitResultsArray(results, splitSize) {
//   const splittedArray = [];
//   for (let i = 0; i < results.length; i += splitSize) {
//     const split = results.slice(i, i + splitSize);
//     splittedArray.push(split);
//   }
//   return splittedArray;
// }

// const pageArray = splitResultsArray(results, 4);
// console.log(pageArray);

// // pageArray.forEach((element) => {
// //   for (let i = 0; i < 4; i++) {
// //     for (let j = 0; j < containerForPage.length; j++) {
// //       containerForPage[j].innerHTML += `
// //       <div> ${pageArray[zeroValue][i].id}</div>`;
// //     }

// //     console.log(pageArray[zeroValue][i].id);
// //   }
// //   zeroValue++;
// // });

// // for (let i = 0; i < pageArray[0].length; i++) {
// //   pageContainerArray[0].innerHTML += `
// //   <div> ${pageArray[0][0].id} </div>`;
//  }
