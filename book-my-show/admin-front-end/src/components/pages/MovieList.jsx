import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import FilterTags from '../common/FilterTags'
import MovieCard from '../common/MovieCard'
import axios from 'axios'
import './MovieList.css'

function MovieList () {
  let languages = [
    { label: 'English', value: 'English', isSelected: false },
    { label: 'Tamil', value: 'Tamil', isSelected: false },
    { label: 'Telungu', value: 'Telungu', isSelected: false },
    { label: 'Kannada', value: 'Kannada', isSelected: false },
    { label: 'Hindi', value: 'Hindi', isSelected: false },
    { label: 'Malayalam', value: 'Malayalam', isSelected: false },
    { label: 'Bengali', value: 'Bengali', isSelected: false }
  ]

  let movieGenres = [
    { label: 'Drama', value: '1', isSelected: false },
    { label: 'Action', value: '2', isSelected: false },
    { label: 'Comedy', value: '3', isSelected: false },
    { label: 'Adventure', value: '4', isSelected: false },
    { label: 'Thriller', value: '5', isSelected: false },
    { label: 'Sci-Fi', value: '6', isSelected: false },
    { label: 'Fantasy', value: '7', isSelected: false },
    { label: 'Period', value: '8', isSelected: false },
    { label: 'Romantic', value: '9', isSelected: false },
    { label: 'Horror', value: '10', isSelected: false },
    { label: 'Documentary', value: '11', isSelected: false }
  ]

  let dimensions = [
    { label: '2D', value: '2D', isSelected: false },
    { label: '3D', value: '3D', isSelected: false },
    { label: '4DX', value: '4DX', isSelected: false },
    { label: '4DX 3D', value: '4DX 3D', isSelected: false },
    { label: 'IMAX 3D', value: 'IMAX 3D', isSelected: false },
    { label: 'IMAX 2D', value: 'IMAX 2D', isSelected: false },
    { label: 'MX4D 3D', value: 'MX4D 3D', isSelected: false },
    { label: 'MX4D', value: 'MX4D', isSelected: false },
    { label: '2D SCREEN X', value: '2D SCREEN X', isSelected: false },
    { label: '3D SCREEN X', value: '3D SCREEN X', isSelected: false }
  ]

  let selectedOptions = {
    Categories: { Selected: [] },
    Languages: { Selected: [] },
    Dimensions: { Selected: [] }
  }

  const [options, setOptions] = useState(selectedOptions)
  const [movies, setMovies] = useState([])
  const [movieCatelog, setMovieCatelog] = useState('Present')

  const searchCatelogLabels = [
    {
      id: 1,
      label: 'Future',
      imgSrc: (
        <img
          src='https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/coming-soon-web-collection-202012090733.png'
          alt=''
          width='100%'
          height='100%'
        />
      )
    },
    {
      id: 2,
      label: 'Present',
      imgSrc: (
        <img
          src='https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/now-showing-web-collection-202012090733.png'
          alt=''
          width='100%'
          height='100%'
        />
      )
    }
  ]
  const [searchCatelogFor, setsearchCatelogFor] = useState(
    searchCatelogLabels.filter(cat => cat.label !== movieCatelog)[0]
  )
  useEffect(() => {
    if (movieCatelog === 'Present') {
      // TO Do: Need to display movies available for Shows in current city
      axios
        .post('/movies/recommended_movies')
        .then(response => {
          console.log(response.data.movieList)
          setMovies(response.data.movieList)
          var catelogFor = searchCatelogLabels.filter(
            cat => cat.label !== movieCatelog
          )[0]
          setsearchCatelogFor(catelogFor)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      axios
        .post('/movies/upcoming_movies')
        .then(response => {
          console.log(response.data.movieList)
          setMovies(response.data.movieList)

          var catelogFor = searchCatelogLabels.filter(
            cat => cat.label !== movieCatelog
          )[0]
          setsearchCatelogFor(catelogFor)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [movieCatelog])

  async function onFilterSelect (filterName, optSelected) {
    console.log(`Parent Control-${filterName}`)
    //console.log(filterName, optSelected);

    selectedOptions[filterName].Selected = optSelected
      .filter(opt => opt.isSelected)
      .map(opt => opt.value)
    console.log(selectedOptions[filterName].Selected)

    setOptions(selectedOptions)
    console.log(options)
  }

  let handleMovieCatelogSearch = () => {
    if (movieCatelog === 'Present') setMovieCatelog('Future')
    else setMovieCatelog('Present')
  }
  const filterTabs = [
    {
      id: 1,
      label: 'Languages',
      description: (
        <FilterTags
          filterTags={languages}
          filterName='Languages'
          onFilterSelect={onFilterSelect}
        />
      )
    },
    {
      id: 2,
      label: 'Genres',
      description: (
        <FilterTags
          filterTags={movieGenres}
          filterName='Categories'
          onFilterSelect={onFilterSelect}
        />
      )
    },
    {
      id: 3,
      label: 'Format',
      description: (
        <FilterTags
          filterTags={dimensions}
          filterName='Dimensions'
          onFilterSelect={onFilterSelect}
        />
      )
    }
  ]

  return (
    <div className='row content-padding'>
      <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>
        <div>
          <h4 className='header-font'>Filters</h4>
        </div>
        {filterTabs.map(tab => (
          <Accordion key={tab.id} defaultActiveKey={tab.id}>
            <Accordion.Item eventKey={tab.id}>
              <Accordion.Header>{tab.label}</Accordion.Header>
              <Accordion.Body>{tab.description}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>
      <div className='col-lg-9'>
        <h4 className='header-font'>Movies Now</h4>

        <div className='row dv-search-movie' onClick={handleMovieCatelogSearch}>
          <div className='col-12'>{searchCatelogFor.imgSrc}</div>
        </div>

        <div className='row'>
          {movies.map(movie => (
            <div key={movie._id} className='col-lg-3 card-margin-bm'>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList
