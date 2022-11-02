import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/common/Sidebar';
import AdminMovieList from './components/admin/MovieList';
import Settings from './components/admin/Settings/Settings';
import Dashboard from './components/admin/Dashboard';
import Customers from './components/admin/Customers';
import BookingList from './components/admin/BookingList';
import ShowList from './components/admin/ShowList';

import UserNavbar from './components/common/UserNavbar';
import MyBookingList from './components/pages/BookingList';
import MovieList from './components/pages/MovieList';

import { ThemeProvider, createTheme  } from '@mui/material/styles';


function App () {

  const theme = createTheme ({
    palette: {

      primary: {
        main: '#e0454c'
      },
      secondary: {
        main: '#323436'
      },
      reset:{
        main:"#5c6268"
      }
    },
  });

const [userRole, setUserRole]=useState(2);

  return (
    <ThemeProvider theme={theme}>
    <Router>
{
    userRole === 1 ? 
    <UserNavbar> 
      
      <Routes>
        <Route path='/' element={<MovieList />} />
        <Route path='/movies' element={<MovieList/>} />
        <Route path='/bookings' element={<MyBookingList/>} />
      </Routes>
      </UserNavbar>
 
      :

<Sidebar>
        
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />         
          <Route path='/settings' element={<Settings />} />          
          <Route path='/shows' element={<ShowList/>} />
          <Route path='/bookings' element={<BookingList/>} />
          <Route path='/movies' element={<AdminMovieList />} />
          <Route path = '/edit-movie/:id' element={<Settings activeTab="Movie" />}/>
          <Route path='/customers' element={<Customers/>} />

          {/* <Route path = '/edit-student/:id' element={<EditStudent/>}/> */}
        </Routes>
      
    </Sidebar>
}

      
      
    </Router>
    </ThemeProvider>
  )
}

export default App
