import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Poster from "../../Components/Poster";


const Container = styled.div`
  padding: 20px;
`;

const MorePresenter = ({ loading, moreResult, moreLoading, onMorePage, isNow, isUpcoming, isPopular }) => {
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
                            isMovie={false}
                        />
                    ))
                }
                <button onClick={onMorePage}>++</button>
                </Section>    
            )}
            
            
            {moreLoading && (<Loader />)}
        </Container>
    )
}

export default MorePresenter;