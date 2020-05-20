/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { getResults, getTranslate } from  './moduleAPI';
import { creatDom } from  '../../keyboard/keyboard';
import '../css/style.css';
import '../../keyboard/assets/style.css';
import '../css/style.scss';

const swiper = require('./swiper.js');

const FORM = document.querySelector('FORM');
const INPUT = document.getElementById('search');
const ERROR_CONTAINER = document.querySelector('.errors');
const CLEAR_INPUT = document.getElementById('clear');
const LOUDER = document.getElementById('loader');
const HIDDEN = document.querySelector('.hidden-fon')
const KEYBOARD = document.querySelector('.virtual-keyboard')
const WRAPPER_KEYBOARD = document.getElementById('wrapper-keyboard')
const MICROPHONE = document.querySelector('.mic')
let page = 1;
let searchTerm = 'sun';
let isMIC = true;
let isEND = false;
const posterDefault = '../img/template.png';



const mySwiper = document.querySelector('.swiper-container').swiper;
const swiperWrapper = document.querySelector('.swiper-wrapper')

const checkImgSrc = src => {
  return  new Promise((resolve) =>{
  const img = new Image();
  img.addEventListener("load", () => resolve(img));
  img.addEventListener("error", () => resolve(posterDefault) );
  img.src = src;
  })
}
 async function getMovieSlide(movie) {
  const poster = movie.Poster === 'N/A' ? movie.Poster = posterDefault :  movie.Poster;
    await checkImgSrc(movie.Poster)
    const CARD = `
    <div class="swiper-slide">
      <div class="card-body">
        <div class='card-title '><a href="https://www.imdb.com/title/${movie.imdbID}/videogallery" class="" target="_blank">${movie.Title}</a></div>
          <div class="card-img " id = '${movie.imdbID}'>
            <img  src="${movie.Poster}" onError="this.onerror=null;this.src='../img/template.png';" alt="${movie.Title}">
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
    return mySwiper.appendSlide(CARD)
}

function showError(error) {
  ERROR_CONTAINER.innerHTML = `${error}`;
  LOUDER.style.display = 'none';
  HIDDEN.style.display = 'none';
  searchTerm = localStorage.getItem('search')
  page = +(localStorage.getItem('page'))
}
const setTimeoutPromise = ms => new Promise(resolve => setTimeout(resolve, ms))
async function  showResults() {
   LOUDER.style.display = 'block';
   HIDDEN.style.display = 'block';
   getTranslate(searchTerm).then(data =>{
    if (/^\d+$/.test(searchTerm)){ 
      data = searchTerm
    }
    if (/[а-яё]/i.test(searchTerm)){
      ERROR_CONTAINER.innerHTML = `Showing results for ${data}`
    }
    searchTerm = data
    getResults(searchTerm,page).then( results =>{
      if (page === 1 && results) swiperWrapper.innerHTML = '';
        results.map( (movie) => {
       return getMovieSlide(movie)
        })
        LOUDER.style.display = 'none';
        HIDDEN.style.display = 'none';
        localStorage.setItem('search', searchTerm);
        localStorage.setItem('page',page)
    }).catch((error) => {
      showError(error)
    })
  }).catch((error) => {
    showError(error)
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
  WRAPPER_KEYBOARD.classList.add('block')
  ERROR_CONTAINER.innerHTML = '';
  searchTerm = INPUT.value
  page = 1;
  if (searchTerm.length > 0){
    isEND = false
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
  if(isEND === true){
    page +=1;
    showResults()
  }
})
mySwiper.on('slideChange',() => {  
  if(mySwiper.touches){
    isEND = true;
    console.log(isEND)
  }

})

KEYBOARD.addEventListener('click', () =>{
  WRAPPER_KEYBOARD.classList.toggle('block')
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
  MICROPHONE.classList.remove('mic-active')
  isMIC = true
})

MICROPHONE.addEventListener('click',() => {
  if(isMIC === true){
    recognition.start();
    MICROPHONE.classList.add('mic-active')
    isMIC = false
  }
})

document.addEventListener('click', (event) =>{
  if( event.target.tagName === 'IMG'){
    event.target.nextElementSibling.classList.toggle('block')
  }
  if(event.target.closest('.description')  ){
    event.target.closest('.description').classList.toggle('block')
  }
})

