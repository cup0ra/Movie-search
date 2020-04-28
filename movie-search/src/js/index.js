import '../css/style.css';
import '../css/style.scss';


document.getElementById('button-search').addEventListener('click',() => {
  const val = document.getElementById('search').value;
  console.log(val)
  getMovieTitle(val)
});

function getMovieTitle(page) {
  const url = `http://www.omdbapi.com/?s=${page}&apikey=ecbff49a`;
 
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    });
 }
