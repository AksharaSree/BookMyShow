import React, { useEffect, useState } from 'react';
import axios from "axios";
import Select from 'react-select';
import { useFormik } from "formik";
import * as yup from "yup";
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { TiLocationArrowOutline } from 'react-icons/ti';
import TitleDisplay from '../../common/TitleDisplay';



export default function ManageTheatre(props) {

  const defaultShowTime = "09:00 AM";
  const initialShowTime = "12:00 AM";  

  const [show, setShow] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedTime, setSelectedTime] = useState(initialShowTime);


  const [id, setId] = useState("");
  const[cityId, setCityId] = useState("");
  const [mode,setMode]=useState("ADD");
  const [cities, setCities] = useState([]);
  const [theatres, setTheatres] = useState([]);

  const [showTimes,setShowTimes]=useState([defaultShowTime]);



  useEffect(() => {
    axios
      .get('/cities')
      .then((response) => {   
       // console.log(response)  
        var cityList = response.data.cityList.map(obj=> { return { label: obj.City, value: obj._id } });         
        
        //console.log(cityList);
        setCities(cityList);        
      });

      // axios
      // .get('/cinemas')
      // .then((response) => {   
       
      //   console.log(response.data.theatreList);
      //   setTheatres(response.data.theatreList);        
      // });

  },[]);

  let displayAddress = (id)=>{

  }

  let handleDelete = async (id) => {
    await axios
      .post('/cinemas/delete/' + id)
      .then(response => {
        console.log(response);

        axios
        .get('/cinemas/'+cityId)
        .then((response) => {          
         // console.log(response);
          setTheatres(response.data.theatreList);        
        }); 

      })
      .catch(error => {
        console.log(error)
      })
  }

 

  let handleEdit = (_id)=>{
 console.log(_id);
// console.log()
    setMode("EDIT");
    setId(_id);
   
    var editValues = theatres.filter(theatre=> theatre._id === _id)[0];
    console.log(editValues);
    formik.setFieldValue("TheatreName",editValues.TheatreName );
    formik.setFieldValue("Location",editValues.Location );
    formik.setFieldValue("Address",editValues.Address );
    formik.setFieldValue("City",editValues.City.City );
    formik.setFieldValue("ScreenCount",editValues.ScreenCount );
   // formik.setFieldValue("ShowTimes",editValues.ShowTimes);
   };


  let saveHandler = async (data) => {
    console.log(mode)
    console.log(data);
    try {
  
      if(mode==="ADD")
      {
       
        console.log("submit data", data)
          await axios
            .post("/cinemas/create", data)
            .then((response) => {
              console.log(response);
              //add success alert
            axios
              .get('/cinemas/'+cityId)
              .then((response) => {          
               
                setTheatres(response.data.theatreList);        
              });
            })
            .catch((error) => {
              console.log(error);
            });
  
           
        }   
        else{
console.log(id);
          await axios
            .post("/cinemas/update/" + id, data)
            .then((response) => {
             
              axios
              .get('/cinemas/'+cityId)
              .then((response) => {          
               //update success alert
                setTheatres(response.data.theatreList);        
              });
              setMode("ADD");setId("");
  
            })
            .catch((error) => {
              console.log(error);
            });
  
               
        }
    } catch (error) {
      console.log(error);
    }
  };


  function handleClose() {    
    props.onClose(0);
  }

  

  const formik = useFormik({
    initialValues: {
      City: "",
      Location: "",
      TheatreName: "",
      ScreenCount: 1,
      Address:"",
     // ShowTimes: [defaultShowTime]
    },
    validationSchema: yup.object({
      City: yup.string().required("City is required"),
      Location: yup.string().required("Location is required"),
      Address: yup.string().required("Address is required"),
      TheatreName: yup.string().required("Theatre name is required"),  
      ScreenCount: yup.number().min(1).required("Screen count is required"),  
      DateCreated: yup.date().default(function () {
        return new Date();
      })
     
    }),
    onSubmit: (values, {resetForm}) => {
     // console.log(values)
      saveHandler(values);
      resetForm({values:''});
      formik.setFieldValue("City", cityId);
      
      console.log("after reset",formik.values);
    } 
   
  });
const cityOnChange = async(selectedOption) =>{
  if(selectedOption.value!=="")
  {
      formik.setFieldValue("City", selectedOption.value);
      setCityId(selectedOption.value);

      await axios
          .get('/cinemas/'+selectedOption.value)
          .then((response) => {          
            console.log(response.data.theatreList);
            setTheatres(response.data.theatreList);        
          });    
      
    }
} 


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
   if(!showTimes.includes(selectedTime)){
    showTimes.push(selectedTime);
    console.log(showTimes)
    setShowTimes( showTimes);
    formik.setFieldValue("ShowTimes",showTimes );
   }        
   else
     console.log("Show time already added")

}


  return (<div className='tab-content' key="Theatre">
      <TitleDisplay Title="Manage Theatre" onClose={handleClose}/>    
      <form onSubmit={formik.handleSubmit} >

      <div className='row'>
          <div className='offset-lg-4  col-lg-4 offset-md-3 col-md-4 col-sm-12 col-xs-12'>
            <div className=''>
            
              <Select
                name="City" options={cities}      
                onChange={(selectedOption) => { cityOnChange(selectedOption)}}
                onBlur={formik.handleBlur}
                style={{ display: "block" }}
                placeholder={<div className="select-placeholder-text">-- Select City --</div>}  />
            </div>
          </div>
        </div> 


        <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>
              <label htmlFor='theatre'>Theatre Name</label>
              <input type='text' className='form-control' id='TheatreName' name="TheatreName" 
              autoComplete='off' placeholder="Enter Theatre Name" maxLength={50}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.TheatreName}/>
               {formik.touched.TheatreName && formik.errors.TheatreName ? (
                <div className='validation-message'>{formik.errors.TheatreName}</div>
              ) : null}
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>
              <label htmlFor='location'>Enter Location</label>
              <input type='text' className='form-control' id='Location' name="Location" 
              autoComplete='off' placeholder="Enter Location" maxLength={50}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Location}/>
               {formik.touched.Location && formik.errors.Location ? (
                <div className='validation-message'>{formik.errors.Location}</div>
              ) : null}
            </div>
          </div>          
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>
              <label htmlFor='screenCount'>No. of Screens</label>
              <input type='number' className='form-control' id='ScreenCount' name="ScreenCount" 
              autoComplete='off' placeholder="Enter Screen Count" maxLength={50}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.ScreenCount}/>
               {formik.touched.ScreenCount && formik.errors.ScreenCount ? (
                <div className='validation-message'>{formik.errors.ScreenCount}</div>
              ) : null}
            </div>
          </div>
              
        </div>

        <div className="row">
          <div className="col-12">
          <div className='form-group'>
              <label htmlFor='Address'>Address</label>
              <textarea  className='form-control' id='Address' name="Address" 
              autoComplete='off' placeholder="Enter Address" maxLength={500}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Address}/>
               {formik.touched.Address && formik.errors.Address ? (
                <div className='validation-message'>{formik.errors.Address}</div>
              ) : null}
            </div>
          </div>
        </div>

      {/* <Accordion defaultActiveKey="0">
  <Accordion.Item eventKey="0">
    <Accordion.Header>Theatre Info</Accordion.Header>
    <Accordion.Body>
    
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Show Timings</Accordion.Header>
    <Accordion.Body> */}
      {/* <div className="row">
      <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>

<div className='form-group'>
              <label htmlFor='showTimes'>Show Times</label>

              <div className="row" style={{alignItems: "center"}}>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <TimePicker start="00:00" end="24:00"  step={15} value={time} onChange={handleTimeChange}/>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
             
                <button type="button" className='btn btn-default' onClick={addSelectedShow}>                            
                 +
                </button>
              </div>
              </div>
          </div> 
          </div>
      </div>

      <div className='row'>
          <div className='col-12'>
            <label htmlFor='screen-list'>Added Show Times</label>
            <div className='row'>               
                {formik.values.ShowTimes.length > 0 ? 
                  ( 
                    formik.values.ShowTimes.map((showTime, index)=>
                    {
                      return <div className='col-lg-2 col-md-2 col-sm-12 col-xs-12'>                             
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
        </div> */}

     

        <div className='row'>
          <div className='col-12 btn-align'>
            <button type='submit' className='btn btn-default'>
              {mode === 'ADD' ? 'Add' : 'Update'}
            </button>
            <button type='reset' className='btn btn-cancel'
             onClick={() => {
              formik.handleReset()
              setMode('ADD')
            }}>
              Reset
            </button>
          </div>
        </div>
      </form>     

      <div className='row'>
        <div className='col-12'>
          <table className='table table-striped table-dark table-responsive'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Theatre Name</th>
               
                {/* <th scope='col'>Screen Count</th> */}
                {/* <th scope='col'>Location</th> */}
                <th scope='col'>City</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
              theatres !== undefined && theatres.length > 0 ? 
              
              theatres.map((obj, index) => {
                return (
                  <tr key={index + 1}>
                    <th scope='row'>{index + 1}</th>
                    <td>{obj.TheatreName}</td>
                    {/* <td>{obj.Location}</td> */}
                    {/* <td>{obj.ScreenCount}</td> */}
                    <td>{obj.City.City}</td>
                    <td>
                    <span
                        className='action-icon' title='View Address'
                        onClick={() => displayAddress(obj._id)}>                       
                        <TiLocationArrowOutline />
                      </span>
                    
                      <span
                        className='action-icon'
                        onClick={()=>handleEdit(obj._id)}>
                      
                        <RiEdit2Line />
                      </span>
                      <span
                        className='action-icon'
                        onClick={() => handleDelete(obj._id)}>
                        
                        <RiDeleteBin6Line />
                      </span>
                    </td>
                  </tr>
                )
              }) : <tr key="0">
              
              <td colSpan="4">No records found</td>             
            </tr>
            
            
            }
            </tbody>
          </table>
        </div>
      </div>

    </div>
    
  )

}
