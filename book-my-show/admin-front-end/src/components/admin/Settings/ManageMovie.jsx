
import TitleDisplay from '../../common/TitleDisplay';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ManageMovie(props) {

 let movieGenres = [
  {label: "Drama", value: "1"},
  {label: "Action", value: "2"},
  {label: "Comedy",value: "3"},
  {label: "Adventure", value: "4"},
  {label: "Thriller", value: "5"},
  {label: "Sci-Fi",value: "6"},
  {label: "Fantasy", value: "7"},
  {label: "Period", value: "8"},
  {label: "Romantic",value: "9"},
  {label:"Horror",value: "10" },
  {label:"Documentary",value: "11" }
 ];


  let languages = [
    {label: "Tamil", value: "Tamil"},
    {label: "Telungu", value: "Telungu"},
    {label: "Malayalam",value: "Malayalam"},
    {label: "Kannada", value: "Kannada"},
    {label: "Hindi", value: "Hindi"},
    {label: "English", value: "English"}

  ];


  let dimensions = ["2D", "3D"];
  // let censorCategories = ["U", "UA", "A"];

let selectedOptions = {
  "Categories": {"Selected":[], "OptionType": "multiple"},
  "Languages":  {"Selected":[], "OptionType": "multiple"},
  "Dimensions":  {"Selected":[], "OptionType": "multiple"},
  "CensorCertification": {"Selected":[], "OptionType": "single"},
};


 const [options, setOptions] = useState(selectedOptions);

 const [id, setId] = useState('');
 const [mode, setMode] = useState('ADD')
 

 const params = useParams();
 let navigate = useNavigate();

 let datePickerEnabledDate = new Date();
 datePickerEnabledDate.setMonth(datePickerEnabledDate.getMonth() - 3);
 const [releaseDate, setReleaseDate] = useState(new Date());
 
 let saveHandler = async data => {
  try {

    console.log(mode);
    if (mode === 'ADD') {
      await axios
        .post('/movies/create', data)
        .then(response => {
          console.log(response)
          // axios.get('/movies').then(response => {
          //   setMovies(response.data.movieList)
          // })
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      await axios
        .post('/movies/update/' + id, data)
        .then(response => {
          console.log(response)
          // axios.get('/movies').then(response => {
          //   setMovies(response.data.movieList)
          // })
          setMode('ADD')
          setId('')
          navigate("/movies/");
        })
        .catch(error => {
          console.log(error)
        })
    }
  } catch (error) {
    console.log(error)
  }
}


  function handleClose() {    
    props.onClose(0);
  }

 let movieDetail = {
  MovieName: "",
  MoviePosterUrl: "",
  ReleaseDate: "",
  RunningTime: "",
  CensorCertification: "",
  Categories:[],
  Languages:[],
  Dimensions : []
};

  const formik = useFormik({
    initialValues: movieDetail,
    validationSchema: yup.object({
      MovieName: yup.string().required("Movie Name is required"),
      MoviePosterUrl: yup.string().url().required("Poster Url is required"),
      ReleaseDate: yup.date().required("Release Date is required"),
      RunningTime: yup.string().required("Running time is required"),  
      CensorCertification: yup.array().min(1, "Select a censor category").required("Select a censor category"),
      Categories: yup.array().min(1,"Atleaset one movie category required").required("Atleaset one movie category required"),
      Languages: yup.array().min(1, "Atleaset one movie language required").required("Atleaset one movie language required"),  
      Dimensions : yup.array().min(1, "Select atleaset one movie dimension").required("Atleaset one movie dimension required"),  
      DateCreated: yup.date().default(function () {
        return new Date();
      })
     
    }),
    onSubmit: (values, {resetForm}) => {
     // console.log(values)
      saveHandler(values);
      resetForm({values:''});
     
     formik.setFieldValue("Categories", []);
     formik.setFieldValue("Languages", []);
     formik.setFieldValue("Dimensions", []);

     console.log("after reset",formik.values);
    } 
   
  });
  
  useEffect(() => {
 
    if(params.id && params.id !== ""){
      
      let getMovieDetail=async()=>{
        await axios.get('/movies/'+ params.id).then(response => {
          console.log(response.data);
        
          
         // setId(params.id);
          //setMode('EDIT');
          console.log(response.data.movie)
          formik.setFieldValue('MovieName', response.data.movie.MovieName)
          formik.setFieldValue('RunningTime', response.data.movie.RunningTime)
          formik.setFieldValue('ReleaseDate', response.data.movie.ReleaseDate)
          formik.setFieldValue('ReleaseDate', response.data.movie.ReleaseDate)
          formik.setFieldValue('Categories', response.data.movie.Categories)
          formik.setFieldValue('Dimensions', response.data.movie.Dimensions)
          formik.setFieldValue('Languages', response.data.movie.Languages)
          formik.setFieldValue('MoviePosterUrl', response.data.movie.MoviePosterUrl)
          if(response.data.movie.CensorCertification)
            formik.setFieldValue('CensorCertification', [response.data.movie.CensorCertification])
             
        }) 
        
      }
  
      getMovieDetail()
     
    }
  },[params.id]);

  let formatDate = function(dateProperty) {
    const newDate = new Date(dateProperty);
    
    let formattedDate = `${ `0${ newDate.getDate() }`.slice(-2) }/`;
        formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }/`;  // for double digit month
        formattedDate += `${ newDate.getFullYear() }`;        // for double digit day
    return formattedDate;
  }

  const optionOnChange = (e, type) =>{
    if(e.target.checked)
    {
        console.log(e.target.value);

        if(options[type].OptionType === "multiple")
            options[type].Selected.push(e.target.value);  
        else 
            options[type].Selected = [e.target.value];               
                   
        setOptions(options);
        console.log(options)
       formik.setFieldValue(type,options[type].Selected );       
       
    }
    else{
        console.log(e.target.value);
        if(options[type].OptionType === "multiple")
        {
          let index = options[type].Selected.findIndex( element => element ===  e.target.value);
          options[type].Selected.splice(index,1); 
        }
        setOptions(options);         
        console.log(options);
        formik.setFieldValue(type,options[type].Selected );       
    }
  } 

  return (<div className='tab-content'>
      <TitleDisplay Title="Manage Movie" onClose={handleClose}/>    
      <form onSubmit={formik.handleSubmit} >

      <div className='row input-form-row'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>
            <label htmlFor='MovieName'>Movie Name</label>
            <input type='text' className='form-control' id='MovieName' name="MovieName"  
              onBlur={formik.handleBlur} placeholder="Enter Movike Name"
              onChange={formik.handleChange}
              value={formik.values.MovieName} />
                {formik.touched.MovieName && formik.errors.MovieName ? (
                <div className='validation-message'>{formik.errors.MovieName}</div>
              ) : null}
          </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>
            <label htmlFor='Dimensions'></label>               
            <div className='row'>
              {dimensions.map((dimension,idx) => (
                <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6" key={`dimension-${idx}`}>
                  <label className="form-check-label my-1">
                    <input type='checkbox' className="form-check-input" name="Dimensions"  value={dimension}
                              checked={formik.values.Dimensions.includes(dimension)}
                              onBlur={formik.handleBlur}              
                              onChange={e=>optionOnChange(e,"Dimensions")}
                    />  
                    <span className="mx-2">{dimension}</span>
                  </label>     
                </div>
              ))}
            </div>
          </div>
           {formik.touched.Dimensions && formik.errors.Dimensions ? (
                <div className='validation-message'>{formik.errors.Dimensions}</div>
              ) : null}
          </div>               
        </div>



       <div className="row input-form-row">
       <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>
              <label htmlFor='RunningTime'>Running Time</label>
              <input type='text' className='form-control' id='RunningTime' name="RunningTime"   
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.RunningTime}   />
               {formik.touched.RunningTime && formik.errors.RunningTime ? (
                <div className='validation-message'>{formik.errors.RunningTime}</div>
              ) : null}
            </div>
          </div>

          <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>
            <div className='form-group'>
              <label htmlFor='ReleaseDate'> Release Date</label>
              {/* <input type='text' className='form-control' id='ReleaseDate' name="ReleaseDate" 
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.ReleaseDate}/> */}

              <DatePicker name="ReleaseDate"  onBlur={formik.handleBlur}
                dateFormat="dd/MM/yyyy" className='form-control'
                selected={releaseDate} value={formatDate(formik.values.ReleaseDate)}
                onChange={(date) => { setReleaseDate(date); formik.setFieldValue("ReleaseDate", date);}}
                minDate={datePickerEnabledDate} placeholderText="Select a date"
              />
              {formik.touched.ReleaseDate && formik.errors.ReleaseDate ? (
                <div className='validation-message'>{formik.errors.ReleaseDate}</div>
              ) : null}
            </div>
          </div>
       </div>
      <div className="row input-form-row">
        <div className="col-12">      
                <div className='form-group'>
                  <label htmlFor='MoviePosterUrl'> Movie Poster Url</label>
                  <input type='text' className='form-control' name="MoviePosterUrl" 
                  id='MoviePosterUrl' onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.MoviePosterUrl}/>
                   {formik.touched.MoviePosterUrl && formik.errors.MoviePosterUrl ? (
                <div className='validation-message'>{formik.errors.MoviePosterUrl}</div>
              ) : null}
                </div>
          
        </div>
      </div>

      <div className="row input-form-row">
        <div className="col-12">      
                <div className='form-group'>
                  <label htmlFor='CensorCategory'> Censor Category</label>

                  <div className='row'>
                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <label className="my-1" >
                    <input type='radio' className='form-check-input' name="CensorCertification" 
                  onBlur={formik.handleBlur}
                  onChange={e=>optionOnChange(e,"CensorCertification")}      
                  checked={formik.values.CensorCertification.indexOf("U")===0}
                  value="U"/>
                   <span className="mx-2">U</span>
                    </label>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <label className=" my-1" >
                    <input type='radio' className='form-check-input' name="CensorCertification" 
                  onBlur={formik.handleBlur}
                  onChange={e=>optionOnChange(e,"CensorCertification")}      
                  checked={formik.values.CensorCertification.indexOf("UA")===0}
                  value="UA"/>
                   <span className="mx-2">UA</span>
                    </label>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <label className=" my-1" >
                    <input type='radio' className='form-check-input' name="CensorCertification" 
                  onBlur={formik.handleBlur}
                  onChange={e=>optionOnChange(e,"CensorCertification")}      
                  checked={formik.values.CensorCertification.indexOf("A")===0}
                  value="A"/>
                   <span className="mx-2">A</span>
                    </label>
                    </div>
                  </div>
                  
                   {formik.touched.CensorCertification && formik.errors.CensorCertification ? (
                <div className='validation-message'>{formik.errors.CensorCertification}</div>
              ) : null}
                </div>
          
        </div>
      </div>
      
      <div className="row input-form-row">
          <div className='col-12'>
            <div className='form-group'>
              <label htmlFor='movieLanguages'> Languages</label>
              <div className='row'>
              {languages.map((lang, idx) => (
                <div key={`language-${lang.value}`} className="col-lg-2 col-md-4 col-sm-12 col-xs-12">
                        <label className="form-check-label my-1" key={`languages.${idx}`}>
                          <input
                            name="Languages"
                            type="checkbox"
                            className="form-check-input"
                            value={lang.value}
                            checked={formik.values.Languages.includes(lang.value)}                                  
                            onChange={e=>optionOnChange(e,"Languages")}               
                          />
                          <span className="mx-2">{lang.label}</span>
                        </label>
                      </div>
                      ))}
              </div>
              {formik.touched.Languages && formik.errors.Languages ? (
                <div className='validation-message'>{formik.errors.Languages}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="row input-form-row">
          <div className='col-12'>
            <div className='form-group'>
              <label htmlFor='movieCategory'> Category</label>
              <div className='row'>
                {movieGenres.map((category,idx) => (
                  <div key={`category-${category.value}`} className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <label className="form-check-label my-1" key={`category.${idx}`}>
                    <input                      
                      label={category.label}
                      name="Categories"
                      type="checkbox"  
                      className='form-check-input'                    
                      value = {category.value}
                      checked={formik.values.Categories.includes(category.value)}
                      
                      onChange={e=>optionOnChange(e,"Categories")}               
                      onBlur={formik.handleBlur}
                    />    
                    <span className="mx-2">{category.label}</span>
                    </label>
                  </div>
                ))}
              </div>
              {formik.touched.Categories && formik.errors.Categories ? (
                <div className='validation-message'>{formik.errors.Categories}</div>
              ) : null}
            </div>
          </div>
        </div>

      <div className='row'>
          <div className='col-12 btn-align'>
            <button type='submit' className='btn btn-default'>
            {mode === 'ADD' ? 'Add' : 'Update'}
            </button>
            <button type='reset' className='btn btn-cancel'  onClick={() => {
                formik.handleReset()
                setMode('ADD')
              }}>
              Reset
            </button>
          </div>
        </div>     
    </form>

 
    </div>      
    
  )
  
}

export default ManageMovie;
