'use strict';

const inputSelector = document.querySelector('.main__searcher-input');
const btnSelector = document.querySelector('.main__searcher-btn');
const listSelector = document.querySelector('.main__results-list');

//BUSCADOR
//Al hacer clic sobre el botón de 'Buscar'
//recogemos el texto del campo de búsqueda y lo metemos a la url de la API
//nos conectamos al API http://api.tvmaze.com/search/shows?q=${BLABLABLA};

function searchIt(){
  console.log('pinchaste!')
  fetch(`http://api.tvmaze.com/search/shows?q=${inputSelector.value}`);
  .then()
}

btnSelector.addEventListener('click', searchIt);

//PINTAR RESULTADOS
//miramos qué datos devuelve la petición de búsqueda para coger los que necesitamos
//Con los resultados, pintar un li con la tarjeta que muestre el cartel y el título de la serie

//RESULTADOS SIN IMAGEN
//si la serie no tiene cartel, metemos una imagen de relleno de placehoder.com (https://via.placeholder.com/210x295/cccccc/666666/?text=TV)

//FAVORITO
//al hacer click sobre un resultado, cambia el color de fondo y se pone un borde en la tarjeta para marcarlo como 'favorito'
//almacenamos la info de los favoritos en LocalStorage para que aparezca marcada cuando volvamos a buscar



