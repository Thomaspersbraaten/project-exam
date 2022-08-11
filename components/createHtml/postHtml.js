const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const postsContainer = document.querySelector(".post__posts-container");
export function createPostHtml(results) {
  const d = new Date(results.date);
  const year = d.getFullYear();
  const monthIndex = d.getMonth();
  const day = d.getDate();
  const date = day + "." + month[monthIndex] + "." + year;

  const postAuthor = results._embedded.author[0].name;

  postsContainer.innerHTML += `
                <a href="details.html?id=${results.id}" style="text-decoration:none" class="post">
                  <div>
                   <h3>
                    ${results.title.rendered}
                   </h3>
                   <div class="author-info">
                   <p>Written by ${postAuthor} </p>
                   <p>${date}</p>
                   </div>
                   <div class="post-intro">
                    ${results.excerpt.rendered}
                   </div>
                  </div>
                  <p class="link-text">Read more  <i class="fas fa-arrow-right"></i></p>
                  </a>
                  `;
}
