import React, { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

const HomeContainer = () => {  
  const [nowPlaying, setNow] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [nowSwipe, setNowSwipe] = useState({
    "title" : "",
    "arr" : []
  });
  const [upSwipe, setUpSwipe] = useState({
    "title" : "",
    "arr" : []
  })

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

    if(nowPlaying && nowPlaying.length > 0) {
      const now_my = nowPlaying.filter((now) => now.vote_average >= 8.4);
      setNowSwipe({
        "title" : "Now Playing",
        "arr" : now_my
      });
    }

    if(upcoming && upcoming.length > 0) {
      const up_temp = upcoming.slice(0,2);      
      const up_Black_Widow = upcoming.filter((up) => up.title.includes("Black Widow"))
      let up_my = [...up_Black_Widow, ...up_temp];
      
      setUpSwipe({
        "title" : "Upcoming",
        "arr" : up_my
      })
    }
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
        nowSwipe={nowSwipe}
        upSwipe={upSwipe}
      />
  );
}

export default HomeContainer;