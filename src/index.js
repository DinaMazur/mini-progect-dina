const form = document.getElementById("search-form")
const list = document.querySelector(".list")
const searchInput = document.querySelector(".search-input")
const loadMoreButton = document.querySelector(".loadmore")

function searchActivate(data) {
    console.log(data)
    const elements = data.hits.map(element => {
        const html = `
        <li class="photo-card">
  <img class="image" src="${element.largeImageURL}" alt="image" />
  <div class="stats">
    <p class="stats-item">
      <i class="material-icons">Likes:</i>
      ${element.likes}
    </p>
    <p class="stats-item">
      <i class="material-icons">Views:</i>
      ${element.views}
    </p>
    <p class="stats-item">
      <i class="material-icons">Comments:</i>
      ${element.comments}
    </p>
    <p class="stats-item">
      <i class="material-icons">Downloads:</i>
      ${element.downloads}
    </p>
  </div>
</li>
`
        return html
    })
    const string = elements.join(``)
    list.insertAdjacentHTML("beforeend", string)
}

let cards = 12;
let page = 1;

const getAPI = async (page, cards) => {
    const selectOrder = document.getElementById("select-order").value;
    try {
        return await fetch(`https://pixabay.com/api/?key=51425063-e87401854758e3e3468b7b002&q=${searchInput.value}&per_page=${cards}&page=${page}&order=${selectOrder}&image_type=photo`)
    } catch (error) {
        return console.log(error)
    }

}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    loadMoreButton.classList.add("displayblock");
    getAPI(page, cards).then((result) => result.json()).then((resultdata) => searchActivate(resultdata))
})

loadMoreButton.addEventListener("click", (event) => {
    page++
    console.log(page, cards)
    getAPI(page, cards).then((result) => result.json()).then((resultdata) => searchActivate(resultdata))
})