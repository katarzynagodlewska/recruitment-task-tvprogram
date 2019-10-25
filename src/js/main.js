"use strict";

const searchButton = document.querySelector('.button-search');
const resultsList = document.querySelector('.results');
const input = document.querySelector('.input-search');

searchButton.addEventListener('click', event => {
  event.preventDefault();
  var request = new XMLHttpRequest();

  let yourUrl='http://api.tvmaze.com/search/shows?q=girls';
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
        'url':resp['show']['url'],
        'name':resp['show']['name'],
        'ratingAverage':resp['show']['rating']['average'],
        'imageMedium':resp['show']['image']['medium'],
        'imageOriginal':resp['show']['image']['original']
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
  resultElementRating.innerText = results[i]['ratingAverage'];

  const resultElementImageMedium = document.createElement('img');
  resultElementImageMedium.classList.add('result-element__image-medium');
  resultElementImageMedium.innerHTML += results[i]['imageMedium'];
  
  resultElementDiv.appendChild(resultElementImageMedium);
  resultElementDiv.appendChild(resultElementRating);
  resultElementDiv.appendChild(resultElementText);
  resultsList.append(resultElementDiv);

}
};



});
