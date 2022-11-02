import React, { useState } from 'react'
import Cinema from './ManageTheatre';
import City from './ManageCity';
import Movie from './ManageMovie';
import Show from './ManageShow';

import { GiTheater } from 'react-icons/gi'
import { FaFilm, FaCity } from 'react-icons/fa'
import { RiMovie2Fill } from 'react-icons/ri';


import './Settings.css'

function Settings (props) {

  function handleClose() {   
    setActiveLink(0);
    setTabContent("");
  }


  const navTabs = [
    {
      tabId: 'city-tab',
      name: 'City',
      icon: <FaCity />,
      selected: true,
      id: 1,
      content: <City onClose={handleClose}/>,
      className: 'tile city-tile'
    },
    {
      name: 'Theatre',
      tabId: 'theatre-tab',
      icon: <GiTheater />,
      selected: false,
      id: 2,
      content: <Cinema onClose={handleClose}/>,
      className: 'tile theatre-tile'
    },
    {
      name: 'Movie',
      tabId: 'movie-tab',
      icon: <FaFilm />,
      selected: false,
      id: 3,
      content: <Movie onClose={handleClose}/>,
      className: 'tile movie-tile'
    },
    {
      name: 'Show',
      tabId: 'shot-tab',
      icon: <RiMovie2Fill />,
      selected: false,
      id: 4,
      content: <Show onClose={handleClose}/>,
      className: 'tile show-tile'
    }
  ]

let activeTabId = props.activeTab ? navTabs.filter(tab=>tab.name === props.activeTab)[0].id : 0;
let activeTabContent = props.activeTab ? navTabs.filter(tab=>tab.name === props.activeTab)[0].content : "";

 const [activeLink, setActiveLink] = useState(activeTabId);
 const [tabContent, setTabContent] = useState(activeTabContent);
  
 const handleTileClick = id => {
    setActiveLink(id);
    setTabContent(navTabs.filter(tab=>tab.id === id)[0].content);
    
  };

  return (
    <>
      <h2 className='header'>CTMS Management</h2>

      <div className='row'>
      <div className='col-lg-10 col-md-9 col-sm-12 col-xs-12 '>      
        {tabContent}
      </div>
        <div className='col-lg-2 col-md-3 col-sm-12 col-xs-12 '>
          <div className={activeLink === 0 ? 'row tile-container': 'row tile-container--view'}>
{navTabs.map(tab=> {

    return <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12' key={tab.tabId}>
    <div className={ activeLink === tab.id ? `${tab.className} tile--active` :  tab.className} onClick={()=>handleTileClick(tab.id)}>
      <h2 className='card-title'>{tab.name}</h2>
      <div className='tile-icon'>
        {tab.icon}
      </div>
    </div>
  </div>
  })
}
          </div>
        </div>
       
      </div>

     

      {/* <ul className='nav nav-pills' role='tablist'>
        {1
            return <>
              <li className='nav-item' role='presentation'>
                <button
                onClick={()=>handleClick(tab.id)}
                  className={             
                    (tab.id === activeTab ? "nav-link active" : "nav-link")
                  }
                  id={tab.tabId}
                  data-bs-toggle='tab'
                  data-bs-target={`#${tab.tabContentId}`}
                  type='button'
                  role='tab'
                  aria-controls={tab.tabContentId}
                  aria-selected={tab.selected}>
                  {tab.name}
                </button>
              </li>
            </>
          })
        }
      </ul> */}
      {/* <div className='tab-content'>
        
        <City activeTabId={activeTab}/>
        <Cinema activeTabId={activeTab}/>
        <Movie activeTabId={activeTab}/>
      </div> */}
    </>
  )
}

export default Settings
