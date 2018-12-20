'use strict';

const inputSelector = document.querySelector('.main__searcher-input');
const btnSelector = document.querySelector('.main__searcher-btn');
const listSelector = document.querySelector('.main__results-list');
const resultsSelector = document.querySelector('.main__results-number');
let li = '';

let favorites;
if (localStorage.getItem('favorites')) {
  favorites = JSON.parse(localStorage.getItem('favorites'));
} else {
  favorites = [];
}

function searchIt(){
  listSelector.innerHTML = '';
  fetch(`http://api.tvmaze.com/search/shows?q=${inputSelector.value}`)
    .then(function(response){

      return response.json();

    })
    .then(function(data){

      if(data.length === 0){
        const message = `<div class="error-message">
          <p>
          No hemos encontrado ningún resultado para tu búsqueda 😭, pero aquí tienes un unicornio 🦄 !!
          </p>
          </div>`;
        listSelector.innerHTML = message;
      } else {
        for(let i=0; i<data.length; i++){

          const serie = data[i].show;
          const serieTitle = serie.name;
          const serieLink = serie.url;
          const days = serie.schedule.days;
          let serieDays = '';

          for (let i=0; i<days.length; i++){
            serieDays += `<li class="days">${days[i]}</li>`;
          }
          console.log(serieDays);
          let serieScore = '';

          if (serie.rating.average === null){
            serieScore = 'not rated';
          } else {
            serieScore = serie.rating.average;
          }

          const serieScorePercent = (serieScore*10);

          let serieImage = '';

          if (serie.image) {
            serieImage = serie.image.medium;
          } else {
            serieImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
          }

          resultsSelector.innerHTML = `${data.length}`;

          li = document.createElement('li');
          const liContent = `
            <div class="list-element" id="${serieTitle}">
              <i class="favorite-btn fas fa-star-half"></i>
              <a class="list-link" href="${serieLink}">
                <img class ="list-element-image" src="${serieImage}" alt="cartel promocional de ${serieTitle}">
                <h2 class="list-element-title">${serieTitle}</h2>
                <ul class="days-list">${serieDays}</ul>
              </a>
              <div class="list-element-score">
                <div class="score-bar-container">
                  <div class="score-bar"></div>
                </div>
                <p class="score-number">${serieScore}</p>
              </div>
            </div>`;
          li.innerHTML = liContent;
          listSelector.appendChild(li);
          if(serieScore === 'not rated'){
            li.querySelector('.score-bar').style.width = '0%';
          }else{
            li.querySelector('.score-bar').style.width = `${serieScorePercent}%`;
          }

          favoriteClick(li, serieTitle);

        }
      }

    })
    .catch(error => console.log(`¡Upsi! Ha sucedido un error: ${error}`));

}

function favoriteClick(li, serieTitle){

  const divSerie = li.querySelector('.list-element');
  const favIcon = li.querySelector('.favorite-btn');

  for (let j=0; j<favorites.length; j++){

    if(favorites[j].includes(serieTitle)){
      divSerie.classList.add('favorite-element');
    }

  }

  favIcon.addEventListener('click', favoriteIt);

}

function favoriteIt(){

  const favElement = this.parentElement;
  favElement.classList.toggle('favorite-element');
  if (favElement.classList.contains('favorite-element') && !favorites.includes(favElement.id)){
    favorites.push(favElement.id);
  } else {
    favorites.splice(favorites.indexOf(favElement.id), 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));

}

btnSelector.addEventListener('click', searchIt);
inputSelector.addEventListener('keyup', function(e){

  if(e.keyCode === 13){
    searchIt();
  }

});

function hiddenResults(){
  listSelector.classList.add('hidden');
}

resultsSelector.addEventListener('click', hiddenResults);
