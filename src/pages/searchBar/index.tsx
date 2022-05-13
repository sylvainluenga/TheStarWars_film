import React from 'react'
import styled from 'styled-components'
import { IoClose, IoSearch } from 'react-icons/io5'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from 'react-click-outside-hook'
import { useEffect } from 'react'
import { useRef } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'
import { useDebounce } from '../../hooks/debounceHook'
import axios from 'axios'
import Films from '../../components/Films'
import { withRouter } from 'react-router-dom'

const containerTransition = { type: 'spring', damping: 22, stiffness: 150 }

const SearchBar = ({ history }: any) => {
  const [isExpanded, setExpanded] = useState(false)
  const [parentRef, isClickedOutside] = useClickOutside()
  const inputRef = useRef()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [films, setFilms] = useState([])
  const [noFilms, setNoFilms] = useState(false)

  const isEmpty = !films || films.length === 0

  const changeHandler = e => {
    e.preventDefault()
    if (e.target.value.trim() === '') setNoFilms(false)

    setSearchQuery(e.target.value)
  }

  const expandContainer = () => {
    setExpanded(true)
  }

  const collapseContainer = () => {
    setExpanded(false)
    setSearchQuery('')
    setLoading(false)
    setNoFilms(false)
    setFilms([])
    //@ts-ignore
    if (inputRef.current) inputRef.current.value = ''
  }

  useEffect(() => {
    if (isClickedOutside) collapseContainer()
  }, [isClickedOutside])

  const prepareSearchQuery = query => {
    const url = `https://swapi.dev/api/films/?search=${query}`
    return encodeURI(url)
  }

  const searchFilms = async () => {
    if (!searchQuery || searchQuery.trim() === '') return

    setLoading(true)
    setNoFilms(false)

    const URL = prepareSearchQuery(searchQuery)

    const response = await axios.get(URL).catch(err => {
      console.log('Error: ', err)
    })

    if (response) {
      if (response.data && response.data.length === 0) setNoFilms(true)
      setFilms(response.data.results)
      localStorage.setItem("films", JSON.stringify(response.data.results));
    }

    setLoading(false)
  }

  useDebounce(searchQuery, 500, searchFilms)

  return (
    <SearchBarContainer
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput
          placeholder='Search for name/Films'
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key='close-icon'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeperator />}
      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading color='#000' size={20} />
            </LoadingWrapper>
          )}
          {!isLoading && isEmpty && !noFilms && (
            <LoadingWrapper>
              <WarningMessage>Start typing to Search</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && noFilms && (
            <LoadingWrapper>
              <WarningMessage>No name or Films found!</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && !isEmpty && (
            <>
              {films?.map((film) => (
                
                  <Films
                    title={film.title}
                    releaseDate={film.release_date}
                    onClick={() => { 
                      history.push({
                        pathname: '/viewSearch',
                        state: { film: film }
                    });
                    }
                    }
                  />
               
              ))}
            </>
          )}
        </SearchContent>
      )}
    </SearchBarContainer>
  )
}

export default withRouter(SearchBar);


const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`

const containerVariants = {
  expanded: {
    height: '30em'
  },
  collapsed: {
    height: '3.8em'
  }
}
