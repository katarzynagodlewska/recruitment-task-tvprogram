"use strict";


const searchButton = document.querySelector('.button-search');
const resultsList = document.querySelector('.results');
const input = document.querySelector('.input-search');
const defaultEmptyImg = './assets/img/image_not_found.png';
const apiKey = 'a06e429';
let pageNumber = 1;


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

    getAsync(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    .then((resp)=>{
    return {
        'name':resp['Title'],
        'rating':resp['Ratings'][0]['Value'],
        'posterUrl':resp['Poster'],
        'releaseDate':resp['Released']
    }
  })
    .then((result)=> {
      const resultElementDiv = document.createElement('div');
      resultElementDiv.classList.add('result-element');
      
      const resultElementText = document.createElement('div');
      resultElementText.classList.add('result-element__text');
      resultElementText.innerText = result['name'];
    
      const resultElementRating = document.createElement('div');
      resultElementRating.classList.add('result-element__rating');
      resultElementRating.innerText = result['rating'];
    
      if (result['posterUrl'] == null) {
        const resultElementImageMedium = document.createElement('img');
        resultElementImageMedium.classList.add('result-element__image-medium');
        resultElementImageMedium.src = defaultEmptyImg;
        resultElementDiv.appendChild(resultElementImageMedium);
      }
      else {
      const resultElementImageMedium = document.createElement('img');
      resultElementImageMedium.classList.add('result-element__image-medium');
      resultElementImageMedium.src = result['posterUrl'];
      resultElementDiv.appendChild(resultElementImageMedium);
      }
    
      const resultElementRelaseDate = document.createElement('div');
      resultElementRelaseDate.classList.add('result-element__ralase-date');
      resultElementRelaseDate.innerText = result['releaseDate'];
    
    
      resultElementDiv.appendChild(resultElementRelaseDate);
      resultElementDiv.appendChild(resultElementRating);
      resultElementDiv.appendChild(resultElementText);
      resultsList.append(resultElementDiv);
    
    })
}

};
},);


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
