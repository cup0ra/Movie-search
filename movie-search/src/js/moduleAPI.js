export  async function getTranslate(searchTerm){
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200501T092352Z.105a7b70e85a035a.a924daa1826d3250080ba30e8547f84019e80398
    &text=${searchTerm}&lang=ru-en`;
    const response = await fetch(url);
    let data = await response.text();
    if (data.Error) {
        throw new Error(data.Error);
      }
    data = JSON.parse(data) 
    return  data.text[0]
  }
export async function getResults(searchTerm,page) {
    const url = `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=ecbff49a`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.Error && data.Error !== 'Movie not found!'){
      throw new Error(data.Error)
    }
    if (data.Error === 'Movie not found!') {
        throw  (`No results for ${  searchTerm}`) ;
      }
    for(const item of data.Search) {
        const rating = await getRating(item.imdbID);
        item.rating =  rating.imdbRating;
      };
    return  data.Search
  }
export async function getRating(imdbID){
    const ratingUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=ecbff49a`;
    const response = await fetch(ratingUrl);
    const data = await response.json();
    return data;
  }
