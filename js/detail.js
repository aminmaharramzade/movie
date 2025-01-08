document.addEventListener("DOMContentLoaded", function () {
  const imdbID = localStorage.getItem("selectedMovieID");
  if (imdbID) {
    let apiKey = "fc1fef96";
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((movie) => {
        if (movie.Response === "True") {
          document.querySelector("#filmTitle").textContent = movie.Title;
          document.querySelector(".detail-img img").src = movie.Poster;
          document.querySelector(
            ".detail-head h2"
          ).textContent = `IMDb: ${movie.imdbRating}`;
          document.querySelector("#filmYear").textContent = movie.Year;
          document.querySelector(".detail-head p").textContent = movie.Plot;
        }
      });
  }
});
