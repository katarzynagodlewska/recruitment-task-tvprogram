"use strict";


const searchButton = document.querySelector('.button-search');
const resultsList = document.querySelector('.results'); 
const defaultEmptyImg = './assets/img/image_not_found.png';
const awardsIcon = './assets/img/icons8-the-oscars-64.png';
const apiKey = 'a06e429';
const emptyResultValue = 'No %v to display';
let pageNumber = 1;


searchButton.addEventListener('click', event => {
  event.preventDefault();
  const input = document.querySelector('.input-search');
  pageNumber = 1;
  // czyszczenie diva
  var requestForBasicDetailsAboutMovies = new XMLHttpRequest();

  let urlToSearchMovieByString = `http://www.omdbapi.com/?apikey=${apiKey}&s=${input['value']}&page=${pageNumber}`;
  requestForBasicDetailsAboutMovies.open('GET', urlToSearchMovieByString, true);

  requestForBasicDetailsAboutMovies.responseType = 'json';
  requestForBasicDetailsAboutMovies.send();

requestForBasicDetailsAboutMovies.onload = function() {
let response=requestForBasicDetailsAboutMovies.response['Search'];
if(typeof response === 'undefined' || response.length==0){
  const resultElementDiv = document.createElement('div');
  resultElementDiv.classList.add('result-element');
  resultElementDiv.innerText="There no elemnts";
  resultsList.append(resultElementDiv);
}
else{
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

      if (result['awards'] !== "N/A") {
        const resultElementAwards = document.createElement('img');
        resultElementAwards.classList.add('result-element__awards');
        resultElementAwards.src = awardsIcon;
        resultElementDiv.appendChild(resultElementAwards);
      }

      const resultElementName = createResultElement('p', 'result-element__name', result['name'], emptyResultValue.replace('%v', 'title'));
      const resultElementRuntime = createResultElement('p', 'result-element__runtime', result['runtime'], emptyResultValue.replace('%v', 'runtime'));
      const resultElementRating = createResultElement('p','result-element__rating',`Rating ${result['rating']}`, emptyResultValue.replace('%v', 'rating'));
      const resultElementDescription = createResultElement('p','result-element__description',
    (result['description'].length > 100) ?
        result['description'].substring(0, 100) + '...'
     :
         result['description']
      , emptyResultValue.replace('%v', 'description'));
      const resultElementRelaseDate = createResultElement('p', 'result-element__relase-date', result['releaseDate'], emptyResultValue.replace('%v', 'released date'));

      const resultElementImageMedium = createImgResultElement('result-element__image',result['posterUrl']);


      resultElementDiv.appendChild(resultElementImageMedium);
      resultElementDiv.appendChild(resultElementDescription);
      resultElementDiv.appendChild(resultElementRuntime);
      resultElementDiv.appendChild(resultElementRelaseDate);
      resultElementDiv.appendChild(resultElementRating);
      resultElementDiv.appendChild(resultElementName);
      resultsList.append(resultElementDiv);
    
    })
  }}};
});

function createResultElement(tagName, elementClass, apiValue, descriptionForEmptyValue){
  const resultElement = document.createElement(tagName);
  resultElement.classList.add(elementClass);
  if (apiValue !== "N/A") {
    resultElement.innerText = apiValue;
  }
  else {
    resultElement.innerText = descriptionForEmptyValue;
  }
  return resultElement;
}

function createImgResultElement(elementClass, apiValue){
  const resultElement = document.createElement('img');
  resultElement.classList.add(elementClass);
  if (apiValue !== "N/A") {
    resultElement.src = apiValue;
  }
  else{
    resultElement.src = defaultEmptyImg;
  }
  return resultElement;
}

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
