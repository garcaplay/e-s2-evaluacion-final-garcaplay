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
  console.log('pinchaste!');
  fetch(`http://api.tvmaze.com/search/shows?q=${inputSelector.value}`)
    .then(function(response){
      return response.json();
    })
    .then(function(data){

      for(let i=0; i<data.length; i++){
        const serie = data[i].show;
        const serieTitle = serie.name;
        //si la serie no tiene cartel, metemos una imagen de relleno de placehoder.com
        let serieImage = '';
        if(serie.image){
          serieImage = serie.image.medium;
        }else{
          serieImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        }

        //Con los resultados, pintar un li con la tarjeta que muestre el cartel y el título de la serie
        li = document.createElement('li');
        const liContent = `<div class="list-element" id="${serieTitle}"><img class ="list-element-image" src="${serieImage}" alt="cartel promocional de ${serieTitle}"><h2 class="list-element-title">${serieTitle}</h2></div>`;
        li.innerHTML = liContent;
        listSelector.appendChild(li);

        //BUSCAR LA FORMA DE SACAR FUERA DESDE AQUI
        const divSerie = li.querySelector('.list-element');

        //al hacer click sobre un resultado, cambia el color de fondo y se pone un borde en la tarjeta para marcarlo como 'favorito'
        divSerie.addEventListener('click', favoriteIt);
        //HASTA AQUI

      }

    })
    .catch(error => console.log(`¡Upsi! Ha sucedido un error: ${error}`));

}

const favorites = [];

function favoriteIt(){
  this.classList.toggle('favorite-element');
  //INTENTANDO HACER EL LOCALSTORAGE
  if (this.classList.contains('favorite-element')){
    favorites.push(this.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    localStorage.removeItem('favorite');
    favorites.splice(favorites.indexOf(this.id), 1);
  }
  console.log(favorites);
}


btnSelector.addEventListener('click', searchIt);



//FAVORITO

//almacenamos la info de los favoritos en LocalStorage para que aparezca marcada cuando volvamos a buscar



