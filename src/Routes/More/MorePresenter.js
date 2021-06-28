import React from "react";
import Loader from "../../Components/Loader";
import styled from "styled-components";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 20px;
`;

const MorePresenter = ({ loading, moreResult, moreLoading, onMorePage, isNow, isUpcoming, isPopular }) => {
    return (        
        <Container>
            <Helmet 
                title = {`${isNow ? "Now Playing" : isUpcoming ? "Upcoming Movies" : isPopular ? "Popular" : null}{" "}| Nomflix`}
            />
            {loading && (<Loader />)}
            {moreResult && (
                moreResult.map((result)=>(
                    <div key={result.id}>{result.title}</div>
                ))
            )}
            <button onClick={onMorePage}>++</button>
            {moreLoading && (<Loader />)}
        </Container>
    )
}

export default MorePresenter;