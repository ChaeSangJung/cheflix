import React, {useState, useEffect} from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

const DetailContainer = ({location, match, history}) => {
  const { pathname } = location;
  const { params : { id } } = match;
  const { push } = history;

  const [result, setResult] = useState([]);
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(null);
  const [imdb_id, setImdb_id] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [isMovie] = useState(pathname.includes("/movie/"));

  const loadData = async () => {
    const parseId = parseInt(id);
    if (isNaN(parseId)){
      return push("/");
    }

    try {
      if(isMovie) {
        const { data : results } = await moviesApi.movieDetail(parseId);
        const { data: cast } = await moviesApi.movieCredits(parseId);

        setResult(results);
        setCasts(cast);
      } else {
        const { data: results } = await tvApi.showDetail(parseId);
        const { data: { imdb_id } } = await tvApi.tvImdb(parseId);
        const { data: cast } = await tvApi.tvCredits(parseId);
        
        setResult(results);
        setImdb_id(imdb_id);
        setCasts(cast);
      }
    } catch {
      setError("Can't find anything");
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    loadData();
  },[]);

  return (
    <DetailPresenter result={result} loading={loading} isMovie={isMovie} imdb_id={imdb_id} casts={casts}/>
  )
}

export default DetailContainer;