import * as React from 'react'
// import { Formik, Form, Field, FieldProps } from 'formik';
import Select from 'react-select';
import axios from "axios";
// import styled from '@emotion/styled'
// import FormGroup from '../FormGroup'
// import Input from '../Input'

// const ErrorMessage = styled.div`
//   color: var(--watermelon);
// `

export const CustomSelectComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { options } = props;
 const customOnChange= async(option)=>{
 // console.log(field)

  setFieldValue(field.name, (option).value); 
  console.log(field.value) 
   await axios
  .get('/cinemas/'+(option).value)
  .then((response) => {          
   // console.log(response.data.theatreList);       
  });
 }
  return (
   <>
      <label htmlFor={field.name}>{props.label}</label>
      <Select
        {...field}
        {...props}
        options={options}
        value={(options ? options.find(option => option.value === field.value) : '')}
        onChange={option => {setFieldValue(field.name, (option).value); 
          console.log(field.value) }
      }
      />
      {touched[field.name] && errors[field.name] && (
        <div>{errors[field.name]}</div>
      )}
  </>
  )
}