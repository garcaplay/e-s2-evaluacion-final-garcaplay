'use strict';

const inputSelector = document.querySelector('.main__searcher-input');
const btnSelector = document.querySelector('.main__searcher-btn');
const listSelector = document.querySelector('.main__results-list');
let li = '';

let favorites;
if (localStorage.getItem('favorites')) {
  favorites = JSON.parse(localStorage.getItem('favorites'));
} else {
  favorites = [];
}

//BUSCADOR
//Al hacer clic sobre el botón de 'Buscar'
//recogemos el texto del campo de búsqueda y lo metemos a la url de la API
//nos conectamos al API http://api.tvmaze.com/search/shows?q=${BLABLABLA};

function searchIt(){
  listSelector.innerHTML = '';
  fetch(`http://api.tvmaze.com/search/shows?q=${inputSelector.value}`)
    .then(function(response){

      return response.json();

    })
    .then(function(data){
      if(data.length === 0){
        console.log('no hay nada');
        const message = `<div class="error-message">
          No hemos encontrado ningún resultado para tu búsqueda :(
          </div>`;
        listSelector.innerHTML = message;
      } else {
        for(let i=0; i<data.length; i++){
          const serie = data[i].show;
          const serieTitle = serie.name;
          const serieLink = serie.url;
          let serieImage = '';
          if (serie.image) {
            serieImage = serie.image.medium;
          } else {
            serieImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
          }

          li = document.createElement('li');
          const liContent = `<div class="list-element" id="${serieTitle}">
            <i class="favorite-btn fas fa-star-half"></i>
            <a class="list-link" href="${serieLink}">
            <img class ="list-element-image" src="${serieImage}" alt="cartel promocional de ${serieTitle}">
            <h2 class="list-element-title">${serieTitle}</h2>
            </a>
            </div>`;
          li.innerHTML = liContent;
          listSelector.appendChild(li);

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
  //metemos al key 'favorites' el valor favorites (tras stringifyearlo)
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

btnSelector.addEventListener('click', searchIt);
inputSelector.addEventListener('keyup', function(e){
  if(e.keyCode === 13){
    searchIt();
  }
});
