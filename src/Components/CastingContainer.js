import React, {useEffect, useState } from "react";
import { crewApi } from "../api";
import CastingDetail from "./CastingDetail";
import styled from "styled-components";
import user from './images/user.png';

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