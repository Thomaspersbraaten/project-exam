const postContainer = document.querySelector(".posts-container");
const navigationPages = document.querySelector(".navigation-pages");
const totalPages = document.querySelector(".total-pages");

const postUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?per_page=12&_embed";

async function getPosts(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    createHtml(results);
  } catch (error) {
    postContainer.innerHTML = showErrorMessage(error);
  }
}

getPosts(postUrl);

function createHtml(results) {
  for (let i = 0; i < results.length; i++) {
    const postAuthor = results[i]._embedded.author[0].name;
    const data = results[i];
    const dateCreation = new Date(data.date);
    const year = dateCreation.getFullYear();
    const month = dateCreation.getMonth();
    const day = dateCreation.getDate();
    const date = day + "." + month + 1 + "." + year;
    const posts = results.length;
    const pageNumbers = posts / 4;
    const calculatedPageNumbers = Math.ceil(pageNumbers);
    totalPages.innerHTML = `${calculatedPageNumbers}`;

    console.log(Math.ceil(pageNumbers));
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
  }
}

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

// postContainer.innerHTML += `
// <a href="details.html?id=${results[i].id}" style="text-decoration:none">
//   <div>
//   <h2>
//   ${results[i].title.rendered}
//   </h2>
//   <div class="author-info">
//   <p>${author.name}</p>
//   <p>${date} </p></div>
//   <div class="post-intro">
//   ${results[i].excerpt.rendered}
//   </div>
//   </div>
//   <p class="link-text">Read More</p>
//   </a>
