import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NaviSeason from "../../Components/NaviSeason";
import Loader from "../../Components/Loader";
import rating_star_home from './images/rating_star_home.png';

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 50px;
`;
const BoxOuter =styled.div`
  position: relative;
  width: 50px;
  height: 10px;
  background-image: url(${rating_star_home});
  background-position: 0 0;
  background-repeat: no-repeat;
`;
const BoxInner =styled.div`
    position: absolute;
    width: ${(props) => `${props.starRating}%`};
    height: 10px;
    background-image: url(${rating_star_home});
    background-position: 0 -20px;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
`;

const SeasonDetailPresnter = ({loading, total_season, id, season_number, prev_season, next_season, tvTitle, geSeason, isList, setIsList, epResult}) => {
    console.log(epResult)
    return (
        loading ? (<Loader />) : (
            <Container>
                <NaviSeason 
                    prev_season={prev_season}
                    id={id}
                    setIsList={setIsList}
                    next_season={next_season}
                    isList={isList}
                    geSeason={geSeason}
                    tvTitle={tvTitle}
                />
                

                <div>
                    <p>{tvTitle}'s {epResult.name}</p>
                    <p>Air Date : {epResult.air_date}</p>
                    <div>
                        <div>
                            {epResult.poster_path 
                            ? <img src={`https://image.tmdb.org/t/p/w300${epResult.poster_path}`} alt={epResult.name} /> 
                            : <img src={require("../../assets/noPosterSmall.png")} alt={epResult.name}/>}
                        </div>
                        <p>{epResult.overview}</p>
                    </div>
                </div>
                <ul>
                    {epResult.episodes.map(
                        (epi)=>(
                            <li key={epi.id}>
                                <div>
                                    <p>
                                        <span>Ep. {epi.episode_number < 10 ? `0${epi.episode_number}` : epi.episode_number}&nbsp;</span>
                                        <span>{epi.name}&nbsp;</span>
                                        <span>({epi.air_date})</span>
                                    </p>
                                    <BoxOuter>
                                        <BoxInner starRating={epi.vote_average*10} />
                                    </BoxOuter>
                                </div>
                                <div>
                                    <div>
                                        {epi.still_path 
                                            ? <img src={`https://image.tmdb.org/t/p/w300${epi.still_path}`} alt={`${epi.name}_still`} />
                                            : <img src={require("../../assets/noPosterSmall.png")} alt={`${epi.name}_still`} />
                                        }
                                    </div>
                                    <p>{epi.overview}</p>
                                </div>
                            </li>
                        )
                    )}
                </ul>
                
            </Container>
        )
        
        
    )
}
SeasonDetailPresnter.propTypes = {
    loading: PropTypes.bool.isRequired,
    total_season: PropTypes.array,
    id : PropTypes.number,
    season_number : PropTypes.number,
    prev_season : PropTypes.object, 
    next_season : PropTypes.object,
    tvTitle : PropTypes.string,
    geSeason : PropTypes.array,
    isList : PropTypes.bool,
    setIsList : PropTypes.func,
    epResult : PropTypes.object
}

export default SeasonDetailPresnter;