let movieNameRef = document.querySelector("#movie-name")
let searchBtn = document.querySelector("#search")
let result = document.querySelector(".result")
let key = "7f9a3b82";



const getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // If the user doesn't enter any movie or just simply click search without entering value
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    } else {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                displayData(data)
            })
    }
}

function displayData(data) {
    if (data.Response == "True") {
        result.innerHTML = `
        <div class="info">
        <img src=${data.Poster} class="poster">
        <div>
            <h2 class="white">${data.Title}</h2>
            <div class="rating">
                <img src="star-icon.svg">
                <h4 style="color: white">${data.imdbRating}</h4>
            </div>
            <div class="details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
            </div>
            <div class="genre">
                <div>${data.Genre.split(",").join("</div><div>")}</div>
            </div>
        </div>
    </div>
    <h3 class="white">Plot:</h3>
    <p >${data.Plot}</p>
    <h3 class="white">Cast:</h3>
    <p>${data.Actors}</p>
        `
    } else {
        result.innerHTML = `<h1 class="msg">${data.Error}</h1>`;
    }
} 
searchBtn.addEventListener("click", e => getMovie())