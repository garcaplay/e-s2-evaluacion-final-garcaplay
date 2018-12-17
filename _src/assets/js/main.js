'use strict';

const inputSelector = document.querySelector('.main__searcher-input');
const btnSelector = document.querySelector('.main__searcher-btn');
const listSelector = document.querySelector('.main__results-list');
let li = '';

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

        //Intento de crear mensaje si la búsqueda no da resultado
        if(data.length === 0){
          console.log('no hay nada');
          const message = `<div class="error-message">
            No hemos encontrado ningún resultado para ${inputSelector.value} :(
            </div>`;
          listSelector.appendChild(message);
        }
        //

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

        //BUSCAR LA FORMA DE SACAR FUERA DESDE AQUI
        const divSerie = li.querySelector('.list-element');
        const favIcon = li.querySelector('.favorite-btn');
        let arrayFavorites = JSON.parse(localStorage.getItem('favorites'));

        //intento de hacer lo de localstorage que no funciona

        if (arrayFavorites.length>0) {
          for (let j=0; j<arrayFavorites.length; j++){
            if(arrayFavorites[j].includes(serieTitle)){
              divSerie.classList.add('favorite-element');
            }
          }
        }

        favIcon.addEventListener('click', favoriteIt);
        //HASTA AQUI

      }

    })
    .catch(error => console.log(`¡Upsi! Ha sucedido un error: ${error}`));

}

//En https://www.taniarascia.com/how-to-use-local-storage-with-javascript/ recomiendan hacer este if statement si queremos que se guarde la info de localStorage se mantenga a pesar de cerrar o recargar la página, si pusiéramos let favorites = [] --> siempre empezaríamos con un array vacío en lugar de comprobar si esa info existe ya
let favorites;
if (localStorage.getItem('favorites')) {
  favorites = JSON.parse(localStorage.getItem('favorites'));
} else {
  favorites = [];
}

function favoriteIt(){
  const favElement = this.parentElement;
  favElement.classList.toggle('favorite-element');
  if (favElement.classList.contains('favorite-element') && !favorites.includes(favElement.id)){
    favorites.push(favElement.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    favorites.splice(favorites.indexOf(favElement.id), 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

btnSelector.addEventListener('click', searchIt);
