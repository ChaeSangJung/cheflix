import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Poster from "../../Components/Poster";


const Container = styled.div`
  padding: 20px;
`;

const MorePresenter = ({ loading, moreResult, moreLoading, onMorePage, isNow, isUpcoming, isPopular, page, totalPage }) => {
    return (        
        <Container>
            <Helmet 
                title = {`${isNow ? "Now Playing" : isUpcoming ? "Upcoming Movies" : isPopular ? "Popular" : null} | Nomflix`}
            />
            {loading && (<Loader />)}
            
            {moreResult && (
                <Section title="More Now Playing">
                {
                    moreResult.map((movie)=>(
                        // <div key={result.id}>{result.title}</div>
                        <Poster
                            key={movie.id}
                            id={movie.id}
                            imageUrl={movie.poster_path}
                            title={movie.original_title}
                            rating={movie.vote_average}
                            year={movie.release_date.substring(0, 4)}
                            isMovie={true}
                        />
                    ))
                }
                <button onClick={onMorePage}>
                    More+<br/>
                    <span>{`${isNow ? "Now Playing" : isUpcoming ? "Upcoming Movies" : isPopular ? "Popular" : null}`}</span><br/>
                    <span>{page}/{totalPage}</span>
                </button>
                </Section>    
            )}
            
            
            {moreLoading && (<Loader />)}
        </Container>
    )
}

export default MorePresenter;