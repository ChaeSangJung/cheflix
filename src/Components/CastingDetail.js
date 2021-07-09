import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import user from './images/user.png';

const WrapCast = styled.div`
    position: relative;
    display: inline-block;
    width: calc((100% - 160px)/9);
    margin-left: 20px;
    vertical-align: top;
    &:nth-child(9n-8) {
        margin-left: 0;
    }
    &:nth-child(n+10) {
        margin-top: 20px;
    }
`;
const BoxCastImage = styled.div`
    overflow: hidden;
    width: 100%;
    cursor: pointer;  
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
const CastingDetail = ({ crew, refetch }) => {
    return (
        <WrapCast>
            <BoxCastImage onClick={()=>{refetch(crew.id)}}>
                {
                crew.profile_path ? 
                    <img src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`} alt={crew.name}/> :
                    <img src={user} alt={crew.name}/>  
                }
            </BoxCastImage>
            <div>
                <TextCrewName>{crew.name}</TextCrewName>
                <TextCharacterName>{crew.character}</TextCharacterName>
            </div>
        </WrapCast>
    )
}

CastingDetail.propTypes = {
    crew: PropTypes.object,
    refetch: PropTypes.func
}

export default CastingDetail