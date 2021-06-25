import React, {useEffect, useState,useCallback} from "react";
import { crewApi } from "../api";
import CastingDetail from "./CastingDetail";
import styled from "styled-components";
import user from './images/user.png';


const WrapCast = styled.div``;
const BoxCastImage = styled.div`
  width: 100%;
  height: 210px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const TextCrewName = styled.p`
  margin-top: 7px;
  font-size: 15px;
  font-weight: 700;
  color: #333;
`;
const TextCharacterName = styled.p`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #333;
`;


const Casting = ({crew}) => {    
    const [persons, setCrew] = useState();
    const [crewLoading, setCrewLoading] = useState(true);
    const [error, setError] = useState('');
    const [isClick, setIsClick] = useState();
    const [crewId, setCrewId] = useState();

    const getCrewInfo = async (id) => {
        const parseId = parseInt(id);
        setCrewId(parseId);

        try {
            const { data } = await crewApi.getPerson(parseId);
            // console.log(data, data.length)
            setCrew(data);
        } catch {
            setError("Can't find anything");
        } finally {
            setCrewLoading(false);
        }
    }

    const getCrewId = (id) => {
        const parseId = parseInt(id);
        setCrewId(parseId);
        setIsClick(true);
    }

    useEffect(()=>{
        if(crewId) {
            getCrewInfo(crewId); 
        }
    },[isClick])

    return (
        <>
            <WrapCast key={crew.credit_id}>
                <BoxCastImage onClick={()=>{getCrewId(crew.id)}}>
                    {
                    crew.profile_path ? 
                        <img src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`} alt={crew.name}/> :
                        <img src={user} alt={crew.name}/>  
                    }
                </BoxCastImage>
                <div>
                    <TextCrewName>{crew.name}</TextCrewName>
                    <TextCharacterName>{crew.character}</TextCharacterName>
                    {!isClick
                        ? null 
                        : (<CastingDetail crewLoading={crewLoading} setIsClick={setIsClick} persons={persons} />) 
                    }
                </div>
            </WrapCast>
        </>
    )
}

export default Casting;