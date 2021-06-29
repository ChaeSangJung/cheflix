import React from "react";
import CastingDetail from "./CastingDetail";
import styled from "styled-components";

const OuterCast = styled.div`
  padding-top: 60px;
  font-size: 0;
`;


const CastingContainer = ({casts}) => {
    
    return (
        <OuterCast>
            {casts && casts.cast.length > 0 && 
                casts.cast.map((crew) =>(
                    <CastingDetail key={crew.credit_id} crew={crew}/>
                ))
            }
        </OuterCast>
    )
}

export default CastingContainer;