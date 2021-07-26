import React, { useEffect, useState } from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "api";

const TVContainer = () => {
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const LoadData = async () => {
    try{
      LoadPages();
    } catch {
      setError("Can't find movie information.");
    } finally {
      setLoading(false);
    }
  }

  const LoadPages = async () => {
    const {
      data: { results: topRated }
    } = await tvApi.topRated();
    const {
      data: { results: popular }
    } = await tvApi.popular();
    const {
      data: { results: airingToday }
    } = await tvApi.airingToday();

    setTopRated(topRated);
    setPopular(popular);
    setAiringToday(airingToday);
  }

  useEffect(()=>{
    LoadData();
  }, [])



  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      loading={loading}
      error={error}
    />
  );
}


export default TVContainer;
