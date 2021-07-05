import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

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


const PesrsonPresenter = ({loading, personResult, olds, profileImg}) => {
    console.log(profileImg)
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
                    {personResult.biography && (
                        <Overview>{personResult.biography}</Overview>
                    )}
                </WrapData>
            </Content>

            {/* images */}
            <div>
                <ul>
                    {profileImg.map((img, index)=>(
                        <li key={img.file_path.split(".")[0].substring(1)}>
                            <img src={`https://image.tmdb.org/t/p/w300${img.file_path}`} alt={`${personResult.name} ${index + 1}`} />
                        </li>
                    ))}
                    
                </ul>
            </div>
        </Container>
    )
}

PesrsonPresenter.propTypes = {
    loading : PropTypes.bool,
    personResult : PropTypes.object,
    olds : PropTypes.number,
    profileImg : PropTypes.array
}

export default PesrsonPresenter;