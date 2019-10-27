"use strict";


const searchButton = document.querySelector('.button-search');
const resultsList = document.querySelector('.results');
const input = document.querySelector('.input-search');
const defaultEmptyImg = './assets/img/image_not_found.png';
const apiKey = 'a06e429';
let pageNumber = 1;

// onScrollViewToBottom.addEventListener('click', event => {
//   pageNumber++;

//   let yourUrl="http://www.omdbapi.com/?apikey=a06e429&s=girl&page=${pageNumber}" ; 
// })

searchButton.addEventListener('click', event => {
  event.preventDefault();
  pageNumber = 1;
  var requestForBasicDetailsAboutMovies = new XMLHttpRequest();

  let urlToSearchMovieByString = `http://www.omdbapi.com/?apikey=${apiKey}&s=girl&page=${pageNumber}`;
  requestForBasicDetailsAboutMovies.open('GET', urlToSearchMovieByString, true);

  requestForBasicDetailsAboutMovies.responseType = 'json';
  requestForBasicDetailsAboutMovies.send();

var results = [];
requestForBasicDetailsAboutMovies.onload = function() {
let response=requestForBasicDetailsAboutMovies.response['Search'];

for (var i = 0; i < response.length; i++) {
  var requestForMoreDetailsAboutMovie = new XMLHttpRequest();

  let imdbID = response[i]['imdbID'];

  let urlToSearchMovieByTitleId = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
  requestForMoreDetailsAboutMovie.open('GET', urlToSearchMovieByTitleId,true);

  requestForMoreDetailsAboutMovie.responseType = 'json';
  requestForMoreDetailsAboutMovie.send();

  requestForMoreDetailsAboutMovie.onload = function() {
    console.log(imdbID);
  
    var resp = requestForMoreDetailsAboutMovie.response;
    results.push({
        'name':resp['Title'],
        'rating':resp['Ratings'][0]['Value'],
        'posterUrl':resp['Poster'],
        'releaseDate':resp['Released']
    });
  }
}
for (let i = 0; i<results.length; i++) {
  const resultElementDiv = document.createElement('div');
  resultElementDiv.classList.add('result-element');
  
  const resultElementText = document.createElement('div');
  resultElementText.classList.add('result-element__text');
  resultElementText.innerText = results[i]['name'];

  const resultElementRating = document.createElement('div');
  resultElementRating.classList.add('result-element__rating');
  resultElementRating.innerText = results[i]['rating'];

  if (results[i]['posterUrl'] == null) {
    const resultElementImageMedium = document.createElement('img');
    resultElementImageMedium.classList.add('result-element__image-medium');
    resultElementImageMedium.src = defaultEmptyImg;
    resultElementDiv.appendChild(resultElementImageMedium);
  }
  else {
  const resultElementImageMedium = document.createElement('img');
  resultElementImageMedium.classList.add('result-element__image-medium');
  resultElementImageMedium.src = results[i]['posterUrl'];
  resultElementDiv.appendChild(resultElementImageMedium);
  }

  const resultElementRelaseDate = document.createElement('div');
  resultElementRelaseDate.classList.add('result-element__ralase-date');
  resultElementRelaseDate.innerText = results[i]['releaseDate'];


  resultElementDiv.appendChild(resultElementRelaseDate);
  resultElementDiv.appendChild(resultElementRating);
  resultElementDiv.appendChild(resultElementText);
  resultsList.append(resultElementDiv);

}
};



});
