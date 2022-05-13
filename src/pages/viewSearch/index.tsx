import React from 'react'
import { withRouter } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import styled from 'styled-components';

const ViewSearch =({history}: any) => {
  const location = useLocation();
  const [film, setFilm] = React.useState(null)

  React.useEffect(() => {
    //@ts-ignore
    setFilm(location.state.film)
 }, [location]);

  return (
    <div style={{ 
      width:'100%', 
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
     <BackButton  onClick={()=> history.push('/')}>
        <p>BACK</p>
      </BackButton>
    <div style={{
      width: '50%',
    }}>

      <div>
        <h1>{film?.title}</h1>
        <OpeningText>{film?.opening_crawl}</OpeningText>
      </div>
      <div>
        <SubTitle>
          Created at : {film?.created}
        </SubTitle>
        <SubTitle>
          Release Date : {film?.release_date}
        </SubTitle>

        <SubTitle>Producer: {film?.producer}</SubTitle>
      <SubTitle>Director: {film?.director}</SubTitle>
      <SubTitle>Edited: {film?.edited}</SubTitle>
      </div>

    </div>
    </div>

  )
}

export default withRouter(ViewSearch);

const SubTitle = styled.p`
font-size: 12px;
font-weight: lighter;
`

const OpeningText = styled.p`
font-size: 14px;
font-weight: 400;
`
const BackButton = styled.button`
background-color: #000000;
color: #fff;
border: none;
font-size: 14px;
border-radius: 6px;
padding: 6px;
width: 150px;
cursor: pointer;
`
