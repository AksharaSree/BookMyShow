import React,{useState} from 'react';
import {FaCog, FaFilm, FaBars, FaUsers } from 'react-icons/fa';
import { TiTicket } from "react-icons/ti";
import { RiMovie2Fill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import logo from '../images/Bookmyshow-logo.jpg';

import { Link } from 'react-router-dom';
import  './Sidebar.css';

function Sidebar({children}) {
const [isNavLinkOpen, setNavLinkOpen] = useState(false);

const toggle = ()=> setNavLinkOpen(!isNavLinkOpen);

const closeNavBar = ()=> {
  if(isNavLinkOpen)
    setNavLinkOpen(!isNavLinkOpen);
}
const menuItem = [{
  id:1,
  path:"/dashboard",
  name:"Dahsboard",
  icon:<MdSpaceDashboard/>
  
},
{
  id:2,
  path:"/bookings",
  name:"Bookings",
  icon:<TiTicket/>,
  active:false
},
{
  id:3,
  path:"/customers",
  name:"Customers",
  icon:<FaUsers/>,
  active:false
},
{
  id:4,
  path:"/settings",
  name:"MTS Management",
  icon:<FaCog/>,
  active:false
},
{
  id:5,
  path:"/movies",
  name:"Movies",
  icon:<FaFilm/>,
  active:false
},{
  id:6,
  path:"/shows",
  name:"Shows",
  icon:<RiMovie2Fill/>,
  active:false
}
];


const [activeLink, setActiveLink] = useState(1);
const handleClick = id => {
  setActiveLink(id);
  setNavLinkOpen(false);
};

  return (
    <div className='admin-container'>
      <div className={isNavLinkOpen?"sidebar sidebar--open":"sidebar sidebar--close"}>
        <div className="top-section">
          <div className="logo" style={{display:isNavLinkOpen?"block":"none"}}> 
          
         
          <img src={logo} alt="book my show" className='logo-img'></img>
          
          </div>
          <div className={isNavLinkOpen?"bars":"bars bars--close"}>
            <FaBars onClick={toggle}/>
          </div>
        </div>
        <ul>

        {
          menuItem.map(item=>{return (
 
            <li onClick={()=>handleClick(item.id)} key={item.id}>
            <Link to={item.path} key={item.id}  className={             
              (item.id === activeLink ? "link link-active" : "link")
            }>
              <div className="icon">{item.icon}</div>
              <div className={isNavLinkOpen?"link_text link_text--display":"link_text link_text--hide"}
              >{item.name}</div>
            </Link>

            </li>
          )           }
          
          )
        }

</ul>
      </div>
      <div className='main-content' onClick={closeNavBar}>{children}</div>
    </div>
  )
}

export default Sidebar
