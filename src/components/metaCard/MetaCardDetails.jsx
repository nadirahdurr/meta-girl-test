import React, {useState} from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";

const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.5em 6px 0 6px;
  line-height: 1.4;
`;


export function MetaCardDetails(props) {

  return (
    <DetailsContainer>
      <Marginer direction="vertical" margin="1.2em" />
    </DetailsContainer>
  );
}