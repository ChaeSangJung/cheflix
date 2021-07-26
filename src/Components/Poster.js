import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import no_img from "assets/noPosterSmall.png"

import rating_star_home from './images/rating_star_home.png';

const Container = styled.div`
  font-size: 14px;
`;

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
  height: 200px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;
const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.5;
    }
  }
  &:hover {    
    span {
      opacity: 1;
    }
  }
`;
const Title = styled.span`
  display: block;
  margin-bottom: 3px;
  font-size: 14px;
  line-height: 1.4;
`;
const TextDetail = styled.span`
  position: absolute;  
  display: block;
  width: 100%;
  padding: 30px 0 30px;
  margin-top: -37px;
  text-align: center;
  top: 50%;
  opacity: 0;
  transition: all 0.2s linear;
`;
const BoxYearRate = styled.div`
  font-size: 0;
  text-align: left;
`;
const TextYear = styled.span`
  display: inline-block;
  font-size: 14px;
  vertical-align: top;
`;
const BoxRating = styled.div`
  display: inline-block;
  margin-top: 2px;
  margin-left: 5px;
  vertical-align: top;
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
  width: ${(props)=>(props.bgWidth > 0 ? `${props.bgWidth}%` : "0px")};
  height: 10px;
  background-image: url(${rating_star_home});
  background-position: 0 -20px;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
`;
const TextRating = styled.span`
  display: inline-block;  
  margin-left: 5px;
  font-size: 14px;
  vertical-align: top;
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : no_img
          }
        /> 
        <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}><TextDetail>View Detail</TextDetail></Link>
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <BoxYearRate>
        <TextYear>{year}</TextYear>
        <BoxRating>
          <BoxOuter>
            <BoxInner bgWidth={rating*10}></BoxInner>
          </BoxOuter>          
        </BoxRating>
        <TextRating>{rating}/10</TextRating>
      </BoxYearRate>
    </Container>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,  
};

export default Poster;
