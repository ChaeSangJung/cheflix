import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import SwiperContent from "../../Components/SwiperContent"

import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, Autoplay} from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Container = styled.div`
  padding: 20px;
`;
const WrapVisual = styled.div``
const HomePresenter = ({ 
  nowPlaying, 
  popular, 
  upcoming, 
  loading, 
  error,
  nowSwipe,
  upSwipe
}) => {
  return (
    <>
      <Helmet title="Movies | Nomflix"/>
      {loading ? (<Loader />):(
        <>
          <WrapVisual>
            <Swiper 
              tag="div" 
              wrapperTag="div" 
              id="mainMovieVisual"
              navigation 
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              spaceBetween={0} 
              slidesPerView={1}
            >
              {nowSwipe.arr && nowSwipe.arr.length > 0 && (
                nowSwipe.arr.map((now)=>(
                  <SwiperSlide key={`now_${now.id}_${Date.now()}`}>
                    <SwiperContent content={now} isMovie={true} title={nowSwipe.title}/>
                  </SwiperSlide>
                ))
              )}
              {upSwipe.arr && upSwipe.arr.length > 0 && (
                upSwipe.arr.map((up)=>(
                  <SwiperSlide key={`now_${up.id}_${Date.now()}`}>
                    <SwiperContent content={up} isMovie={true} title={upSwipe.title}/>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </WrapVisual>
          <Container>
            <Helmet title="Movies | Nomflix" />
            {nowPlaying && nowPlaying.length > 0 && (
              <Section  title="Now Playing" link="/now_more" isHome={true}>
                {nowPlaying.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.original_title}
                    rating={movie.vote_average}
                    year={movie.release_date.substring(0, 4)}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {upcoming && upcoming.length > 0 && (
              <Section title="Upcoming Movies">
                {upcoming.map((movie)=>(
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.original_title}
                    rating={movie.vote_average}
                    year={movie.release_date.substring(0, 4)}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {popular && popular.length > 0 && (
              <Section title="Popular Movies">
                {popular.map((movie)=>(
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.original_title}
                    rating={movie.vote_average}
                    year={movie.release_date ? movie.release_date.substring(0, 4) : null}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {error && <Message color="#e74c3c" text={error} />}
          </Container>
        </>
      )}
    </>
  )
  
};

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  year: PropTypes.string,
};

export default HomePresenter;
