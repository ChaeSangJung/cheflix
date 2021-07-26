import React from "react";
import { useSelector } from 'react-redux';

const Examplecontainer = () => {
    const xxx  = useSelector(state => (state.searchReducer));
    console.log(xxx);

    return (
        <div>exmaple</div>
    )
}

export default Examplecontainer;