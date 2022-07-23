const ANTHONY_API = "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"

/**
 * it fetch the data from ANTHONY_API
 * @return a Promise of an array with the data of posts
 * @throws error if somthing in the request goes wrong
 */
async function fetchData(url) {
  try {
    const res = await fetch(url);
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

/**
 * it render the list of card fetched insede the div.content
 */
async function renderCard() {
  const cards = await fetchData(ANTHONY_API);
  if (cards && cards.length > 0) {
    let toRender = "";
    const headerTitle = [cards[0]["_embedded"]["wp:term"][2][0].name, cards[1]["_embedded"]["wp:term"][3][1].name, cards[2]["_embedded"]["wp:term"][1][0].name]
    cards.forEach((card, i) => {
      let element = ""
      switch (i % 3) {
        case 0: element = `<div class="row row__content">${designCard(card, headerTitle[i])}`; break;
        case 1: element = designCard(card, headerTitle[i]); break;
        case 2: element = `${designCard(card, headerTitle[i])}</div>`; break
      }
      element = (i === cards.length - 1 && i % 3 !== 2) ? element + "</div>" : element;
      toRender += element
    });
    document.querySelector(".content").innerHTML = toRender
  }
}

/**
 * it design a single card
 * @param {Object} card 
 * @param {string} headerTitle 
 * @returns a string that contain the design of a single card
 */
function designCard(card, headerTitle) {
  let d = new Date(card.date)
  d = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return `
  <div class="col-4 u-equal-height">
    <div class="p-card--highlighted">
      <p>${headerTitle.toUpperCase()}</p>
      <hr class ="u-sv1">
      <div class="p-card__inner">
        <div class="p-card__content">
          <a href="${card.link}">
            <img class="p-card__image" src="${card.featured_media}" alt=""/>
          </a>
          <h3><a href="${card.link}">${card.title.rendered}</a></h3>
          <i class="u-sv1">By <a href="${card["_embedded"]["author"][0]["link"]}">${card["_embedded"]["author"][0]["name"]}</a> ${d}</i>
        </div>
      </div>
      <footer>
        <hr class ="u-sv1">
        <p>Article</p>
      </footer>
    </div>
  </div>
  `;
}

renderCard();