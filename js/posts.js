const postsContainer = document.querySelector(".posts-container");
const latestPost = document.querySelector(".latest-post-container");

const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=12";

const authorUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/users/";
let getPost = [];
let getAuthors = [];

async function getPosts(url, urlTwo) {
  const response = await fetch(url);
  const results = await response.json();
  //   console.log(results);

  getPost.push(results);
  postsArray = getPost[0];
  console.log(postsArray);

  //   const authorResponse = await fetch(urlTwo );
  //   const authorResults = await authorResponse.json();
  //   console.log(authorResults);

  //   getAuthors.push(authorResults);
  //   authorArray = getAuthors[0];

  //   console.log(authorArray);
  //   const d = new Date(results[0].date);
  //   console.log(d);
  //   const year = d.getFullYear();
  //   const month = d.getMonth();
  //   const day = d.getDay();
  //   const date = day + "." + month + 1 + "." + year;
  //   console.log(date);

  latestPost.innerHTML += `
    <a href="details.html?id=${results[0].id}" style="text-decoration:none" class="latest-post">
    <div class="ribbon"> </div>
      <div>
       <h2>
        ${results[0].title.rendered}
       </h2>
       <div class="author-info">posted:</div>
       <div class="post-intro">
        ${results[0].excerpt.rendered}
       </div>
      </div>
      <p class="link-text">Read More &rightarrow;</p>
      </a>
      `;

  for (let i = 1; i < results.length; i++) {
    postsContainer.innerHTML += `
      <a href="details.html?id=${results[i].id}" style="text-decoration:none" class="post old-post">
        <div>
         <h2>
          ${results[i].title.rendered}
         </h2>
         <div class="author-info"></div>
         <div class="post-intro">
          ${results[i].excerpt.rendered}
         </div>
        </div>
        <p class="link-text">Read More &rightarrow;</p>
        </a>
        `;
    const authorContainer = document.querySelector(".author-info");

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
  }

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
}

getPosts(postUrl, authorUrl);
