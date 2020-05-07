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
let searchTerm = 'dream';
creatDom()


const mySwiper = document.querySelector('.swiper-container').swiper;

const swiperWrapper = document.querySelector('.swiper-wrapper')

function getMovieSlide(movie) {
 
  const poster = movie.Poster === 'N/A' ? movie.Poster = '../img/template.png' : movie.Poster;
  return `
  <div class="swiper-slide">
  <div class="card-body">
  <div class='card-title '><a href="https://www.imdb.com/title/${movie.imdbID}/videogallery" class="" target="_blank">${movie.Title}</a></div>
    <img class="card-img " src="${poster}" alt="${movie.Title}">
      <p class="card-text">${movie.Year}</p>
      <span class="rating">${movie.rating}</span>
    </div>
  </div>
  `;
}

function showError(error) {
    ERROR_CONTAINER.innerHTML = `${error}`;
 }
const  showResults = () => {
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
          }).then( () =>{
            LOUDER.style.display = 'none';
            HIDDEN.style.display = 'none';
          }).catch((error) => {
              showError(error)
              console.log(error)
              mySwiper.update();
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
})
 function searchMovie(event){
  document.getElementById('wrapper-keyboard').classList.add('block')
  event.preventDefault();
  ERROR_CONTAINER.innerHTML = '';
  searchTerm = INPUT.value
  page = 1;
  if (searchTerm.length > 0){
    showResults()
    mySwiper.update();
  }
}
FORM.addEventListener('submit',searchMovie)

mySwiper.on('reachEnd',() => {  
  page +=1;
  showResults()
})

 document.querySelector('.swiper-button-next').onclick = () => { mySwiper.slideNext() };
 document.querySelector('.swiper-button-prev').onclick = () => { mySwiper.slidePrev() };
 
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
    recognition.onend = function() {
      document.querySelector('.mic').classList.remove('mic-active')
    }
document.querySelector('.mic').addEventListener('click',() => {
   recognition.start();
   document.querySelector('.mic').classList.add('mic-active')
})