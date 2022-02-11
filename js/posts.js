const postsContainer = document.querySelector(".posts-container");
const latestPost = document.querySelector(".latest-post-container");
const morePostsInfo = document.querySelector(".more-posts-info");
const loader = document.querySelector(".loader");
const showMore = document.querySelector(".show-more-btn");

const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=12&_embed";

async function getPosts(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    createHtml(results);
  } catch (error) {
    console.error(error);
    postsContainer.innerHTML = showErrorMessage(error);
  }
}

getPosts(postUrl);

function createHtml(results) {
  loader.style.display = "none";
  const dateCreation = new Date(results[0].date);
  const year = dateCreation.getFullYear();
  const month = dateCreation.getMonth();
  const day = dateCreation.getDate();
  const date = day + "." + month + 1 + "." + year;
  console.log(date);
  const latestPostAuthor = results[0]._embedded.author[0].name;

  // Creates the latest posts //

  latestPost.innerHTML += `
    <a href="details.html?id=${results[0].id}" style="text-decoration:none" class="latest-post">
    <div class="ribbon"> </div>
      <div>
       <h3>
        ${results[0].title.rendered}
       </h3>
       <div class="author-info">
       <p>Written by ${latestPostAuthor} </p>
       <p>${date}</p>
       </div>
       <div class="post-intro">
        ${results[0].excerpt.rendered}
       </div>
      </div>
      <p class="link-text">Read More &rightarrow;</p>
      </a>
      `;

  // creates the rest of the posts up to a total of 10 included latest posts //

  for (let i = 1; i < results.length; i++) {
    const d = new Date(results[i].date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const date = day + "." + month + 1 + "." + year;

    const postAuthor = results[i]._embedded.author[0].name;

    postsContainer.innerHTML += `
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

  if (
    postsContainer.childElementCount + latestPost.childElementCount <
    results.length
  ) {
    morePostsInfo.innerHTML = `<p>There are more posts to show</p>`;
  } else {
    morePostsInfo.innerHTML = `<p> There are no more posts to show</p>`;
  }
}

// const authorResponse = await fetch(urlTwo + results[i].author);
// const authorResults = await authorResponse.json();
// console.log(authorResults);

// for (let j = 0; j < authorContainer.length; j++) {
//   authorContainer[j].innerHTML += `
//     ${authorResults[j].name}`;
//   console.log(authorResults);
// }

// for (let j = 0; j < authorArray.length; j++) {
//   if (authorArray[j].id === results[i].author) {
//     console.log(2);
//     authorContainer.innerHTML = `${authorArray}`;
//   }
// }

// console.log(results[i].author);
// const idMatch = (value) => value === results[i].author;
// // console.log(idMatch);
// function findAuthor(author, post) {
//     return author === post.id;
// }

// const authorID = authorArray.findIndex(idMatch);
// // console.log(authorArray.findIndex(idMatch));
// // console.log(authorArray.id);
// // if (authorArray.id === authorID) {
// //   console.log("true");
// // } else {
// //   console.log("false");
// // }

// postsContainer.innerHTML += `
// <a href="details.html?id=${results[0].id}" style="text-decoration:none" class="post">
//   <div>
//    <h2>
//     ${results[0].title.rendered}
//    </h2>
//    <div class="author-info"></div>
//    <div class="post-intro">
//     ${results[0].excerpt.rendered}
//    </div>
//   </div>
//   <p class="link-text">Read More &rightarrow;</p>
//   </a>
//   `;
