import React, {useState} from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

const SearchContainer = () => {
  const [movieResults, setMovieResults] = useState(null);
  const [tvResults, setTvResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null);

  const [timer, setTimer] =useState(0); // debouncing timer

  const searchByTerm = async () => {
    // console.log(searchTerm)
    setLoading(true);
    try {
      const {
        data: { results: movieResults }
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults }
      } = await tvApi.search(searchTerm);
      
      setMovieResults(movieResults);
      setTvResults(tvResults, tvResults);
    } catch {
      setError("Can't find results.")
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = event => {
    event.preventDefault();
    if (searchTerm !== "") {
      searchByTerm();
    }
  };

  const updateTerm = event => {
    const {
      target: { value }
    } = event;
    
    setSearchTerm(value);
  };

  // debouncing
  const keyUpDebounce = () => {
    if(timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async()=>{
      if (searchTerm !== "") {
        searchByTerm();
      }
    },1000);
    setTimer(newTimer);
  }
  return (
    <SearchPresenter 
      movieResults={movieResults} 
      tvResults={tvResults} 
      loading={loading} 
      error={error}
      searchTerm={searchTerm}
      updateTerm={updateTerm} 
      handleSubmit={handleSubmit}
      keyUpDebounce={keyUpDebounce}
    />
  )
}

export default SearchContainer;