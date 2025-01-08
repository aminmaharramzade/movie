const input = document.querySelector(`#input`);
const btn = document.querySelector(`#btn`);
const imgCard = document.querySelector(`#imgCard`);
const popularText = document.querySelector(`#popularText`);

//* api and details
function findMovie(title) {
  let apiKey = "fc1fef96";
  let promise = fetch(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
  promise
    .then((response) => response.json())
    .then((data) => {
      data.Search.forEach((obj) => {
        console.log(obj);
      });
      if (data.Response === "True") {
        popularText.textContent = `Results for: ${title}`;
        imgCard.style.width = "auto";
        imgCard.innerHTML = "";
        data.Search.forEach((movie) => {
          const row = `
          <div class="famous-card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <a href="#" id="watchBtn" class="famous-btn" data-imdbid="${movie.imdbID}">Watch Now</a>
          </div>
          `;
          imgCard.innerHTML += row;
        });
        document.querySelectorAll("#watchBtn").forEach((button) => {
          button.addEventListener("click", function () {
            const imdbID = this.getAttribute("data-imdbid");
            localStorage.setItem("selectedMovieID", imdbID);
            location.href = "./pages/details.html";
          });
        });
      } else {
        popularText.textContent = `No results found for: ${title}`;
        imgCard.innerHTML = "";
        imgCard.style.height = "684px";
        imgCard.style.width = "944px";

        const fan = `
        <img src="./images/notfound.png" alt="">
        `;
        imgCard.innerHTML = fan;
      }
    });
}

//* click search
btn.addEventListener("click", function () {
  findMovie(input.value);
  input.value = "";
});

//* enter  search
document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    console.clear();
    findMovie(input.value);
    input.value = "";
  }
});



