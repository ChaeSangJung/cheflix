import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
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
  display: inline-block;
  width: 50px;
  height: 10px;
  margin-left: 8px;
  background-image: url(${rating_star_home});
  background-position: 0 0;
  background-repeat: no-repeat;
  vertical-align: bottom;
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
const WrapBottomNavi = styled.div`
    margin-top: 60px;
`;
const WrapSeason = styled.div`
    margin-top: 50px;
    padding: 20px 30px 20px;
    border-radius: 5px;
    background-color: #f1f1f1;
    box-sizing: border-box;
`;
const TextStrong = styled.p`
    color: #333;
`;
const TextTitle = styled.span`
    font-size: 16px;
    font-weight: 700;
`;
const TextContent = styled.span`
    font-size: 15px;
    font-weight: 500;
`;
const TextAir = styled.p`
    margin-top: 10px;
    color: #333;
`;
const TextAirTitle = styled.span`
    font-size: 15px;
    font-weight: 500;
`;
const TextAirContent = styled.span`
    font-size: 14px;
    font-weight: 500;
`;
const ImgSeason =styled.div`
    width: 130px;
    margin-top: 10px;
    img {
        width: 100%;
    }
`;
const TextOverView = styled.p`
    font-size: 15px;
    line-height: 1.6;
    color: #333;
`;
const WrapUpper = styled.div`
    font-size: 0;
    text-align: left;
`;
const BoxLeft = styled.div`
    position: relative;
    display: inline-block;
    width: 250px;
    padding-right: 20px;
    vertical-align: top;
    &:after {
        content: "";
        position: absolute;
        display: block;
        width: 1px;
        height: 100%;
        top: 0;
        right: 20px;
        border-left: 2px dashed #e0e0e0;
    }
`;
const BoxRight = styled.div`
    position: relative;
    display: inline-block;
    width: calc(100% - 270px);
    vertical-align: top;
    top: -5px;
`
const ListSeason = styled.ul`
    margin-top: 50px;    
    background: rgba(50,50,50,0.5);
    border-radius: 10px;
    box-sizing: border-box;
`;
const ListEpsode = styled.li`
    padding: 20px 20px 20px;
    font-size: 0;
    border-bottom: 1px solid rgba(20,20,20,1);
    box-sizing: border-box;
    &:last-child {
        border-bottom: none;
    }
`;
const WrapEpLeft = styled.div`
    position: relative;
    display: inline-block;
    width: 350px;
    padding-right: 40px;
    vertical-align: top;
    box-sizing: border-box;
    &:after {
        content: "";
        position: absolute;
        display: block;
        width: 1px;
        height: 100%;
        border-left: 1px dashed rgba(20,20,20,1);
        top: 0;
        right: 20px;
    }
`;
const WrapEpright = styled.div`
    display: inline-block;
    width: calc(100% - 390px);
    vertical-align: top;
    box-sizing: border-box;
`;
const WrapEpName = styled.div``;
const BoxEpName = styled.div`
    display: inline-block;
    vertical-align: bottom;
`;
const TextEps = styled.span`
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    & + span {
        margin-left: 7px;
    }
`;
const BoxEpiAirDate = styled.div`
    margin-top: 10px;
`;
const TextEpiAirTitle = styled.span`
    font-size: 14px;
    font-weight: 700;
`;
const TextEpiAirDate = styled.span`
    font-size: 14px;
    font-weight: 500;
`;
const BoxEpImg = styled.div`
    margin-top: 15px;
    img {
        /* width: 300px; */
        width: ${(props)=>props.xWidth ? "300px" : "130px"};
    }
`;
const TextEpOverview = styled.p`
    font-size: 14px;
    line-height: 1.6;
`;

const SeasonDetailPresnter = ({loading, total_season, id, season_number, prev_season, next_season, tvTitle, geSeason, isList, setIsList, epResult}) => {
    
    return (
        loading ? (<Loader />) : (
            <Container>
                <Helmet 
                    title = {`${tvTitle} : ${epResult.name} | Cheflix`}
                />
                <NaviSeason 
                    prev_season={prev_season}
                    id={id}
                    setIsList={setIsList}
                    next_season={next_season}
                    isList={isList}
                    geSeason={geSeason}
                    tvTitle={tvTitle}
                />

                <WrapSeason>
                    <WrapUpper>
                        <BoxLeft>
                            <TextStrong><TextTitle>{tvTitle} : </TextTitle><TextContent>{epResult.name}</TextContent></TextStrong>
                            <TextAir><TextAirTitle>Air Date : </TextAirTitle><TextAirContent>{epResult.air_date}</TextAirContent></TextAir>                    
                            <ImgSeason>
                                {epResult.poster_path 
                                ? <img src={`https://image.tmdb.org/t/p/w300${epResult.poster_path}`} alt={epResult.name} /> 
                                : <img src={require("../../assets/noPosterSmall.png")} alt={epResult.name}/>}
                            </ImgSeason>
                        </BoxLeft>
                        <BoxRight>{epResult.overview ? (<TextOverView>{epResult.overview}</TextOverView>) : null}</BoxRight>
                    </WrapUpper>

                </WrapSeason>
                <ListSeason>
                    {epResult.episodes.map(
                        (epi)=>(
                            <ListEpsode key={epi.id}>
                                <WrapEpLeft>
                                    <WrapEpName>
                                        <BoxEpName>
                                            <TextEps>Ep. {epi.episode_number < 10 ? `0${epi.episode_number}` : epi.episode_number}</TextEps>
                                            <TextEps>{epi.name}</TextEps>
                                        </BoxEpName>
                                        <BoxOuter>
                                            <BoxInner starRating={epi.vote_average*10} />
                                        </BoxOuter>
                                    </WrapEpName>
                                    <BoxEpiAirDate>
                                        <TextEpiAirTitle>Air Date : </TextEpiAirTitle>
                                        <TextEpiAirDate>{epi.air_date}</TextEpiAirDate>
                                    </BoxEpiAirDate>
                                    <BoxEpImg xWidth={epi.still_path}>
                                        {epi.still_path 
                                            ? <img src={`https://image.tmdb.org/t/p/w300${epi.still_path}`} alt={`${epi.name}_still`} />
                                            : <img src={require("../../assets/noPosterSmall.png")} alt={`${epi.name}_still`} />
                                        }
                                    </BoxEpImg>
                                </WrapEpLeft>
                                <WrapEpright>
                                    <TextEpOverview>{epi.overview}</TextEpOverview>
                                </WrapEpright>
                            </ListEpsode>
                        )
                    )}
                </ListSeason>
                <WrapBottomNavi>
                    <NaviSeason 
                        prev_season={prev_season}
                        id={id}
                        setIsList={setIsList}
                        next_season={next_season}
                        isList={isList}
                        geSeason={geSeason}
                        tvTitle={tvTitle}
                    />
                </WrapBottomNavi>
                
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