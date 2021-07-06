import React, { useState } from "react";
import CastingDetail from "./CastingDetail";
import CrewDetail from "./CrewDetail";
import styled from "styled-components";
import { crewApi } from "../api";
import { useAsync } from '../hooks';

const OuterCast = styled.div`
  padding-top: 60px;
  font-size: 0;
`;
const WrapPop = styled.div`
    z-index: 10;
    position: fixed;
    display: table;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
`
const InnerPop = styled.div`
    display: table-cell;
    vertical-align: middle;
    text-align: center;
`

const CastingContainer = ({casts}) => {
    const [isPop, setIsPop] = useState(false);

    const getCrew = async(id) => {
        setIsPop(true);
        const parseId = parseInt(id);    
        const {data : crewInfo} = await crewApi.getPerson(parseId);
        return crewInfo
    }

    const [state, refetch] = useAsync(getCrew, [], true);
    const { loading, data: crewInfoes, error } = state;

    if(error){
        console.log("error");
    }
    
    return (
        <> 
            <OuterCast>
                {casts && casts.cast.length > 0 && 
                    casts.cast.map((crew) =>(
                        <CastingDetail 
                            key={crew.credit_id} 
                            crew={crew} 
                            refetch={refetch}
                        />
                    ))
                }
            </OuterCast>
            {!isPop ? null : (
                <WrapPop>
                    <InnerPop>
                        {loading ? "loading" : (
                            <CrewDetail crewInfoes={crewInfoes} setIsPop={setIsPop}/>
                        )}
                    </InnerPop>
                </WrapPop>
            )}
            
        </>
    )
}

export default CastingContainer;