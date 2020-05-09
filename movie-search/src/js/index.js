import { getResults, getTranslate } from  './moduleAPI.js';
import { creatDom } from  './keyboard.js';
import '../css/style.css';
import '../css/style.scss';

const swiper = require('./swiper.js');

const FORM = document.querySelector('FORM');
const INPUT = document.getElementById('search');
const ERROR_CONTAINER = document.querySelector('.errors');
const CLEAR_INPUT = document.getElementById('clear');
const LOUDER = document.getElementById('loader');
const HIDDEN = document.querySelector('.hidden-fon')
const KEYBOARD = document.querySelector('.virtual-keyboard')
let page = 1;
let searchTerm = 'sun';
let isEnd =true;
creatDom()


const mySwiper = document.querySelector('.swiper-container').swiper;
const swiperWrapper = document.querySelector('.swiper-wrapper')

 function getMovieSlide(movie) {
  const  poster = movie.Poster === 'N/A' ? movie.Poster = '../img/template.png' :  movie.Poster;
  return `
  <div class="swiper-slide">
  <div class="card-body">
  <div class='card-title '><a href="https://www.imdb.com/title/${movie.imdbID}/videogallery" class="" target="_blank">${movie.Title}</a></div>
    <div class="card-img " id = '${movie.imdbID}'>
    <img  src="${poster}" alt="${movie.Title}">
    <div class="description block">
    <p>Country:<span>  ${movie.country}</span></p>
    <p>Actors:<span>  ${movie.actor}</span></p>
    <p>Genres:<span>  ${movie.genre}</span></p>
    <p>Description:<span>  ${movie.plot}</span></p>
    <p>Time:<span>  ${movie.time}</span></p>
    </div>
    </div>
      <p class="card-text">${movie.Year}</p>
      <span class="rating">${movie.rating}</span>
    </div>
  </div>
  `;
}

 function showError(error) {
    ERROR_CONTAINER.innerHTML = `${error}`;
 }
function  showResults() {
   LOUDER.style.display = 'block';
   HIDDEN.style.display = 'block';
   getTranslate(searchTerm).then(data =>{
    const regexp = /[а-яё]/i;
      if (regexp.test(searchTerm)){
         ERROR_CONTAINER.innerHTML = `Showing results for ${data}`
       }
       searchTerm = data;
       getResults(searchTerm,page).then(results =>{
          if (page === 1 && results) swiperWrapper.innerHTML = '';
             results.map((movie) => {
             return mySwiper.appendSlide(getMovieSlide(movie));
            });
          }).then( ()=>{
              LOUDER.style.display = 'none';
              HIDDEN.style.display = 'none';
          }).catch((error) => {
              showError(error)
              LOUDER.style.display = 'none';
              HIDDEN.style.display = 'none';
            })
  })
}
showResults()


CLEAR_INPUT.addEventListener('click',() =>{
  INPUT.value = '';
  INPUT.focus();
  ERROR_CONTAINER.innerHTML = '';
  mySwiper.update();
  
})
 function searchMovie(){
  document.getElementById('wrapper-keyboard').classList.add('block')
  ERROR_CONTAINER.innerHTML = '';
  searchTerm = INPUT.value
  page = 1;
  if (searchTerm.length > 0){
    showResults()
    mySwiper.update();
  }
}
FORM.addEventListener('submit',(event) => {
  event.preventDefault();
  searchMovie ()
})

mySwiper.on('reachEnd',() => {  
  if ([0, 1].includes(mySwiper.activeIndex)) return;
  page +=1;
  showResults()
})


 
KEYBOARD.addEventListener('click', () =>{
  document.getElementById('wrapper-keyboard').classList.toggle('block')
});
document.querySelector('.Enter').addEventListener('click', searchMovie )



window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      INPUT.value = speechToText;
    }
    recognition.addEventListener('end',() => {
      searchMovie()
      document.querySelector('.mic').classList.remove('mic-active')
     
    })
document.querySelector('.mic').addEventListener('click',() => {
   recognition.start();
   document.querySelector('.mic').classList.add('mic-active')
})
document.addEventListener('click', (event) =>{
  if( event.target.tagName === 'IMG'){
    event.target.nextElementSibling.classList.toggle('block')
  }
  if(event.target.closest('.description')  ){
    event.target.closest('.description').classList.add('block')
  }
})
