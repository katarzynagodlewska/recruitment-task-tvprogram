"use strict";

const searchButton = document.querySelector('.button-search');
const resultsList = document.querySelector('.results');
const input = document.querySelector('.input-search');

searchButton.addEventListener('click', event => {
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
        'ratingAverage':resp['show']['rating']['average']
    });
}
for (let i = 0; i<results.length; i++) {
  const resultElementDiv = document.createElement('div');
  resultElementDiv.classList.add('result-element');
  
  const resultElementText = document.createElement('div');
  resultElementText.classList.add('result-element__text');
  resultElementText.innerText = results[i]['name'];

  resultElementDiv.appendChild(resultElementText);
  resultsList.append(resultElementDiv);
}
};



});
