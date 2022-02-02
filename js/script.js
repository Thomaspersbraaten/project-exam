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
  //   console.log(results);
  //   console.log(results[0].author);
  results.forEach(function (event) {
    postContainer.innerHTML += `
      <div>
      <h2>
      ${event.title.rendered}
      </h2>
      <div class="author-info"></div>
      ${event.content.rendered}
      </div>
      `;
  });
  const authorInfo = document.querySelector(".author-info");

  //  fetch author
  const userResponse = await fetch(urlTwo);
  const userResults = await userResponse.json();
  let avatarArray = [];

  for (let i = 0; i < userResults.length; i++) {
    console.log(userResults[i]);

    // authorInfo.innerHTML = `<img src="${test}">`;
    // const authorImg = userResults[i].simple_local_avatar[96];
    //     if (results[i].author === 2) {
    //     }
    //     if (results[i].author === 3) {
    //     }
    //     if (results[i].author === 4) {
    //     }
  }

  //   for (let i = 0; i < results.length; i++) {
  //     const authorInfo = document.querySelector(".author-info");
  //     console.log(authorInfo);
  //     if (results.author === i) {
  //       authorInfo.innerHTML = `
  //      ${userResults[i].name}`;
  //     }
  //   }
}

something(postUrl, authorUrl);
