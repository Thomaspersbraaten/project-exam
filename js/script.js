// finne ut hvor mange classes nav button har.
document.getElementsByClassName("ClassName").length;

const postContainer = document.querySelector(".post-container");

const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=12";

const authorUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users";
// const authorInfo = document.querySelector(".author-info");

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
  console.log(userResults);

  // For each try

  //   results.forEach(function (data) {
  //     postContainer.innerHTML += `
  //     <a href="details.html?id=${data.id}" style="text-decoration:none">
  //       <div>
  //       <h2>
  //       ${data.title.rendered}
  //       </h2>
  //       <div class="author-info"></div>
  //       <div class="post-intro">
  //       ${data.excerpt.rendered}
  //       </div>
  //       </div>
  //       <p class="link-text">Read More</p>
  //       </a>
  //       `;
  //     const authorInfo = document.querySelector(".author-info");
  //     console.log(data.athor);
  //     console.log(data.author);
  //     if (data.author === 2) {
  //       authorInfo.innerhtml += `ok`;
  //     }
  //   });

  // for loop try

  for (let i = 0; i < results.length; i++) {
    postContainer.innerHTML += `
    <a href="details.html?id=${results[i].id}" style="text-decoration:none">
      <div>
      <h2>
      ${results[i].title.rendered}${results[i].author}
      </h2>
      <div class="author-info"></div>
      <div class="post-intro">
      ${results[i].excerpt.rendered}
      </div>
      </div>
      <p class="link-text">Read More</p>
      </a>
      `;
    console.log(userResults);

    const authorInfo = document.querySelector(".author-info");
    // if (results[i].author) {
    //   console.log(authorInfo);
    // }
  }
}

something(postUrl, authorUrl);
