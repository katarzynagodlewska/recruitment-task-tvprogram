"use strict";


const searchButton = document.querySelector('.button-search');
const resultsList = document.querySelector('.results'); //if "resultsList" this could not be a list?
const input = document.querySelector('.input-search');
const defaultEmptyImg = './assets/img/image_not_found.png';
const awardsIcon = './assets/img/icons8-the-oscars-64.png';
const apiKey = 'a06e429';
let pageNumber = 1;


searchButton.addEventListener('click', event => {
  event.preventDefault();
  pageNumber = 1;
  var requestForBasicDetailsAboutMovies = new XMLHttpRequest();

  let urlToSearchMovieByString = `http://www.omdbapi.com/?apikey=${apiKey}&s=Last-Minute&page=${pageNumber}`;
  requestForBasicDetailsAboutMovies.open('GET', urlToSearchMovieByString, true);

  requestForBasicDetailsAboutMovies.responseType = 'json';
  requestForBasicDetailsAboutMovies.send();

requestForBasicDetailsAboutMovies.onload = function() {
let response=requestForBasicDetailsAboutMovies.response['Search'];

for (var i = 0; i < response.length; i++) {

  let imdbID = response[i]['imdbID'];

    getAsync(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    .then((resp) => ({
        'name':resp['Title'],
        'rating':resp['Ratings'][0]['Value'],
        'posterUrl':resp['Poster'],
        'releaseDate':resp['Released'],
        'runtime':resp['Runtime'],
        'description':resp['Plot'],
        'awards':resp['Awards']
  }))
    .then((result) => {
      const resultElementDiv = document.createElement('div');
      resultElementDiv.classList.add('result-element');
      
      const resultElementText = document.createElement('p');
      resultElementText.classList.add('result-element__name');
      resultElementText.innerText = result['name'];
    
      const resultElementRuntime = document.createElement('p');
      resultElementRuntime.classList.add('result-element__runtime');
      resultElementRuntime.innerText = result['runtime'];

      const resultElementRating = document.createElement('p');
      resultElementRating.classList.add('result-element__rating');
      resultElementRating.innerText =`Rating ${result['rating']}`;

      const resultElementDescription = document.createElement('p');
      resultElementDescription.classList.add('result-element__descrition');
      if (result['description'].length > 100) {
        resultElementDescription.innerText = result['description'].substring(0, 100) + '...';
      }
      else {
        resultElementDescription.innerText = result['description'];
      }

      if (result['awards'] !== "N/A") {
        const resultElementAwards = document.createElement('img');
        resultElementAwards.classList.add('result-element__awards');
        resultElementAwards.src = awardsIcon;
        resultElementDiv.appendChild(resultElementAwards);
      }

      if (result['posterUrl'] == null) {
        const resultElementImageMedium = document.createElement('img');
        resultElementImageMedium.classList.add('result-element__image');
        resultElementImageMedium.src = defaultEmptyImg;
        resultElementDiv.appendChild(resultElementImageMedium);
      }
      else {
      const resultElementImageMedium = document.createElement('img');
      resultElementImageMedium.classList.add('result-element__image');
      resultElementImageMedium.src = result['posterUrl'];
      resultElementDiv.appendChild(resultElementImageMedium);
      }
    
      const resultElementRelaseDate = document.createElement('p');
      resultElementRelaseDate.classList.add('result-element__ralase-date');
      resultElementRelaseDate.innerText = result['releaseDate'];

      resultElementDiv.appendChild(resultElementDescription);
      resultElementDiv.appendChild(resultElementRuntime);
      resultElementDiv.appendChild(resultElementRelaseDate);
      resultElementDiv.appendChild(resultElementRating);
      resultElementDiv.appendChild(resultElementText);
      resultsList.append(resultElementDiv);
    
    })
  }};
});

function getAsync(url) { 
  return new Promise((resolve, reject) => { 
      var httpReq = new XMLHttpRequest(); 
      httpReq.onreadystatechange = () => { 
          if (httpReq.readyState === 4) { 
              if (httpReq.status === 200) { 
                  resolve(JSON.parse(httpReq.responseText)); 
              } else { 
                 reject(new Error(httpReq.statusText)); 
              } 
          } 
      }
      httpReq.open("GET", url, true); 
      httpReq.send(); 
  }); 
}
