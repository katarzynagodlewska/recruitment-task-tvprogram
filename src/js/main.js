"use strict";


const searchButton = document.querySelector('.button-search');
const resultsList = document.querySelector('.results');
const input = document.querySelector('.input-search');
const defaultEmptyImg = './assets/img/image_not_found.png';
const apiKey = a06e429;
let pageNumber = 1;
//'../assets/img/water-glass.svg'

onScrollViewToBottom.addEventListener('click', event => {
  pageNumber++;

  let yourUrl="http://www.omdbapi.com/?apikey=a06e429&s=girl&page=${pageNumber}" ; 
})

searchButton.addEventListener('click', event => {
  event.preventDefault();
  pageNumber = 1;
  var request = new XMLHttpRequest();

  let urlToSearchMovieByString = "http://www.omdbapi.com/?apikey=${apiKey}&s=girl&page=${pageNumber}";
  request.open('GET', urlToSearchMovieByString, true);

  let urlToSearchMovieByTitleId = 'http://www.omdbapi.com/?apikey=${apiKey}&i=tt0467200';
  request.open('GET', yourUrl,true);

  request.responseType = 'json';
request.send();

var results = [];
request.onload = function() {
let response=request.response;

for (var i = 0; i < response.length; i++)
{

    var resp = response[i];
    results.push({
        'name':resp['title'],
        'rating':resp['rating'][0]['value'],
        'posterUrl':resp['poster'],
        'releaseDate':resp['released']
    });
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
