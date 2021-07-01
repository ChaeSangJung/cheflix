import React from "react";
import styled from "styled-components"
import {Link} from "react-router-dom";

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-image: url(${(props)=>(props.bgImg)});
    background-size: cover;
    background-position: center center;
`
const InnerWrap = styled.div`
    position: absolute;    
    width: 210px;
    top: 35px;
    left: 74px;
    text-align: right;
`
const WrapPoster = styled.div`
    overflow: hidden;
    position: relative;    
    border-radius: 12px;
`
const BoxPoster = styled.div`    
    width: 210px;
    img {
        width: 100%;
    }
`
const TextTitle = styled.p`
    position: absolute;
    font-size: 20px;
    font-weight: 700;
    color: ${(props)=>(props.title === "Now Playing" ? "#ffc600" : props.title === "Upcoming" ? "#134ca1": "#fff")};
    top: 12px;
    left: 10px;
    text-shadow: 2px 2px 1px ${(props)=>(props.title === "Now Playing" ? "#8c6d02" : props.title === "Upcoming" ? "#0a2752": "#fff")};
`
const TextContTitle = styled.p`
    position: absolute;
    font-size: 16px;
    color: #fff;
    bottom: 18px;
    left: 10px;
    text-shadow: 2px 2px 0 rgb(242 242 242 / 60%);
`
const GoLink = styled(Link)`
    display: inline-block;
    margin-top: 9px;
    padding: 5px 14px 5px;
    background-color: #e73f3f;
    border-radius: 5px;
`
const TextMore = styled.span`
    font-size: 13px;
    color: #f7f0f0;
`
const SwiperContent = ({content, title, isMovie}) => {
    return(
        <Wrap bgImg={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}>
            <InnerWrap>
                <WrapPoster>
                    <TextTitle title={title}>{title}</TextTitle>
                    <BoxPoster>
                        <img src={`https://image.tmdb.org/t/p/w300${content.poster_path}`} alt={content.original_title}/>
                    </BoxPoster>
                    <TextContTitle>{content.original_title}</TextContTitle>
                </WrapPoster>
                
                <GoLink to={isMovie ? `/movie/${content.id}` : `/show/${content.id}`}>
                    <TextMore>view more</TextMore>
                </GoLink>
            </InnerWrap>
        </Wrap>
    )
}

export default SwiperContent;