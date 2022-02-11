const postContainer = document.querySelector(".posts-container");
const navigationPages = document.querySelector(".navigation-pages");
const totalPages = document.querySelector(".total-pages");
const nextPageButton = document.querySelector(".next-page");
const previousPageButton = document.querySelector(".previous-page");
const currentPage = document.querySelector(".current-page");
const loader = document.querySelector(".loader");

const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=12&_embed";
var pageIndex = 1;
var pageValue = 3;

var minimumPostValue = 0;
var maximumPostValue = 3;

async function getPosts(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    createHtml(results, 0);
    nextPageButton.addEventListener("click", function () {
      nextPage(results);
    });
    previousPageButton.addEventListener("click", function () {
      previousPage(results);
    });
  } catch (error) {
    postContainer.innerHTML = showErrorMessage(error);
  }
}

getPosts(postUrl);

function createHtml(results, value) {
  loader.style.display = "none";
  currentPage.innerHTML = pageIndex;
  for (let i = value; i < results.length; i++) {
    const postAuthor = results[i]._embedded.author[0].name;
    const data = results[i];

    // Creates the date of the post
    const dateCreation = new Date(data.date);
    const year = dateCreation.getFullYear();
    const month = dateCreation.getMonth();
    const day = dateCreation.getDate();
    const date = day + "." + month + 1 + "." + year;
    //

    const posts = results.length;
    const pageNumbers = posts / 4;
    const calculatedPageNumbers = Math.ceil(pageNumbers);
    totalPages.innerHTML = `${calculatedPageNumbers}`;

    // console.log(Math.ceil(pageNumbers));
    if (i === 4) {
      return;
    } else {
      postContainer.innerHTML += `
      <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post">
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

    // pageValue++;
  }
}

function nextPage(results) {
  const posts = results.length;
  const pageNumbers = posts / 4;
  const calculatedPageNumbers = Math.ceil(pageNumbers);

  if (pageIndex === calculatedPageNumbers) {
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
        postContainer.innerHTML += `
        <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post">
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
    pageValue = pageValue + 4;
    // console.log(pageValue);
  }
}

function previousPage(results) {
  pageValue = pageValue - 4;
  if (pageIndex === 1) {
    return;
  } else {
    pageIndex = pageIndex - 1;
    currentPage.innerHTML = pageIndex;
    postContainer.innerHTML = "";
    console.log(pageValue);

    for (let i = pageValue; i < results.length; i--) {
      const data = results[i];
      const postAuthor = results[i]._embedded.author[0].name;
      console.log(i);

      // Creates the date of the post
      const dateCreation = new Date(data.date);
      const year = dateCreation.getFullYear();
      const month = dateCreation.getMonth();
      const day = dateCreation.getDate();
      const date = day + "." + month + 1 + "." + year;
      //
      if (pageValue === pageValue - 4) {
        break;
      } else {
        postContainer.innerHTML = `
        <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post">
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
    pageValue = pageValue - 4;
    console.log(pageValue);
  }
}
