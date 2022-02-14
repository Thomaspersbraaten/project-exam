const navMenu = document.querySelector(".nav-menu");
const hamburgerMenu = document.querySelector(".hamburger");
const hamburgerBars = document.querySelector(".fa-bars");
const hamburgerX = document.querySelector(".far");
const searchField = document.querySelector("#search");
const searchForm = document.querySelector(".search-container");
const postSections = document.querySelector(".post-section");

const searchUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=100&_embed&search=";

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

async function searchFunction(url, value, container) {
  const response = await fetch(url + value);
  const results = await response.json();
  // console.log(results);
  // console.log(searchField.value);

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

    // console.log(Math.ceil(pageNumbers));

    // if (i === 4) {
    //   return;
    // } else {
    container.innerHTML += `
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

// searchForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   searchFunction(searchUrl, searchField.value);
// });
