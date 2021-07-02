import React, { useState, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import user from './images/user.png';

const BoxPop = styled.div`
    display: inline-block;
    position: relative;
    width: 600px;    
    padding: 20px 30px 20px;
    background: #fff;
    text-align: left;
    border-radius: 5px;
    box-sizing: border-box;
`
const BoxImg = styled.div`
    float: left;
    width: 150px;
    img {
        width: 100%;
    }
`
const ClearFixDiv = styled.div`
    &:after {
        content:"";
        display:block;
        width:0;
        height:0;
        overflow:hidden;
        clear:both;
    }
`
const BoxText = styled.div`
    float: left;
    width: calc(100% - 150px);
    box-sizing: border-box;
`
const TextNames = styled.span`
    font-size: 14px;
    color: #333;    
`
const Icon = styled.i`
    font-size: 14px;
    color: ${({ gender }) => (gender === 1 ? "#ffae00" : gender === 0 || gender === 2 ? "#0036ff": "#333")};
`
const GoImdb = styled.a`
    font-size: 14px;
    color: #333;
    background-color: #f2f2f2;
`
const TextPhase = styled.p`
    line-height: 1.6;
    color: #333;
`
const BoxHoverText = styled.div`
    width: 100%;
    height: 250px;
    overflow-y: auto;
    line-height: 1.6;
    position: absolute;
    color: #fff;
    top: -78px;
    left: 70px;
    background: #333;
    box-sizing: border-box;
    padding: 17px 20px 17px;
`
const WrapBio = styled.div`
    position: relative;
`
const CrewDetail = ({crewInfoes, setIsPop}) => {
    const [old, setOld] = useState(0);
    const [isHover, setIsHover] = useState(false);

    if(crewInfoes.birthday) {
        const today = new Date();
        const today_year = parseInt(today.getFullYear());
        const today_month = parseInt(today.getMonth()+1);
        const today_date = parseInt(today.getDate());

        const birth_year = parseInt(crewInfoes.birthday.split("-")[0]);
        const birth_month = parseInt(crewInfoes.birthday.split("-")[1]);
        const birth_date = parseInt(crewInfoes.birthday.split("-")[2]);

        if(!crewInfoes.deathday) {            
            let years_old = today_year - birth_year;
            if(today_month - birth_month < 0 || (today_month === birth_month && today_date < birth_date)) {
                years_old = years_old - 1;
            }
            useMemo(() => setOld(years_old), [old]);
        } else {
            const death_year = parseInt(crewInfoes.deathday.split("-")[0]);
            const death_month = parseInt(crewInfoes.deathday.split("-")[1]);
            const death_date = parseInt(crewInfoes.deathday.split("-")[2]);

            let years_old = death_year - birth_year;
            if(death_month - birth_month < 0 || (death_month === birth_month && death_date < birth_date)) {
                years_old = years_old - 1;
            }
            useMemo(() => setOld(years_old), [old]);
        }
    }

    const handleHover = ((bool)=>{setIsHover(bool)}); 

    return (
        <BoxPop>
            <ClearFixDiv>
                <BoxImg>
                    {
                        crewInfoes.profile_path ? 
                            <img src={`https://image.tmdb.org/t/p/original/${crewInfoes.profile_path}`} alt={crewInfoes.name}/> :
                            <img src={user} alt={`no_image_${crewInfoes.name}`}/>  
                    }
                </BoxImg>
                <BoxText>
                    <div>
                        <TextNames>Name : </TextNames>
                        <TextNames>{crewInfoes.name}</TextNames>
                        <Icon 
                            gender={crewInfoes.gender} 
                            className={`${crewInfoes.gender === 1 ? "fas fa-venus" : crewInfoes.gender === 0 || crewInfoes.gender === 2 ? "fas fa-mars" : null}`}>
                        </Icon> 
                        {
                            crewInfoes.imdb_id 
                            ? <GoImdb href={`https://www.imdb.com/name/${crewInfoes.imdb_id}`} rel='noopener noreferrer' target='_blank'>IMDB</GoImdb>
                            : null
                        }
                    </div>
                    {crewInfoes.birthday || crewInfoes.deathday 
                        ? 
                            <>
                                <div>
                                    <TextNames>Birth Day : </TextNames>
                                    <TextNames>
                                        {crewInfoes.birthday ? 
                                            `${parseInt(crewInfoes.birthday.split("-")[0])}.
                                            ${parseInt(crewInfoes.birthday.split("-")[1])}.
                                            ${parseInt(crewInfoes.birthday.split("-")[2])}` 
                                            : null
                                        }
                                        &nbsp;
                                        {!crewInfoes.deathday ? `(${old}years)`: null}
                                    </TextNames>
                                </div>
                                {crewInfoes.deathday ? 
                                    <div>
                                        <TextNames>Death Day : </TextNames>
                                        <TextNames>
                                            {`
                                                ${parseInt(crewInfoes.deathday.split("-")[0])}.
                                                ${parseInt(crewInfoes.deathday.split("-")[1])}.
                                                ${parseInt(crewInfoes.deathday.split("-")[2])}
                                            `}
                                                &nbsp;
                                            {`(${old}years)`}
                                        </TextNames>
                                    </div>
                                    : null
                                }
                                
                            </>
                            
                        : null
                    }
                    
                </BoxText>
            </ClearFixDiv>
            <div>
                {crewInfoes.biography ?
                    <WrapBio
                        onMouseEnter={()=>{handleHover(true)}}
                        onMouseLeave={()=>{handleHover(false)}}
                    >
                        <TextPhase>
                            {crewInfoes.biography.length > 300 ? `${crewInfoes.biography.substring(0,300)}...` : crewInfoes.biography}
                        </TextPhase>
                        {isHover ? <BoxHoverText>{crewInfoes.biography}</BoxHoverText> : null}
                    </WrapBio>
                 : null
                }
                
            </div>
            <button onClick={()=>{setIsPop(false)}}>닫기</button>
        </BoxPop>
    )
}

CrewDetail.propTypes = {
    crewInfoes: PropTypes.object,
    setIsPop: PropTypes.func
}

export default React.memo(CrewDetail);