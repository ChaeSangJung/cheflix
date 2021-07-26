import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Credit from "Components/Credit"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

const Container = styled.div`    
    width: 100%;
    position: relative;
    padding: 50px;
`;
const Content = styled.div`
    display: flex;
    position: relative;
    margin-top: 35px;
    width: 100%;  
    z-index: 5;
`;
const Cover = styled.div`
    width: 260px;
    height: 360px;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;
const WrapData = styled.div`
    width: calc(100% - 150px);
    margin-left: 30px;
`;
const WrapTitle = styled.div`
    font-size: 0;
    text-align:left;
`;
const TextTitle = styled.span`
    display: inline-block;
    vertical-align: top;
    font-size:22px;
    color: #fff;
`;
const TextSamll = styled.span`
    font-size: 14px;
`
const GoImdb = styled.a`
    display: inline-block;
    padding: 5px 12px 5px;
    margin-left: 10px;
    color: #333;
    background-color: #fff;
    vertical-align: top;
    font-size:12px;
`
const Icon = styled.i`
    margin-left: 6px;
    font-size: 14px;
    color: ${({ gender }) => (gender === 1 ? "#ffae00" : gender === 0 || gender === 2 ? "#0036ff": "#333")};
`
const ItemContainer = styled.div`
    margin-top: 20px;
    width: 53%;
`;
const Item = styled.span`
    font-size: 17px;
    line-height: 1.6;
    color: #fff;
    &+span {
        margin-left: 15px;
    }
`;
const Overview = styled.p`
    margin-top: 25px;
    font-size: 14px;
    line-height: 1.6;
    width: 50%;
`;
const WrapImg = styled.div`
    margin-top: 70px;
`;
const ListImg = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, calc(100%/12));
    gap: 25px;
`;
const CoverImg = styled.div`
    width: 100%;
    height: ${(props)=>`${props.xHeight}px`};
    background-image: url(${(props)=>props.imgurl});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`;
const WrapCast = styled.div`
    width: 1000px;
    margin-top: 15px;
    .swiper-slide {
        width: 200px;
    }
`;
const TextSubTitle = styled.strong`
    font-size: 20px;
`;
const WrapDim = styled.div`
    z-index: 10;
    overflow: hidden;
    position: fixed;
    display: table;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
`;
const WrapInner = styled.div`
    display: table-cell;
    vertical-align: middle;
    text-align: center;
`;
const BoxContent = styled.div`
    overflow-y: auto;
    position: relative;
    display: inline-block;
    width: 600px;
    height: 400px;    
    background: rgba(0,0,0,0.5);
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
const BoxBg = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
    background-image: url(${(props) => props.backImg ? `https://image.tmdb.org/t/p/original${props.backImg}` : null });
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, center;
    filter: blur(5px);
    -webkit-filter: blur(5px);
`;
const DivContent = styled.div`
    position: relative;
    width: 94%;
    margin: 3% auto 3%;
    padding: 20px 15px 20px;
    border: 3px solid #fff;
    box-sizing: border-box;
    text-align: left;
`;
const DivUpper = styled.div`
    font-size: 0;
    text-align: left;
`;
const WrapLeft = styled.div`
    display: inline-block;
    width: 170px;
`;
const BoxPoster = styled.div`
    display: block;
    width: 100%;
    height: 255px;
    background-image: url(${(props) => props.bgImg ? `https://image.tmdb.org/t/p/w300${props.bgImg}` : require("../../../src/assets/noPosterSmall.png")});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;    
    border: 5px solid #d4e8f5;
    border-radius: 5px;
    box-sizing: border-box;
`;
const WrapText = styled.div`
    display: inline-block;
    width: calc(100% - 190px);
    margin-left: 20px;
    vertical-align: top;
`;
const BoxTexts = styled.div`
    display: block;
    width: 100%;
    padding: 25px 10px 25px;    
    background-color: rgba(0,0,0,0.3);
    border: 1px solid #fff;
    border-radius: 5px;
    box-sizing: border-box;
`;
const BoxOverView = styled(BoxTexts)`
    margin-top: 15px;
`;
const TextOverView = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #fff;
`;
const TextPopTitle = styled.p`
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    &+p {
        margin-top: 12px;
    }
`;
const TextPopName = styled(TextPopTitle)`
    font-weight: 400;
`;
const BoxBtns = styled.div`
    margin-top: 20px;
`;
const BtnClose = styled.button`
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    .fas {
        font-size: 20px;
        color : #fff;
    }
`;
const LinkGo = styled(Link)`
    display: inline-block;
    margin-left: 20px;
    .fas {
        font-size: 16px;
        color : #fff;
    }
`

const PesrsonPresenter = ({
    loading, 
    personResult, 
    olds, 
    profileImg, 
    height, 
    measuredRef,     
    getData,
    tvCredit,
    movieCredit,
    creditLoading,
    creditData,
    setIsPop,
    isPop,
    linkto,
    }) => {
    
    return (
        loading ? 
        <>
            <Helmet title="Loading | Cheflix" />
            <Loader />
        </>
        :
        <Container>
            <Helmet title={`${personResult.name} | Cheflix`} />

            <Content>
                <Cover
                    bgImage={
                    personResult.profile_path
                    ? `https://image.tmdb.org/t/p/original${personResult.profile_path}`
                    : require("../../assets/noPosterSmall.png")
                    }            
                />
                <WrapData>
                    <WrapTitle>
                        <TextTitle>
                            {personResult.name && personResult.name}
                            <Icon 
                                gender={personResult.gender} 
                                className={`${personResult.gender === 1 ? "fas fa-venus" : personResult.gender === 0 || personResult.gender === 2 ? "fas fa-mars" : null}`}>
                            </Icon> 
                        </TextTitle>
                        {personResult.imdb_id 
                            ? <GoImdb href={`https://www.imdb.com/name/${personResult.imdb_id}`} rel='noopener noreferrer' target='_blank'>IMDB</GoImdb>
                            :null
                        }
                        {personResult.homepage ? (
                            <GoImdb href={personResult.homepage} rel='noopener noreferrer' target='_blank'>Homepage</GoImdb>
                        ) : null}
                    </WrapTitle>
                    
                    <ItemContainer>
                        {personResult.also_known_as ? (
                            <Item>
                                {personResult.also_known_as.map((known, index)=>(
                                    index === personResult.also_known_as.length - 1
                                    ? known
                                    : `${known} / `
                                ))}
                            </Item>
                        ) : null}
                    </ItemContainer>
                    <ItemContainer>
                        {personResult.known_for_department && (
                            <Item>{personResult.known_for_department}</Item>
                        )}
                        {personResult.popularity && (
                            <Item>{personResult.popularity}</Item>
                        )}
                    </ItemContainer>
                    <ItemContainer>
                        {personResult.place_of_birth && (
                            <Item>{personResult.place_of_birth}</Item>
                        )}
                    </ItemContainer>
                    <ItemContainer>
                        {personResult.birthday || personResult.deathday ? 
                            (
                            !personResult.deathday ? (
                                <Item>{personResult.birthday}&nbsp;<TextSamll>({`${olds} years`})</TextSamll></Item>
                            ) : (
                                <Item>{personResult.birthday}&nbsp;~&nbsp;{personResult.deathday}&nbsp;<TextSamll>({`${olds} years`})</TextSamll></Item>
                            )
                            )
                        : null}
                    </ItemContainer>
                    {personResult.biography ? (
                        <Overview>{personResult.biography}</Overview>
                    ) : null}
                </WrapData>
            </Content>
            
            {/* movie credit */}
            {movieCredit && (movieCredit.cast.length > 0 || movieCredit.crew.length > 0) && (
                <WrapImg>
                    {movieCredit.cast && movieCredit.cast.length>0 && (
                        <>
                            <TextSubTitle>Movie Casting({movieCredit.cast.length})</TextSubTitle>
                            <WrapCast>
                                <Swiper 
                                    tag="div" 
                                    wrapperTag="div" 
                                    id="movieSwiper"
                                    spaceBetween={0}
                                    slidesPerGroup={5}
                                    slidesPerView={"auto"}
                                    navigation={true}
                                    freeMode={true}
                                >
                                    {movieCredit.cast.map((cas)=>(
                                        <SwiperSlide key={cas.credit_id}>
                                            <Credit 
                                                credit={cas} 
                                                isMovie={true} 
                                                getData={getData}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </WrapCast>
                        </>
                    )}
                </WrapImg>
            )}

            {/* tv credit */}
            {tvCredit && tvCredit.length > 0 && (
                <WrapImg>
                    <TextSubTitle>TV Casting({tvCredit.length})</TextSubTitle>
                    <WrapCast>
                        <Swiper
                            tag="div" 
                            wrapperTag="div" 
                            id="showSwiper"
                            spaceBetween={0}
                            slidesPerGroup={5}
                            slidesPerView={"auto"}
                            navigation={true}
                            freeMode={true}
                        >
                            {tvCredit.map((tv)=>(
                                <SwiperSlide key={tv.credit_id}>
                                    <Credit 
                                        credit={tv}
                                        isMovie={false}
                                        getData={getData}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </WrapCast>
                </WrapImg>
            )}

            {/* images */}
            {profileImg && profileImg.length > 0 && (
                <WrapImg>
                    <ListImg>
                        {profileImg.map((img)=>(
                            <li key={img.file_path.split(".")[0].substring(1)}>
                                <CoverImg imgurl={`https://image.tmdb.org/t/p/w300${img.file_path}`} xHeight={height} ref={measuredRef}>
                                </CoverImg>
                            </li>
                        ))}
                    </ListImg>
                </WrapImg>
            )}
            {isPop ? (
                <WrapDim>
                    {creditLoading ? "loading" : (
                        <WrapInner className="dim">
                            <BoxContent>
                                <BoxBg backImg={creditData.backdrop_path}></BoxBg>
                                <DivContent>
                                    <DivUpper>
                                        <WrapLeft>
                                            <BoxPoster bgImg={creditData.poster_path}></BoxPoster>
                                            <BoxBtns>
                                                <BtnClose onClick={()=>{setIsPop(false)}}>
                                                    <i className="fas fa-times"></i>
                                                </BtnClose>
                                                <LinkGo to={linkto === "movie" ? `/movie/${creditData.id}` : linkto === "show" ? `/show/${creditData.id}` : `/person/${personResult.id}`}>
                                                    <i className="fas fa-link"></i>
                                                </LinkGo>
                                            </BoxBtns>
                                        </WrapLeft>
                                        <WrapText>
                                            <BoxTexts>
                                                <TextPopTitle>{creditData.title || creditData.name ? creditData.title ? creditData.title : creditData.name : null}</TextPopTitle>
                                                {creditData.status 
                                                    ? (<TextPopName>{creditData.status} {creditData.release_date ? `(${creditData.release_date.split("-")[0]})`: null}</TextPopName>) 
                                                    : null
                                                }
                                                {creditData.genres && creditData.genres.length > 0 && (
                                                    <TextPopTitle>
                                                    {creditData.genres.map((genre, index)=>(
                                                        (<span key={genre.id}>{index !==0 ? ", " : null}{genre.name}</span>)
                                                    ))}    
                                                    
                                                    </TextPopTitle>
                                                )}
                                            </BoxTexts>
                                            {creditData.overview ? (
                                                <BoxOverView>                                                
                                                    <TextOverView>{creditData.overview.length > 200 ? `${creditData.overview.substring(0,200)}...` : creditData.overview}</TextOverView>
                                                </BoxOverView>
                                            ) : null}
                                        </WrapText>
                                    </DivUpper>
                                </DivContent>
                            </BoxContent>
                        </WrapInner>
                    )}
                </WrapDim>
            ) : null}
        </Container>
    )
}

PesrsonPresenter.propTypes = {
    loading : PropTypes.bool,
    personResult : PropTypes.object,
    olds : PropTypes.number,
    profileImg : PropTypes.array,
    height: PropTypes.number,
    measuredRef: PropTypes.func,
    movieCredit : PropTypes.object,
    tvCredit : PropTypes.array,    
    isPop: PropTypes.bool,
    getData : PropTypes.func,
    setIsPop : PropTypes.func,
    creditLoading : PropTypes.bool,
    creditData : PropTypes.object,
}

export default PesrsonPresenter;