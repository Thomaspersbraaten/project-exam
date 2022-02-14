const tipsSection = document.querySelector(".tips-section");
const tipsUrl =
  "https://tpbro.online/The-Environmentalist/wp-json/wp/v2/posts?categories=20&per_page=100&_embed";

const month = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];

async function fetchApi(url) {
  const response = await fetch(url);
  const results = await response.json();
  console.log(results);

  for (let i = 0; i < results.length; i++) {
    const data = results[i];
    const dateCreation = new Date(data.date);
    const year = dateCreation.getFullYear();
    const monthIndex = dateCreation.getMonth();
    const day = dateCreation.getDate();
    const date = day + "." + month[monthIndex] + "." + year;
    console.log(date);
    const getAuthor = data._embedded.author;
    console.log(getAuthor);
    const getImage = getAuthor.simple_local_avatar;

    tipsSection.innerHTML += `
    <div class="tips">
    <h2> ${data.title.rendered}</h2>
     <div class="tips__content">
        <div>&bull;</div> <p> ${data.content.rendered}</p>
     </div>
    <div class="tips__author-info">
     <p> Tip by ${data._embedded.author[0].name}</p><p> ${date}</p>
    
    `;
  }
}
fetchApi(tipsUrl);

{
  /* <img src="${data._embedded.author.simple_local_avatar[32]}">  */
}
