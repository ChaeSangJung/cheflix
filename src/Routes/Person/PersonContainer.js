import React, { useEffect, useState } from "react";
import { crewApi } from "api"

import PesrsonPresenter from "./PersonPresenter";

const PersonContainer = ({match}) => {
    const {params : { id }} = match;
    
    const [loading, setLoading] = useState(true);  
    const [personResult, setPersonResult] = useState({});
    const [olds, setOlds] = useState(0);
    const [profileImg, setProfileImg] = useState([]);

    const getOld = (birthYear, deathYear) => {
        const today = new Date();
        
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
    const loadData = async () => {
        try {
            const { data:personResult } = await crewApi.getPerson(id);
            setPersonResult(personResult);
            const olds = getOld(personResult.birthday, personResult.deathday);
            setOlds(olds);
            const { data : {profiles : profileImg} } = await crewApi.getImg(id);
            setProfileImg(profileImg)
        } catch {
            console.log("Can't find anything");
        } finally {
            setLoading(false);
        }
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
        />
    )
}

export default PersonContainer;