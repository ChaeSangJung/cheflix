import React from "react";
import styled from "styled-components";
import user from './images/user.png';

const WrapCast = styled.div`
    position: relative;
    display: inline-block;
    width: calc((100% - 160px)/9);
    margin-left: 20px;
    &:nth-child(9n-8) {
        margin-left: 0;
    }
    &:nth-child(n+9) {
        margin-top: 20px;
    }
`;

const BoxCastImage = styled.div`
    overflow: hidden;
    width: 100%;  
    img {
        width: 100%;
        height: 100%;
    }
`;

const CastingDetail = ({ crew }) => {
    console.log(crew)
    return (
        <WrapCast>
            <BoxCastImage>
                {
                crew.profile_path ? 
                    <img src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`} alt={crew.name}/> :
                    <img src={user} alt={crew.name}/>  
                }
            </BoxCastImage>
        </WrapCast>
    )
}

export default CastingDetail