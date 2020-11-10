import React from "react";
import styled from "styled-components";

const WrapText = styled.div``;
const TextConponent = styled.p`
    font-size: 15px;
    color: #333;
    line-height: 1.6;
`;

const VideoComponets = ({ name }) => (
    <WrapText>
        <TextConponent>{name.length > 50 ? `${name.substring(0, 50)}...` : name}</TextConponent>
    </WrapText>
  );
      
  export default VideoComponets;