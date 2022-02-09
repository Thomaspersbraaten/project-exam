const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const detailsContainer = document.querySelector(".details-container");
const detailsHeader = document.querySelector(".details-header");
const imageContainer = document.querySelector(".details-image");
const title = document.querySelector("title");
const activePage = document.querySelector(".active-page");
const authorContainer = document.querySelector(".author-info");
const postNavigation = document.querySelector(".next-previous");
const nextPost = document.querySelector(".next-post");
const previousPost = document.querySelector(".previous-post");
const commentSection = document.querySelector(".comment-section");
const commentAmount = document.querySelector(".comment-amount");
const firstComment = document.querySelector(".be-the-first-to-comment");
const commentValue = document.querySelector("#postId");

const readerComments = document.querySelector(".reader-comments");

// API URLS
const detailsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?_embed&include[]=" +
  id;
const authorUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users/";
const commentUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/comments?post=" + id;
const postsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=100&_embed";

//

async function fetchApi(
  UrlForDetails,
  urlForAthor,
  urlForComments,
  urlForPosts
) {
  const detailsResponse = await fetch(UrlForDetails);
  const detailsResults = await detailsResponse.json();
  //   console.log(results[0].author);
  const resultsData = detailsResults[0];
  const authorId = detailsResults[0].author;

  const authorResponse = await fetch(urlForAthor + authorId);
  const authorResults = await authorResponse.json();
  console.log(authorResults);

  const commentResponse = await fetch(urlForComments);
  const commentResults = await commentResponse.json();
  console.log(commentResults);

  //
  const postsResponse = await fetch(urlForPosts);
  const postsResults = await postsResponse.json();
  console.log(postsResults);

  activePage.innerHTML = `${resultsData.title.rendered}`;

  createHtml(detailsResults, authorResults, commentResults, postsResults);
}

function createHtml(post, author, comment, allPosts) {
  // HUSK Å FIKSE MÅNED // / //  / /  /  / /
  const commentData = comment[0];
  // console.log(commentData);

  const data = post[0];
  console.log(data);
  const postImage = data._embedded["wp:featuredmedia"][0].source_url;
  console.log(postImage);
  const d = new Date(data.date);
  // console.log(d);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const date = day + "." + month + 1 + "." + year;
  // console.log(date);
  // console.log(data.content.rendered);
  // console.log(data);
  title.innerHTML = `The Environmentalist | ${data.title.rendered}`;
  detailsHeader.innerHTML = `${data.title.rendered}`;
  detailsContainer.innerHTML = `
  <img src="${postImage}">
  <div>
  ${data.content.rendered}
  </div>
`;

  // Author information

  authorContainer.innerHTML = `
  <div>
  <img src="${author.simple_local_avatar[64]}" class="author-img">
  <p> Written by ${author.name}</p>
  </div>
  <p> ${date}</p>
  `;

  // Next and previous posts

  // finds next index of posts array

  const index = allPosts.findIndex(function (post) {
    return post.id == id;
  });
  console.log(index);

  const nextIndex = index + 1;
  // find featured media image

  try {
    nextPost.innerHTML = `
    <a href="details.html?id=${allPosts[nextIndex].id}" style="text-decoration:none" class="next-container">
      <p class="next-header"> Next post:</p>   
      <div class="title-and-arrow">
        <p class="next-title">${allPosts[nextIndex].title.rendered}</p>
        <i class="fas fa-arrow-circle-right"></i> 
      </div>
    </a>
    `;
  } catch {
    nextPost.innerHTML = `
    <p class="no-more-posts"> No more posts</p>
    `;
  }

  // Finds previous index in all posts
  const previousIndex = nextIndex - 2;

  try {
    previousPost.innerHTML = `
    <a href="details.html?id=${allPosts[previousIndex].id}" style="text-decoration:none" class="previous-container">
      <p class="next-header"> Previous post:</p>   
      <div class="title-and-arrow">
        <i class="fas fa-arrow-circle-left"></i>
        <p class="next-title">  ${allPosts[previousIndex].title.rendered}</p>
      </div>
    </a>
  `;
  } catch {
    previousPost.innerHTML = `
   <p class="no-more-posts"> No more posts</p>
   `;
  }

  // Comment section
  commentAmount.innerHTML = `
  Comments(${comment.length})`;

  if (comment.length === 0) {
    firstComment.innerHTML = "Be the first to leave a comment";
  } else {
    firstComment.innerHTML = "";
  }
  comment.forEach(function (data) {
    readerComments.innerHTML += `
    <div class="user-comment-container">
    <h3>Comment by: ${data.author_name}</h3>
    <p>${data.content.rendered}</p>
    </div>`;

    // commentValue = `${data.id}`;
    // console.log(commentValue);
  });
}

fetchApi(detailsUrl, authorUrl, commentUrl, postsUrl);
