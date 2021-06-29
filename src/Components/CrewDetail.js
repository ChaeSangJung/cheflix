import React from "react";
import styled from "styled-components";
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
    width: 150px;
    img {
        width: 100%;
    }
`
const CrewDetail = ({crewInfoes, setIsPop}) => {
    return (
        <BoxPop>
            <div>
                <BoxImg>
                    {
                        crewInfoes.profile_path ? 
                            <img src={`https://image.tmdb.org/t/p/original/${crewInfoes.profile_path}`} alt={crewInfoes.name}/> :
                            <img src={user} alt={crewInfoes.name}/>  
                    }
                </BoxImg>
                <span>{crewInfoes.name}</span>
            </div>
            <button onClick={()=>{setIsPop(false)}}>닫기</button>
        </BoxPop>
    )
}

export default CrewDetail;