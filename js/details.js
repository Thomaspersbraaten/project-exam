const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const detailsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?include[]=" +
  id;
const detailsContainer = document.querySelector(".details-container");
const authorUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users/";

async function something(url, urlTwo) {
  const response = await fetch(url);
  const results = await response.json();
  //   console.log(results[0].author);
  const authorId = results[0].author;

  const authorResponse = await fetch(urlTwo + authorId);
  const authorResults = await authorResponse.json();

  console.log(authorResults);

  console.log(results);
  const detailsData = results[0];
  detailsContainer.innerHTML = `
  <div>
  ${detailsData.id}
  ${authorResults.name}
  </div>`;
}

something(detailsUrl, authorUrl);
