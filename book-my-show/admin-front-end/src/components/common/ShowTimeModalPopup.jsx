import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TimePicker from 'react-bootstrap-time-picker';
import  './ModalPopup.css';

function ShowTimeModalPopup(props) {
  
  const defaultShowTime = "09:00 AM";
  const initialShowTime = "12:00 AM";

  

    const [show, setShow] = useState(false);
    const [time, setTime] = useState(0);

    const [selectedTime, setSelectedTime] = useState(initialShowTime);
   // const [showTimes,setShowTimes]=useState([defaultShowTime]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    const handleTimeChange = (time) => {
      // console.log(time);     // <- prints "3600" if "01:00" is picked
       var sec_num = parseInt(time, 10); 
       var hours   = Math.floor(sec_num / 3600);
       var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
     
       var ampm = hours >= 12 ? 'PM' : 'AM';
       
      
       hours = hours % 12;
       hours = hours ? hours : 12; // the hour '0' should be '12'
     
       if (hours   < 10) {hours   = "0"+hours;}
       if (minutes < 10) {minutes = "0"+minutes;}
     
         setTime(time);
         setSelectedTime(hours+':'+minutes + ' ' + ampm);
     }


function addSelectedShow(){
  console.log(selectedTime)
       if(!props.showTimings.includes(selectedTime)){

        
        props.showTimings.push(selectedTime);
        console.log(props.showTimings)
        // setShowTimes( showTimes);
        // console.log(showTimes);
         props.selectedShowTimeCallback(props.showTimings);
       }        
       else
         console.log("Show time already added")
 
}
     
  return (
    <div>
    <Button type='button' className='btn btn-default'  onClick={handleShow}>  Open Modal</Button> 
    
<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='form-group'>
              <label htmlFor='showTimes'>Show Times</label>

              <div className="row" style={{alignItems: "center"}}>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <TimePicker start="00:00" end="24:00"  step={15} value={time} onChange={handleTimeChange}/>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Button type="button" className='btn btn-default' onClick={addSelectedShow}>                            
                            +
                          </Button>
              </div>
              </div>
          </div> 

          <div className='row'>
          <div className='col-12'>
            <label htmlFor='screen-list'>Added Show Times</label>
            <div className='row'>               
                  {props.showTimings.length > 0 ? 
      ( 
        props.showTimings.map((showTime, index)=>
         {
           return <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>                             
            <div key={index} className='show-time-display'>
              <label style={{width:"80px"}}> {showTime} </label>
              <button type='button' className='btn show-time-remove-btn'>X</button>
              </div>
            </div>
          })
      ) : ("")
                 }                
              </div>

          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="button" className='btn btn-default'> Add Shows </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default ShowTimeModalPopup
