import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import VideoComponets from "Components/VideoComponets";

import { useTabs } from "../../hooks";
import img_star from './images/rating_star.png';
import user from './images/user.png';

const Container = styled.div`
  height: calc(100vh - 50px);
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
const BannerDiv = styled.div`
  width: 100%;
  height: 300px;  
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-repeat : no-repeat;
  background-size : cover;
`;
const Cover = styled.div`
  width: 160px;
  height: 250px;
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
const GoImdb = styled.a`
  display: inline-block;
  padding: 5px 12px 5px;
  margin-left: 10px;
  color: #333;
  background-color: #fff;
  vertical-align: top;
  font-size:12px;
`
const ItemContainer = styled.div`
  margin-top: 20px;
`;
const Item = styled.span`
  font-size: 17px;
  color: #fff;
  &+span {
    margin-left: 15px;
  }
`;
const TextStatus = styled.span`
  font-size: 17px;
  color: #fff;
`;
const Overview = styled.p`
  margin-top: 25px;
  font-size: 14px;
  line-height: 1.6;
  width: 50%;
`;
const TabWrap = styled.div`
  position: relative;
  font-size: 0;
  text-align: left;
`;
const TabButton=styled.button`
  display: inline-block;  
  width: ${props => (props.isMovie ? "150px" : "100px")};
  padding: 7px 13px 7px;
  border-bottom: 1px solid #f8f8f8;
  border-top: 1px solid ${props => (props.isActive ? "#d7d7d7" : "transparent")};
  border-left: 1px solid ${props => (props.isActive ? "#d7d7d7" : "transparent")};
  border-right: 1px solid ${props => (props.isActive ? "#d7d7d7" : "transparent")};
  background: ${props => (props.isActive ? "#f8f8f8" : "#dfdfdf")};
  vertical-align: top;  
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
`;
const TabWrapContent=styled.div`
  position: relative;
  padding-bottom: 80px;
  padding-left: 20px;
  background-color: #f8f8f8;
  box-sizing: border-box;
`;
const BoxStarOuter = styled.div`
  position: relative;
  display: inline-block;
  width: 75px;
  height: 15px;
  margin-left: 20px;
  background-image: url(${img_star});
  background-position: 0 0;
  background-repeat: no-repeat;
  vertical-align: top;
`;
const BoxStarInner = styled.div`
  position: absolute;
  width: 100%;
  height: 15px;
  background-image: url(${img_star});
  background-position: 0 -20px;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
`;
const TextRating = styled.span`
  display: inline-block;
  margin-left: 7px;
  font-size: 12px;
  vertical-align: bottom;
`;
const WrapTabsContent = styled.div`
  margin-top: 40px;
  padding-bottom: 150px;
`;
const VideoFrame = styled.iframe`
  width: 420px;
  height: 240px;
`;
const WrapVideoFrame = styled.div`
  margin-top: 15px;
`;
const WrapVideoOuter = styled.div`
  font-size: 0;
  text-align: left;
`;
const WrapVideoInner = styled.div`
  display: inline-block;
  width: 420px;
  padding-top: 30px;
  vertical-align: top;
  &+div {
    margin-left: 20px;
  }
`;
const ListCompany = styled.ul`  
  &:after {
    content:"";
    display:block;
    width:0;
    height:0;
    overflow:hidden;
    clear:both;
  }
`;
const ItemCompany = styled.li`
  display: block;
  padding: 25px 20px 25px;
`;
const BoxImages = styled.div`
  display: inline-block;
  vertical-align: top;
`;
const Images = styled.img`
  width: auto;
  height: 20px;
`;
const TextCompany = styled.span`
  display: inline-block;
  margin-left: 7px;
  font-size: 17px;
  color: #333;
  line-height: 20px;
  vertical-align: top;
`;
const OuterCast = styled.div`  
  display: grid;
  padding-top: 60px;
  grid-template-columns: repeat(auto-fill,140px);
  grid-gap: 20px;
`;
const WrapCast = styled.div``;
const BoxCastImage = styled.div`
  width: 100%;
  height: 210px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const TextCrewName = styled.p`
  margin-top: 7px;
  font-size: 15px;
  font-weight: 700;
  color: #333;
`;
const TextCharacterName = styled.p`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #333;
`;
const WrapSeasons = styled.div`
  display: grid;
  padding-top: 60px;
  grid-template-columns: repeat(auto-fill,200px);
  grid-gap: 20px;
`;
const BoxSeasons = styled.div``;
const BoxPosterSeasons = styled.div`
  overflow: hidden;
  img {
    width: auto;
    height: 300px;
  }
`;
const TextSasonName = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #fff;
  text-align: left;
`;

const DetailPresenter = ({ result, loading, error, isMovie, imdb_id, casts }) => {

  const movies = [
    {
      id: 1,
      tabs: "Cast",
      content: 
      <OuterCast>
        {casts && casts.cast.length > 0 && 
          casts.cast.map(crew =>
            <WrapCast key={crew.credit_id}>
              <BoxCastImage>
                {
                  crew.profile_path ? 
                    <img src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`} alt={crew.name}/> :
                    <img src={user} alt={crew.name}/>  
                }
              </BoxCastImage>
              <div>
                <TextCrewName>{crew.name}</TextCrewName>
                <TextCharacterName>{crew.character}</TextCharacterName>
              </div>
            </WrapCast>
        )}
      </OuterCast>
    },
    {
      id: 2,
      tabs: "Videos",
      content:
      <WrapVideoOuter>
        {result && result.videos.results.length > 0 &&
          result.videos.results.map(i => i.site === 'YouTube' ?
              <WrapVideoInner key={i.id}>
                <VideoComponets name={i.name} />
                <WrapVideoFrame>
                  <VideoFrame
                    id={i.id}
                    key={i.id}
                    title={i.id}
                    src={`https://www.youtube.com/embed/${i.key}`}
                    allowFullScreen='allowFullScreen'
                    frameBorder='0'
                  />
                </WrapVideoFrame>          
              </WrapVideoInner>
          : null)}
        </WrapVideoOuter>
    },
    {
      id: 3,
      tabs: "Companies",
      content: 
      <ListCompany>
        {result && result.production_companies.length > 0 &&
          result.production_companies.map(company =>
            <ItemCompany key={company.id}>
              <BoxImages>
                {company.logo_path ?
                  <Images src={`https://image.tmdb.org/t/p/original/${company.logo_path}`} alt={company.name}/>
                  :
                  null
                }
              </BoxImages>
              <TextCompany>{company.name}</TextCompany>
            </ItemCompany>
          )
        }
      </ListCompany>
    }, 
  ]

  const tvShowes = [    
    {
      id: 1,
      tabs: "Cast",
      content: 
      <OuterCast>
        {casts && casts.cast.length > 0 && 
          casts.cast.map(crew =>
            <WrapCast key={crew.credit_id}>
              <BoxCastImage>
                {
                  crew.profile_path ? 
                    <img src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`} alt={crew.name}/> :
                    <img src={user} alt={crew.name}/>  
                }
              </BoxCastImage>
              <div>
                <TextCrewName>{crew.name}</TextCrewName>
                <TextCharacterName>{crew.character}</TextCharacterName>
              </div>
            </WrapCast>
        )}
      </OuterCast>
    },
    {
      id: 2,
      tabs: "Videos",
      content:
      <WrapVideoOuter>
        {result && result.videos.results.length > 0 &&
          result.videos.results.map(i => i.site === 'YouTube' ?
              <WrapVideoInner key={i.id}>
                <VideoComponets name={i.name} type={i.type} />
                <WrapVideoFrame>
                  <VideoFrame
                    id={i.id}
                    key={i.id}
                    title={i.id}
                    src={`https://www.youtube.com/embed/${i.key}`}
                    allowFullScreen='allowFullScreen'
                    frameBorder='0'
                  />
                </WrapVideoFrame>          
              </WrapVideoInner>
          : null)}
        </WrapVideoOuter>
    },
    {
      id: 3,
      tabs: "Companies",
      content: 
      <ListCompany>
        {result && result.production_companies.length > 0 &&
          result.production_companies.map(company =>
            <ItemCompany key={company.id}>
              <BoxImages>
                {company.logo_path ?
                  <Images src={`https://image.tmdb.org/t/p/original/${company.logo_path}`} alt={company.name}/>
                  :
                  null
                }
              </BoxImages>
              <TextCompany>{company.name}</TextCompany>
            </ItemCompany>
          )
        }
      </ListCompany>
    },
  ]

  const {currentItem, changeItem} = useTabs(0, isMovie ? movies : tvShowes);  
  const [active, setActivity] =useState(1);


  

  return (
    loading ?  
      <>
        <Helmet>
          <title>Loading | Nomflix</title>
        </Helmet>
        <Loader />
      </>
    :
    
      <Container>
        <Helmet>
          <title>
            {result.original_title ? result.original_title : result.original_name}{" "}
            | Nomflix
          </title>
        </Helmet>

        <BannerDiv bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />        
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")
            }            
          />
          <WrapData>
            <WrapTitle>
              <TextTitle>                
                {result.original_title
                  ? result.original_title
                  : result.original_name}
              </TextTitle>
              <TextTitle>
                (
                  {result.release_date
                    ? result.release_date.substring(0, 4)
                    : result.first_air_date.substring(0, 4)}
                )
              </TextTitle>
              {result.imdb_id ? 
                <GoImdb href={`https://www.imdb.com/title/${result.imdb_id}`} rel='noopener noreferrer' target='_blank'>IMDB</GoImdb> 
                : 
                <GoImdb href={`https://www.imdb.com/title/${imdb_id}`} rel='noopener noreferrer' target='_blank'>IMDB</GoImdb>
              }
            </WrapTitle>
            
            {result.status ? 
              <ItemContainer>
                <TextStatus>{`${result.status}`}</TextStatus>
                <BoxStarOuter>
                  <BoxStarInner style={{width:`${result.vote_average*10}%`}}></BoxStarInner>
                </BoxStarOuter>
                <TextRating>{result.vote_average}/10</TextRating>
              </ItemContainer>
            : 
              null
            }
            <ItemContainer>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
              <Item>
                {isMovie ? 
                  result.genres &&
                    result.production_countries.map((country, index) =>
                      index === result.production_countries.length - 1
                        ? country.name
                        : `${country.name} / `
                    )
                :
                  result.origin_country
                }
                
              </Item>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]} min
              </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
          </WrapData>
        </Content>
        
        {isMovie ? null :
        <WrapSeasons>
          {result && result.seasons.length > 0 &&
            result.seasons.map(season =>
              <BoxSeasons key={season.id}>
                <BoxPosterSeasons>
                  <img src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt={season.name}/>
                </BoxPosterSeasons>
                <TextSasonName>{season.name && season.name > 10 ? `${season.name.substring(0, 10)}...` : season.name}</TextSasonName>
              </BoxSeasons>
            )
          }
        </WrapSeasons>
        }

        <WrapTabsContent>
        <>
          {isMovie ? (
              <>
                <TabWrap>
                {movies.map(( section, index ) => (
                  <TabButton 
                    key= {section.id}
                    isMovie = {isMovie}
                    isActive={active === section.id}
                    onClick={()=> {
                        changeItem(index);
                        setActivity(section.id)
                      }
                    }
                  > 
                    {section.tabs}
                  </TabButton>
                ))}
                </TabWrap>
                <TabWrapContent>{currentItem.content}</TabWrapContent>
              </>
            )
          : (
            <>
              <TabWrap>
              {tvShowes.map(( section, index ) => (
                <TabButton 
                  key= {section.id}
                  isMovie = {isMovie}
                  isActive={active === section.id}
                  onClick={()=> {
                      changeItem(index);
                      setActivity(section.id)
                    }
                  }
                > 
                  {section.tabs}
                </TabButton>
              ))}
              </TabWrap>
              <TabWrapContent>{currentItem.content}</TabWrapContent>
            </>
            )
          }
        </>
        </WrapTabsContent>
      </Container>
    
  );
}

  
    

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovie : PropTypes.bool, 
  imdb_id: PropTypes.string, 
  casts : PropTypes.object
};

export default DetailPresenter;