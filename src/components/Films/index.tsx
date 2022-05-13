import React from "react";
import styled from "styled-components";


interface FilmProps {
  title: string;
  releaseDate: string;
  onClick: () => void;
}

const Film = (props: FilmProps) => {

  return (
    <FilmsContainer onClick={props.onClick}>
      <Name>{props.title}</Name>
      <ReleaseDate>{props.releaseDate}</ReleaseDate>
    </FilmsContainer>
  );
}

export default Film;

const FilmsContainer = styled.div`
  width: 100%;
  min-height: 6em;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px 8px;
  cursor: pointer;
`;


const Name = styled.h3`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const ReleaseDate = styled.span`
  color: #a1a1a1;
  font-size: 16px;
  display: flex;
  flex: 0.2;
  margin-left: 10px;
`;
