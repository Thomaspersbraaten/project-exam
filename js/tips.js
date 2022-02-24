const tipsSection = document.querySelector(".tips-section");
const loaderContainer = document.querySelector(".loader-container");

const tipsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=20&per_page=100&_embed";

const month = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];

async function fetchApi(tipsUrl) {
  try {
    const response = await fetch(tipsUrl);
    const results = await response.json();
    console.log(results);
    loaderContainer.style.display = "none";

    for (let i = 0; i < results.length; i++) {
      const data = results[i];
      const dateCreation = new Date(data.date);
      const year = dateCreation.getFullYear();
      const monthIndex = dateCreation.getMonth();
      const day = dateCreation.getDate();
      const date = day + "." + month[monthIndex] + "." + year;

      // on the last tip, no divider but a paragraph showing that there are no more posts
      if (i === results.length - 1) {
        tipsSection.innerHTML += `
        <div class="tips">
        <h2 class="tips__heading"> ${results.length} - ${data.title.rendered}</h2>
        <div class="tips__content">
           
            <div class="tips__main-content">${data.excerpt.rendered}</div>
        </div>
    </div>
    <div class="tips__author-info ">
     <p> Tip by ${data._embedded.author[0].name}</p><p> ${date}</p>
     </div>
     <p class="last-container">No more tips</p>
  
           
      
          
          `;
      }
      // Creates tips with divider
      else {
        tipsSection.innerHTML += `
          <div class="tips">
              <h2 class="tips__heading"> ${i + 1} - ${data.title.rendered}</h2>
              <div class="tips__content">
                  <div class="tips__bullet"></div> 
                  <div class="tips__main-content">${data.excerpt.rendered}</div>
              </div>
          </div>
          <div class="tips__author-info">
           <p> Tip by ${data._embedded.author[0].name}</p><p> ${date}</p>
           </div>
           <hr class="divider" />
           
      
          
          `;
      }
    }
  } catch (error) {
    loaderContainer.style.display = "none";
    tipsSection.innerHTML = showErrorMessage(error);
  }
}
fetchApi(tipsUrl);

const toTopButton = document.querySelector(".to-the-top");
toTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("scroll", function () {
  if (
    document.documentElement.scrollTop + window.innerHeight ==
    document.documentElement.scrollHeight
  ) {
    if (window.innerWidth > 1800) {
      toTopButton.style.right = 5 + "%";
    } else {
      toTopButton.style.right = 20 + "px";
    }
  } else {
    toTopButton.style.right = -140 + "px";
  }
});
