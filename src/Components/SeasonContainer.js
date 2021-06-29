import React from "react";
import SeasonDetail from "./SeasonDetail";

const SeasonContainer = ({title, id, result}) => {
    // 
    return (
        <>
            {result && result.seasons.length > 0 &&
                result.seasons.map((season) =>(
                    <SeasonDetail title={title} id={id} season={season}/>
                ))
            }
        </>
    )
}

export default SeasonContainer;