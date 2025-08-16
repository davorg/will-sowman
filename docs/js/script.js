// ---------- Config ----------
const AFFILIATE_TAG = "davblog-21"; // change or blank out if you prefer

const BOOKS = [
  {
    id: "dww",
    title: "Down With Work",
    subtitle: "From Cubicle to Coffee Shop: Redefining Work in the Modern Age",
    asin: "B0DJRYGFKM",
    cover: "images/down-with-work.png",
    blurb: "A practical guide to leaving the corporate rat race and designing flexible, fulfilling work on your own terms.",
    leanpub: null,
    newest: true
  },
  {
    id: "fctf",
    title: "From Commuting to Freedom",
    subtitle: "How to Build a Fulfilling Career on Your Own Terms",
    asin: "B0C43V25XW",
    cover: "images/from_commuting_to_freedom.png",
    blurb: "Prepare for freelancing, find clients, manage and scale your business, and avoid burnout — a complete guide to self-employment.",
    leanpub: "https://leanpub.com/fromcommutingtofreedom/"
  },
  {
    id: "pefe",
    title: "Prompt Engineering for Everyone",
    subtitle: "Unleashing the Power of AI",
    asin: "B0C46XPQ8R",
    cover: "images/prompt_engineering_for_everyone.png",
    blurb: "An accessible tour of using prompts to get reliable, useful results from AI — with examples for work and learning.",
    leanpub: "https://leanpub.com/promptengineeringforeveryone/"
  }
];

function renderBooks(){
  const grid = document.getElementById('bookGrid');
  grid.innerHTML = '';

  BOOKS.forEach(b => {
    const card = document.createElement('article');
    card.className = 'book';
    card.innerHTML = `
      <img class="cover" src="${b.cover}" alt="Cover of ${b.title}" loading="lazy" />
      ${b.newest ? '<span class="pill">Newest</span>' : ''}
      <h3>${b.title}</h3>
      <div class="subtitle">${b.subtitle}</div>
      <p class="blurb">${b.blurb}</p>

      <div class="buyrow">
        <a class="btn btn-primary"
           data-amazon-asin="${b.asin}">Buy on Amazon</a>
        ${b.leanpub ? `<a class="btn btn-secondary" target="_blank" rel="noopener" href="${b.leanpub}">Also on Leanpub</a>` : ''}
      </div>

      <details class="more-stores"><summary>More stores</summary>
        <div class="store-grid"
             data-amazon-grid
             data-amazon-asin="${b.asin}"></div>
      </details>
    `;
    grid.appendChild(card);
  });

  // Header CTA goes to newest book in the viewer's store (using the library)
  const newest   = BOOKS.find(x => x.newest) || BOOKS[0];
  const buyHeader = document.getElementById('buyNowHeader');

  if (buyHeader && newest) {
    // 1) Let the library detect the region and give us a nice label
    const region = AmazonStore.detectRegion();
    buyHeader.textContent = `Buy now: ${newest.title} on ${AmazonStore.label(region)}`;

    // 2) Give the library the data it needs; enhanceAll() will wire the click
    buyHeader.dataset.amazonAsin = newest.asin;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Build DOM first
  renderBooks();

  // after the book tiles are rendered:
  AmazonStore.enhanceAll({ tag: AFFILIATE_TAG });         // wires all buy buttons
  AmazonStore.renderStoreGridAll({ tag: AFFILIATE_TAG }); // fills any [data-amazon-grid]
});
