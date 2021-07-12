import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WrapLink = styled.div`
    display: block;
    width: 100%;
    padding: 5px 5px 5px;
    box-sizing: border-box;
`;
const CoverPoster = styled.div`
    width: 100%;
    height: 300px;
    background-image: url(${(props)=>(props.imgUrl)});
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
`;
const BoxText = styled.div`
    margin-top: 10px;
`;
const TextAllType = styled.p`
    font-size: 13px;
    line-height: 1.6;
`;

const Credit = ({ credit, isMovie, getData }) => {
    return(
        <>
            <WrapLink>
                
                <CoverPoster
                    imgUrl={
                        credit.poster_path ? `https://image.tmdb.org/t/p/w300${credit.poster_path}` : require("../assets/noPosterSmall.png")
                    }
                    onClick={()=>{getData(credit.id, isMovie)}}
                />
                
                <BoxText>
                    <TextAllType>{
                        credit.original_title  ? credit.original_title 
                        : credit.original_name ? credit.original_name
                        : null

                    }</TextAllType>
                </BoxText>

                <Link to={isMovie ? `/movie/${credit.id}` : `/show/${credit.id}`}></Link>
            </WrapLink>
        </>
    )
}

export default Credit;