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
        //si la serie no tiene cartel, metemos una imagen de relleno de placehoder.com
        let serieImage = '';
        if(serie.image){
          serieImage = serie.image.medium;
        }else{
          serieImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        }


        console.log(serie);
        //Intento de crear mensaje si la búsqueda no da resultado
        if(data.length === 0){
          console.log('no hay nada');
          const message = `<div class="error-message">No hemos encontrado ningún resultado para ${inputSelector.value} :(</div>`;
          listSelector.appendChild(message);
        }


        //Con los resultados, pintar un li con la tarjeta que muestre el cartel y el título de la serie
        li = document.createElement('li');
        const liContent = `<a class="list-link" href="${serieLink}"><div class="list-element" id="${serieTitle}"><img class ="list-element-image" src="${serieImage}" alt="cartel promocional de ${serieTitle}"><h2 class="list-element-title">${serieTitle}</h2></div></a>`;
        li.innerHTML = liContent;
        listSelector.appendChild(li);

        //BUSCAR LA FORMA DE SACAR FUERA DESDE AQUI
        const divSerie = li.querySelector('.list-element');
        let arrayFavorites = JSON.parse(localStorage.getItem('favorites'));
        //intento de hacer lo de localstorage que no funciona

        if(arrayFavorites>0){
          for (let j=0; j<arrayFavorites.length; j++){
            if(arrayFavorites[j].includes(serieTitle)){
              divSerie.classList.add('favorite-element');
              console.log('yes');
            }
          }
        }


        //console.log(JSON.parse(localStorage.getItem('favorites'))[0]);

        //al hacer click sobre un resultado, cambia el color de fondo y se pone un borde en la tarjeta para marcarlo como 'favorito'
        divSerie.addEventListener('click', favoriteIt);
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
console.log(JSON.parse(localStorage.getItem('favorites')));

function favoriteIt(){
  this.classList.toggle('favorite-element');
  if (this.classList.contains('favorite-element') && !favorites.includes(this.id)){
    favorites.push(this.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    favorites.splice(favorites.indexOf(this.id), 1);
    localStorage.removeItem(favorites[(favorites.indexOf(this.id), 1)]);
  }
  console.log(favorites);
  console.log(localStorage);
}


btnSelector.addEventListener('click', searchIt);



//FAVORITO

//almacenamos la info de los favoritos en LocalStorage para que aparezca marcada cuando volvamos a buscar



