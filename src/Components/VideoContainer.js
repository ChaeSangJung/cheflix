import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

const WrapVideoVisual = styled.div`
    position: relative;
    .swiper-slide {
        width: 420px;
        padding: 33px 0 33px;
    }
    .swiper-button-prev, .swiper-button-next {
        z-index: 10;
    }
`
const ItemVideo = styled.li`
    display: inline-block;
    width: 420px;
    padding: 33px 0 33px;
`
const TextTitle = styled.p`
    width: 100%;
    padding-bottom: 22px;    
    font-size: 15px;
    color: #333;
    text-align: left;
`
const VideoFrame = styled.iframe`
  width: 100%;
  height: 240px;
`;
const Dim = styled.div`
    z-index: 5;
    position:absolute;
    width: 164px;
    height: 240px;
    background: linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%);
    top: 70px;
    right: 0;
`

const VideoContainer = ({result}) => {
    return (
        <WrapVideoVisual>
            {result && result.videos.results.length > 0 && result.videos.results.length > 3 && (
                <Swiper 
                    tag="div" 
                    wrapperTag="div" 
                    id="videoSwiper"
                    spaceBetween={0} 
                    slidesPerView={"auto"}
                    navigation={true}
                    freeMode={true}
                >
                    <Dim></Dim>
                    {result.videos.results.map((video)=>(
                        video.site === 'YouTube' ? (
                            <SwiperSlide key={video.id}>
                                <TextTitle>
                                    {video.name}
                                </TextTitle>
                                <VideoFrame
                                    id={video.id}
                                    title={video.id}
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    allowFullScreen='allowFullScreen'
                                    frameBorder='0'
                                />
                            </SwiperSlide>
                        ) : null
                    ))}
                </Swiper>
            )}
            {result && result.videos.results.length > 0 && result.videos.results.length < 4 && (
                <ul>
                    {result.videos.results.map((video)=>(
                        video.site === 'YouTube' ? (
                            <ItemVideo key={video.id}>
                                <TextTitle>
                                    {video.name}
                                </TextTitle>
                                <VideoFrame
                                    id={video.id}
                                    title={video.id}
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    allowFullScreen='allowFullScreen'
                                    frameBorder='0'
                                />
                            </ItemVideo>
                        ) : null
                    ))}
                </ul>
            )}
        </WrapVideoVisual>
    )
}

export default React.memo(VideoContainer);