import React from "react";
import styled from "styled-components";


const BoxSeasons = styled.div`
    position: relative;
`;
const BoxPosterSeasons = styled.div`
  overflow: hidden;
  img {
    width: auto;
    height: 300px;
  }
`;
const TextSasonName = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #fff;
  text-align: left;
`;

const SeasonDetail = ({title, id, season}) => {
    return (
        <BoxSeasons key={season.id}>
            <BoxPosterSeasons>
                <img src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt={season.name}/>
            </BoxPosterSeasons>
            <TextSasonName>{title}</TextSasonName>
            <TextSasonName>{season.name && season.name > 10 ? `${season.name.substring(0, 10)}...` : season.name}</TextSasonName>
        </BoxSeasons>
    )
}

export default SeasonDetail;