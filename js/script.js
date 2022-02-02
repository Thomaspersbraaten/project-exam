// finne ut hvor mange classes nav button har.
document.getElementsByClassName("ClassName").length;

const postContainer = document.querySelector(".post-container");

const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=12";

const authorUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users";

// console.log(postUrl);
// async function getAuthor(url) {
//   const response = await fetch(url);
//   const results = await response.json();
//   console.log(results);
// }
// getAuthor(authorUrl);

async function something(url, urlTwo) {
  // fetch posts
  const response = await fetch(url);
  const results = await response.json();

  console.log(results);

  //  fetch author
  const userResponse = await fetch(urlTwo);
  const userResults = await userResponse.json();
  //   let userArray = [];

  //   for (let i = 0; i < userResults.length; i++) {
  //        userArray.push(userResults[i]);
  //   }

  results.forEach(function (data) {
    const authorInfo = document.querySelector(".author-info");
    postContainer.innerHTML += `
      <div>
      <h2>
      ${data.title.rendered}
      </h2>
      <div class="author-info"></div>
      <p>
      ${data.excerpt.rendered}
      </p>
      </div>
      `;
  });
}

something(postUrl, authorUrl);
