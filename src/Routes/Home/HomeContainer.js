import React, { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

const HomeContainer = () => {  
  const [nowPlaying, setNow] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const LoadData = async () => {
    try {
      LoadPages();
    } catch {
      setError("Can't find movie information.");
    } finally {
      setLoading(false);
    }
  };

  const LoadPages = async () => {
    const {
      data: { results: nowPlaying },
    } = await moviesApi.nowPlaying();
    const {
      data: { results: upcoming },
    } = await moviesApi.upcoming();
    const {
      data: { results: popular },
    } = await moviesApi.popular();
    setNow(nowPlaying);
    setUpcoming(upcoming);
    setPopular(popular);
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
  );
}

export default HomeContainer;