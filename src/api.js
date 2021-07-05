import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "ee424dad1a8fdd9ad4a5e461b503e8b7",
    language: "en-US"
  }
});

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  nowPlayMore: (page) => api.get("movie/now_playing", { params : {page}}),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: term =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
      }
    }),
  movieCredits: id => api.get(`movie/${id}/credits`),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: term =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term)
      }
    }),
  tvImdb: (id) => api.get(`tv/${id}/external_ids`),
  tvCredits: id => api.get(`tv/${id}/credits`),
  tvSeason: (id, number) => api.get(`/tv/${id}/season/${number}`), // TV Seasons get detail
  tvEpisode: (id, number, epiNumber) => api.get(`/tv/${id}/season/${number}/episode/${epiNumber}`) // TV episode get detail /tv/{tv_id}/season/{season_number}/episode/{episode_number}
};

export const crewApi = {
  getPerson: id => api.get(`/person/${id}`),
  search: term =>
    api.get("/search/person" , {
      params: {
        query: encodeURIComponent(term)
      }
    }), 
  getImg: (id) => api.get(`/person/${id}/images`),
}