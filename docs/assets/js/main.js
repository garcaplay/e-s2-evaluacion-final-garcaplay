"use strict";const inputSelector=document.querySelector(".main__searcher-input"),btnSelector=document.querySelector(".main__searcher-btn"),listSelector=document.querySelector(".main__results-list");let favorites,li="";function searchIt(){listSelector.innerHTML="",fetch(`http://api.tvmaze.com/search/shows?q=${inputSelector.value}`).then(function(e){return e.json()}).then(function(e){if(0===e.length){const e='<div class="error-message">\n          <p>\n          No hemos encontrado ningún resultado para tu búsqueda 😭, pero aquí tienes un unicornio 🦄 !!\n          </p>\n          </div>';listSelector.innerHTML=e}else for(let t=0;t<e.length;t++){const n=e[t].show,i=n.name,s=n.url;let r="";const l=10*(r=null===n.rating.average?"not rated":n.rating.average);console.log(l);let o="";const a=`\n            <div class="list-element" id="${i}">\n              <i class="favorite-btn fas fa-star-half"></i>\n              <a class="list-link" href="${s}">\n                <img class ="list-element-image" src="${o=n.image?n.image.medium:"https://via.placeholder.com/210x295/cccccc/666666/?text=TV"}" alt="cartel promocional de ${i}">\n                <h2 class="list-element-title">${i}</h2>\n              </a>\n              <div class="list-element-score">\n                <div class="score-bar-container">\n                  <div class="score-bar"></div>\n                </div>\n                <p class="score-number">${r}</p>\n              </div>\n            </div>`;(li=document.createElement("li")).innerHTML=a,listSelector.appendChild(li),li.querySelector(".score-bar").style.width="not rated"===r?"0%":`${l}%`,favoriteClick(li,i)}}).catch(e=>console.log(`¡Upsi! Ha sucedido un error: ${e}`))}function favoriteClick(e,t){const n=e.querySelector(".list-element"),i=e.querySelector(".favorite-btn");for(let e=0;e<favorites.length;e++)favorites[e].includes(t)&&n.classList.add("favorite-element");i.addEventListener("click",favoriteIt)}function favoriteIt(){const e=this.parentElement;e.classList.toggle("favorite-element"),e.classList.contains("favorite-element")&&!favorites.includes(e.id)?favorites.push(e.id):favorites.splice(favorites.indexOf(e.id),1),localStorage.setItem("favorites",JSON.stringify(favorites))}favorites=localStorage.getItem("favorites")?JSON.parse(localStorage.getItem("favorites")):[],btnSelector.addEventListener("click",searchIt),inputSelector.addEventListener("keyup",function(e){13===e.keyCode&&searchIt()});