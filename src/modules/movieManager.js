import apiKey from "../apiKey"
const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=";
const detailsUrl = "https://api.themoviedb.org/3/movie/";

const mAPI = {
  search(keyword) {
    return fetch(searchUrl + apiKey + "&query=" + keyword).then(entries => entries.json());
  },
  searchWithId(id) {
    return fetch(detailsUrl + id + "?api_key=" + apiKey).then(entries => entries.json());
  },
};

export default mAPI;

