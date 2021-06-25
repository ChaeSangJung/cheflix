import React from "react";
import styled from "styled-components";

const WrapDetail = styled.div`
    font-size: 14px;
    color: #333;
`
const Btn = styled.button`
    font-size: 14px;
    color: #333;
`

const CastingDetail = ({ crewLoading, persons, setIsClick }) => {
    return (
        crewLoading ? null : (
            <WrapDetail>
                {persons.name}
                {persons.biography}
                {persons.birthday}
                {persons.deathday}
                {persons.gender} 
                {/* 1 female */}
                {persons.homepage}
                {persons.known_for_department}
                {persons.place_of_birth}
                {persons.popularity}
                {persons.profile_path}
                <Btn onClick={()=>{setIsClick(false)}}>x</Btn>
            </WrapDetail>
        )
    )
}

export default CastingDetail