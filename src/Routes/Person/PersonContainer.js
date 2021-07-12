import React, { useEffect, useState, useCallback } from "react";
import { useAsync } from '../../hooks';
import { crewApi, moviesApi, tvApi } from "api"

import PesrsonPresenter from "./PersonPresenter";

const PersonContainer = ({match}) => {
    const {params : { id }} = match;
    
    const [loading, setLoading] = useState(true);  
    const [personResult, setPersonResult] = useState({});
    const [olds, setOlds] = useState(0);
    const [profileImg, setProfileImg] = useState([]);
    const [height, setHeight] = useState(0);
    const [movieCredit, setMovieCredit] = useState({});
    const [tvCredit, setTvCredit] = useState([]);
    const [isPop, setIsPop] = useState(false);
    const [linkto, setLinkTo] = useState("")

    const measuredRef = useCallback(node => {
        if(node !== null) {
            const width = node.getBoundingClientRect().width;
            setHeight(width*1.5)
        }
    },[]);

    const getOld = (birthYear, deathYear) => {
        const today = new Date();
        
        if(birthYear !== null || deathYear !== null){
            const today_year = parseInt(today.getFullYear());
            const today_month = parseInt(today.getMonth()+1);
            const today_date = parseInt(today.getDate());

            const birth_year = parseInt(birthYear.split("-")[0]);
            const birth_month = parseInt(birthYear.split("-")[1]);
            const birth_date = parseInt(birthYear.split("-")[2]);

            if(!deathYear) {            
                let years_old = today_year - birth_year;
                if(today_month - birth_month < 0 || (today_month === birth_month && today_date < birth_date)) {
                    years_old = years_old - 1;
                }
                return years_old;
            } else {
                const death_year = parseInt(deathYear.split("-")[0]);
                const death_month = parseInt(deathYear.split("-")[1]);
                const death_date = parseInt(deathYear.split("-")[2]);
    
                let years_old = death_year - birth_year;
    
                if(death_month - birth_month < 0 || (death_month === birth_month && death_date < birth_date)) {
                    years_old = years_old - 1;
                }
                return years_old;
            }
        }
    }

    const loadData = async () => {
        try {
            const { data:personResult } = await crewApi.getPerson(id);
            const { data : {profiles : profileImg} } = await crewApi.getImg(id);
            setPersonResult(personResult);
            const olds = getOld(personResult.birthday, personResult.deathday);
            setOlds(olds);
            setProfileImg(profileImg);
            const { data : movieResults} = await crewApi.getMovieCredit(id);
            setMovieCredit(movieResults);

            const { data : {cast : showResults} } = await crewApi.getTvCredit(id);
            setTvCredit(showResults);
        } catch {
            console.log("Can't find anything");
        } finally {
            setLoading(false);
        }
    }

    // MOVIE SHOW pop
        
    const getDataInfo = async(id, isMovie) => {
        const parsedId = parseInt(id);
        let temp_data;
        if(isMovie) {
            temp_data = await moviesApi.movieDetail(parsedId);
        } else {
            temp_data = await tvApi.showDetail(parsedId);
        }
        const {data : callData} = temp_data;
        return callData;
    }

    const [movieState, getCallMovie] = useAsync(getDataInfo, [], true);
    const {loading : creditLoading, data : creditData} = movieState;
    
    const getData = (id, isMovie) => {
        setIsPop(true);
        if(isMovie){
            setLinkTo("movie");
        } else {
            setLinkTo("show");
        }
        getCallMovie(id,isMovie);
    }
    
    useEffect(()=>{
        loadData();
    },[]);

    return (
        <PesrsonPresenter 
            loading={loading}
            personResult={personResult}
            olds={olds}
            profileImg={profileImg}
            height={height}
            measuredRef={measuredRef}
            movieCredit={movieCredit}
            tvCredit={tvCredit}            
            getData={getData}
            creditLoading={creditLoading}
            creditData={creditData}
            setIsPop={setIsPop}
            isPop={isPop}
            linkto={linkto}
        />
    )
}

export default PersonContainer;