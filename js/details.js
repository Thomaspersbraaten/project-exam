const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const detailsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?include[]=" +
  id;
const detailsContainer = document.querySelector(".details-container");
const detailsHeader = document.querySelector(".details-header");
const imageContainer = document.querySelector(".details-image");

const authorUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users/";
const imageUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/media?parent=" + id;

const activePage = document.querySelector(".active-page");
const authorContainer = document.querySelector(".author-info");
const postNavigation = document.querySelector(".next-previous");
const nextPost = document.querySelector(".next-post");
const previousPost = document.querySelector(".previous-post");
const commentSection = document.querySelector(".comment-section");

async function something(url, urlTwo, urlThree) {
  const response = await fetch(url);
  const results = await response.json();
  //   console.log(results[0].author);
  const resultsData = results[0];
  const authorId = results[0].author;

  const authorResponse = await fetch(urlTwo + authorId);
  const authorResults = await authorResponse.json();
  console.log(authorResults);

  const imageResponse = await fetch(urlThree);
  const imageResults = await imageResponse.json();
  console.log(imageResults);

  // console.log(authorResults);
  activePage.innerHTML = `${resultsData.title.rendered}`;

  // console.log(results);
  createHtml(results, authorResults);
  // const detailsData = results[0];
  // detailsContainer.innerHTML = `
  // <div>
  // ${detailsData.id}
  // ${authorResults.name}
  // </div>`;
}

function createHtml(post, author) {
  // HUSK Å FIKSE MÅNED // / //  / /  /  / /

  const data = post[0];
  const d = new Date(data.date);
  console.log(d);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const date = day + "." + month + 1 + "." + year;
  console.log(date);
  // console.log(data.content.rendered);
  console.log(data);
  detailsHeader.innerHTML = `${data.title.rendered}`;
  detailsContainer.innerHTML = `<img src="${data.content.rendered}`;
  detailsContainer.firstElementChild.style.display = "none";

  authorContainer.innerHTML = `
  <div>
  <img src="${author.simple_local_avatar[64]}">
  <p> Written by ${author.name}</p>
  </div>
  <p> ${date}</p>
  `;

  nextPost.innerHTML = `
  <p> Next post: </p>
  <div><i class="fas fa-arrow-circle-right"></i> </div>

  `;

  previousPost.innerHTML = `
  <div><i class="fas fa-arrow-circle-left"></i> </div>
  <p> Previous post: </p>
  `;
}

something(detailsUrl, authorUrl, imageUrl);
