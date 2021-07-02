import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NaviSeason from "../../Components/NaviSeason";
import Loader from "../../Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const SeasonDetailPresnter = ({loading, total_season, id, season_number, prev_season, next_season, tvTitle, geSeason, isList, setIsList}) => {
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
                

                <div>{tvTitle}'s season "{season_number}"</div>
                
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
    tvTitle : PropTypes.string
}

export default SeasonDetailPresnter;