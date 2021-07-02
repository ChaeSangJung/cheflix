import React, { useState, useEffect } from "react";
import { tvApi } from "../../api";
import SeasonDetailPresnter from "./SeasonDetailPresnter";

const SeasonDetailContainer = ({match, history}) => {
    const {
        params : {
            id,
            season_number
        }
    } = match;
    const { push } = history;

    const [loading, setLoading] = useState(true);
    const [total_season, setTotalSeason] = useState([]);
    const [prev_season, setPrevSeason] = useState({
        "number" : -100,
        "name" : null,
        "imgUrl" : null
    });
    const [next_season, setNextSeason] = useState({
        "number" : -100,
        "name" : null,
        "imgUrl" : null
    });
    const [tvTitle, setTvTitle] = useState("");
    const [geSeason, setGeSeason] = useState([]);
    const [isList, setIsList] = useState(false);

    const loadData = async () => {
        const parseId = parseInt(id);
        const parseNumber = parseInt(season_number);

        if(isNaN(parseId) || isNaN(parseNumber)){
            return push(`/show/${id}`);
        }

        try {
            const { data : { 
                seasons,
                name : tv_title
            } } = await tvApi.showDetail(parseId);
            
            const { data : epiListResult } = await tvApi.tvSeason(parseId, parseNumber);

            console.log(epiListResult);

            setGeSeason(seasons);

            const arr_season = seasons.map(season => season.season_number);

            setTotalSeason(arr_season);
            setTvTitle(tv_title);

            const prev_season = parseNumber - 1;
            const next_season = parseNumber + 1;
            
            const is_prev = arr_season.includes(prev_season);
            const is_next = arr_season.includes(next_season);
            
            if(is_prev) {
                let imgUrl;

                if(seasons[prev_season].poster_path === null) {
                    imgUrl="nothing"
                } else {
                    imgUrl=seasons[prev_season].poster_path
                }

                setPrevSeason({
                    "number" : prev_season,
                    "name" : seasons[prev_season].name,
                    "imgUrl" : imgUrl,
                });
            } else {
                setPrevSeason({
                    "number" : -100,
                    "name" : "",
                    "imgUrl" : ""
                });
            }

            if(is_next) {
                let imgUrl;

                if(seasons[next_season].poster_path === null) {
                    imgUrl="nothing"
                } else {
                    imgUrl=seasons[next_season].poster_path
                }
                
                setNextSeason({
                    "number" : next_season,
                    "name" : seasons[next_season].name,
                    "imgUrl" : imgUrl
                });
            } else {
                setNextSeason({
                    "number" : -100,
                    "name" : "",
                    "imgUrl" : ""
                });
            }

        } catch {
            console.log("Can't find anything");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
        setIsList(false);
    },[season_number]);

    document.addEventListener("click", (event)=>{
        if(event.target.classList.contains("dim")) {
            setIsList(false);
        }
    })
    
    return (
        <SeasonDetailPresnter 
            loading={loading}
            total_season={total_season}
            id={parseInt(id)}
            season_number={parseInt(season_number)}
            prev_season={prev_season}
            next_season={next_season}
            tvTitle={tvTitle}
            geSeason={geSeason}
            isList={isList}
            setIsList={setIsList}
        />
    )
}

export default SeasonDetailContainer;