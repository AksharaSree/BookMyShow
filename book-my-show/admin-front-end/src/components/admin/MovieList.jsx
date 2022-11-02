import React, {useEffect, useState} from 'react';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';

import axios from "axios";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {Button} from '@mui/material';
import './admin.css';
import './MovieList.css';
import { useNavigate } from "react-router-dom";

function MovieList () {
 
  const [movies, setMovies] = useState([]);
 // const [movieCatelog, setMovieCatelog] = useState('Present');

  const [startDate, setStartDate] = useState(new Date().setMonth(new Date().getMonth() - 3));
  const [endDate, setEndDate] = useState(new Date().setMonth(new Date().getMonth() + 3));
  const [searchText, setSearchText] = useState('');

let navigate = useNavigate();
let handleSearch = async() =>{

var searchValues = {
  "FromDate": startDate,
  "ToDate": endDate,
  "MovieName": searchText
}

        await axios
          .post('/movies/search/', searchValues)
          .then(response => {
            //console.log(response)
            console.log(response.data.movieList)
            setMovies(response.data.movieList)
          })
          .catch(error => {
            console.log(error)
          })

}

let formatDate = function(dateProperty) {
  const newDate = new Date(dateProperty);
  
  let formattedDate = `${ `0${ newDate.getDate() }`.slice(-2) }/`;
      formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }/`;  // for double digit month
      formattedDate += `${ newDate.getFullYear() }`;        // for double digit day
  return formattedDate;
}

  useEffect(() => {

   // handleSearch();

    // if (movieCatelog === 'Present') {
    //   // TO Do: Need to display movies available for Shows in current city
    //   axios
    //     .post('/movies/recommended_movies')
    //     .then(response => {
    //       console.log(response.data.movieList)
    //       setMovies(response.data.movieList)

    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // } else if (movieCatelog === 'Future') {
    //   axios
    //     .post('/movies/upcoming_movies')
    //     .then(response => {
    //       console.log(response.data.movieList)
    //       setMovies(response.data.movieList)

    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }
  })


  let handleEdit = _id => {

  };

  let handleDelete = _id => {

  };
  return (

    <div className='master-content'>
    <h2 className='header'>Movie List</h2>
    {/* <div className="row">
      <div className='col-lg-3 col-md-3 col-sm-2 col-xs-2'>
         <label htmlFor='PresentMovies'> Present Movies</label>
      </div>
      <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
            <BootstrapSwitchButton
              checked={false} //off
              onlabel='Present'
              onstyle='light'
              offstyle='secondary'
              offlabel='Upcoming'
              style='w-50 mx-3'
              // onChange={(checked) => {
              //     this.setState({ isUserAdmin: checked })
              // }}
            />
          </div>
          <div className='col-lg-3 col-md-3 col-sm-2 col-xs-2'>
            <label htmlFor='UpcomingMovies'> Upcoming Movies</label>
          </div>
    </div> */}
   
   <div className='row'>
      <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>            
             
              <input type='text' className='form-control' name="MovieName" value={searchText}
                autoComplete='off' placeholder="Search for Movies" onChange={(e)=> setSearchText(e.target.value) } />
             
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{color:"white"}}>
            <Button variant="contained" color="primary" onClick={handleSearch}>Advanced Search</Button>
  
          </div>
      </div>

      <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <div className='form-group'>
              <label htmlFor='FromDate'> From Date</label>
                <DatePicker name="FromDate"  
                    dateFormat="dd/MM/yyyy" className='form-control'
                    selected={startDate}
                    onChange={(date) => { setStartDate(date) }}
                        placeholderText="Select From Date"
                    />           
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <div className='form-group'>
              <label htmlFor='ToDate'> To Date</label>
                <DatePicker name="ToDate"  
                    dateFormat="dd/MM/yyyy" className='form-control'
                    selected={endDate}
                    onChange={(date) => { setEndDate(date) }}
                        placeholderText="Select To Date"
                    />           
            </div>
          </div>
      </div>

      

<div className="row">
  <div className="col-12" style={{color:"white"}}>
  <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
  <Button variant="contained" color="reset">Clear</Button>
  </div>
</div>
        {
            movies.length > 0 ?

            <div className='row'>
        <div className='col-12'>
          <table className='table table-striped table-dark table-responsive'>
            <thead>
              <tr>
                <th scope='col'>Movie Name</th>                
                <th scope='col'>Release Date</th>
                <th scope='col'>Languages</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((obj, index) => {
                return (
                  <tr key={obj._id}>
                    <td>{obj.MovieName}</td>
                    <td>{ formatDate(obj.ReleaseDate)}</td>
                    <td>{obj.Languages.join(",")}</td>
                   
                    <td>
                      {' '}
                      <span
                        className='action-icon'
                        // onClick={() => handleEdit(obj._id)}
                        
                          onClick={() => {
                            navigate("/edit-movie/" + obj._id);
                          }}
                      >
                        {' '}
                        <RiEdit2Line />{' '}
                      </span>
                      <span
                        className='action-icon'
                        onClick={() => handleDelete(obj._id)}
                      >
                        {' '}
                        <RiDeleteBin6Line />{' '}
                      </span>{' '}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div> : ""
        }

      

    </div>
  )
}

export default MovieList
