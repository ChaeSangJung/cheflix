import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
        <BoxSeasons>
            <BoxPosterSeasons>
              <Link to={`/show/${id}/season_number/${season.season_number}`}>
                {season.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt={season.name}/>
                ) : (
                  <img src={require("../assets/noPosterSmall.png")} alt={season.name}/>
                )}
              </Link>
            </BoxPosterSeasons>
            <TextSasonName><Link to={`/show/${id}/season_number/${season.season_number}`}>{title}</Link></TextSasonName>
            <TextSasonName>{season.name && season.name > 10 ? `${season.name.substring(0, 10)}...` : season.name}</TextSasonName>
        </BoxSeasons>
    )
}

SeasonDetail.propTypes = {
  title : PropTypes.string,
  id : PropTypes.number,
  season : PropTypes.object,
}

export default SeasonDetail;