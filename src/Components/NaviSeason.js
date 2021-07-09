import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import styled from "styled-components";

const NavSeason = styled.div`
    position: relative;
    width: 100%;
    height: 90px;
    text-align: center;
`;
const SeLink = styled(Link)`
    position: absolute;
    top: 1px;
    &.linkPrev {
        left: 0;
    }
    &.linkNext {
        right: 0;
    }
`
const BoxImg = styled.div`
    font-size: 0;
    text-align: left;
    img {
        display: inline-block;
        width: auto;
        height: 65px;
        vertical-align: middle;
    }
`;
const Ikonn = styled.i`
    display: inline-block;
    margin: ${(props) =>(props.mg === "right" ? "0 15px 0 0" : props.mg === "left" ? "0 0 0 15px" :"0 0 0 0")};
    font-size: 30px;
    color: #f8f8f8;
    vertical-align: middle;
`;
const IkonnBtn = styled(Ikonn)`

`;
const Btn = styled.button`
    background: transparent;
    border: none;
`;
const BtnList = styled(Btn)`
    margin-top: 16px;
`
const WrapNameText = styled.div`
    margin-top: 7px;
    text-align: center;
`;
const TextName = styled.span`
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    color: #dfdfdf;
`;
const WrapDim = styled.div`
    z-index: 10;
    position: fixed;
    display: block;
    width: 100%;
    height: 100vh;
    padding: 50px 0 50px;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
    box-sizing: border-box;
`;
const ListSeasons = styled.ul`
    overflow-y: auto;    
    width: 400px;
    max-height: 100%;
    margin: 0 auto;
    background: #26261e;
    box-sizing: border-box;
    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #111110;
    }
    &::-webkit-scrollbar-track {
        background-color: #383837;
    }
`;
const ListSeason = styled.li`
    padding: 5px 5px 5px;
    box-sizing: border-box;
    border-bottom: 1px solid #151515;
`;
const WrapList = styled.div`
    font-size: 0;
    text-align: left;
`;
const BoxListImg = styled.div`
    display: inline-block;
    width: 80px;
    vertical-align: top;
    img{
        width: 65px;
        height: auto;
    }
`;
const BoxListText = styled.div`
    display: inline-block;
    width: calc(100% - 80px);
    vertical-align: top;
`
const BoxNameDate = styled.div`
    font-size: 0;
    text-align: left;
`
const TextListName = styled.span`
    display: inline-block;
    font-size: 17px;
    font-weight: 700;
    vertical-align: bottom;
`
const TextListAir = styled.span`
    display: inline-block;
    font-size: 14px;
    vertical-align: bottom;
`
const TextStartInfo = styled.p`
    margin-top: 14px;
    font-size: 14px;
`
const TextListOverview = styled.p`
    margin-top: 16px;
    font-size: 14px;
    line-height: 1.6;
`

const NaviSeason = ({
        prev_season, 
        id,
        setIsList,
        next_season,
        isList,
        geSeason,
        tvTitle        
    }) => {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <NavSeason>
            {prev_season.number < 0 ? null : (
                <SeLink to={`/show/${id}/season_number/${prev_season.number}`} className="linkPrev">
                    <BoxImg>
                        <Ikonn className="fas fa-chevron-circle-left" mg={"right"}></Ikonn>
                        {prev_season.imgUrl === "nothing" ? (
                            <img src={require("../assets/noPosterSmall.png")} alt={prev_season.name} />
                        ) : (
                            <img src={`https://image.tmdb.org/t/p/w300${prev_season.imgUrl}`} alt={prev_season.name} />
                        )}
                    </BoxImg>
                    <WrapNameText>
                        <TextName>{prev_season.name}</TextName>
                    </WrapNameText>
                </SeLink>
            )}
            <BtnList onClick={()=>{setIsList(true)}}><IkonnBtn className="fas fa-th-list"></IkonnBtn></BtnList>
            {next_season.number < 0 ? null : (
                <SeLink to={`/show/${id}/season_number/${next_season.number}`} className="linkNext">
                    <BoxImg>
                        {next_season.imgUrl ==="nothing" ? (
                            <img src={require("../assets/noPosterSmall.png")} alt={next_season.name} />
                        ) : (
                            <img src={`https://image.tmdb.org/t/p/w300${next_season.imgUrl}`} alt={next_season.name} />
                        )}
                        <Ikonn className="fas fa-chevron-circle-right" mg={"left"}></Ikonn>
                    </BoxImg>
                    <WrapNameText>
                        <TextName>{next_season.name}</TextName>
                    </WrapNameText>
                </SeLink>
            )}
            {isList ? (
                <WrapDim className="dim">
                    <ListSeasons>
                        {geSeason.map((list)=>(
                            <ListSeason key={list.id}>
                                <Link to={`/show/${id}/season_number/${list.season_number}`}>
                                    <WrapList>
                                        <BoxListImg>
                                            {list.poster_path ? (
                                                <img src={`https://image.tmdb.org/t/p/w300${list.poster_path}`}  alt={list.name} />
                                            ) : (
                                                <img src={require("../assets/noPosterSmall.png")} alt={list.name} />
                                            )}
                                            
                                        </BoxListImg>
                                        <BoxListText>
                                            <BoxNameDate>
                                                <TextListName>{list.name}&nbsp;</TextListName>
                                                <TextListAir>({list.air_date ? list.air_date.split("-")[0] : null} | {list.episode_count} Episodes)</TextListAir>
                                            </BoxNameDate>
                                            <>
                                                <TextStartInfo>
                                                    {list.name}&nbsp;{list.air_date ? `of ${tvTitle} premiered on` : null}
                                                    {list.air_date ? (
                                                        <>
                                                            <br/>
                                                            {`${month[parseInt(list.air_date.split("-")[1]-1)]} ${list.air_date.split("-")[2]}, ${list.air_date.split("-")[0]}`}
                                                        </>
                                                    ) : null}
                                                </TextStartInfo>
                                                {list.overview ? (
                                                    <TextListOverview>
                                                        {list.overview.length > 200 ? `${list.overview.substring(0,150)}...` : list.overview}
                                                    </TextListOverview>) : null}
                                            </>
                                        </BoxListText>
                                    </WrapList>
                                </Link>
                            </ListSeason>
                        ))}
                    </ListSeasons>
                </WrapDim>
            ) : null}
        </NavSeason>
    )
}

NaviSeason.propTypes = {
    prev_season : PropTypes.object, 
    id : PropTypes.number,
    setIsList : PropTypes.func,
    next_season : PropTypes.object,
    isList : PropTypes.bool,
    geSeason : PropTypes.array,
    tvTitle : PropTypes.string
}


export default NaviSeason;