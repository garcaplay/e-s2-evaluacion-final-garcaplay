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
  console.log('pinchaste!')
  fetch(`http://api.tvmaze.com/search/shows?q=${inputSelector.value}`)
  .then(function(response){
    return response.json();
  })
  .then(function(data){

    for(let i=0; i<data.length; i++){
      const serie = data[i].show
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
      const liContent = `<div class="list-element"><img src="${serieImage}" alt="cartel promocional de ${serieTitle}"><h2>${serieTitle}</h2></div>`;
      li.innerHTML = liContent;
      listSelector.appendChild(li);

      //BUSCAR LA FORMA DE SACAR FUERA DESDE AQUI
      const divSerie = li.querySelector('.list-element');
      function favoriteIt(e){
        this.classList.toggle('favorite-element');
      }

      divSerie.addEventListener('click', favoriteIt);
      //HASTA AQUI

    }

  })


}


btnSelector.addEventListener('click', searchIt);



//FAVORITO
//al hacer click sobre un resultado, cambia el color de fondo y se pone un borde en la tarjeta para marcarlo como 'favorito'
//almacenamos la info de los favoritos en LocalStorage para que aparezca marcada cuando volvamos a buscar



