import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
// import TitleDisplay from './TitleDisplay';

import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri'
import TitleDisplay from '../../common/TitleDisplay';

export default function ManageCity (props) {


  const [id, setId] = useState('')
  const [mode, setMode] = useState('ADD')
  const [cities, setCities] = useState([])

  useEffect(() => {
    axios.get('/cities').then(response => {
      console.log(response)
      setCities(response.data.cityList)
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      Country: '',
      State: '',
      City: ''
    },
    validationSchema: yup.object({
      Country: yup.string().required('Country is required'),
      State: yup.string().required('State is required'),
      City: yup.string().required('City is required'),
      DateCreated: yup.date().default(function () {
        return new Date()
      })
    }),
    onSubmit: (values, { resetForm }) => {
      saveHandler(values)
      resetForm({ values: '' })
    }
  })

  let handleDelete = async id => {
    await axios
      .post('/cities/delete/' + id)
      .then(response => {
        console.log(response)
        axios.get('/cities').then(response => {
          setCities(response.data.cityList)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  let handleEdit = _id => {
    setMode('EDIT')
    setId(_id)
    var editValues = cities.filter(city => city._id === _id)[0]
    formik.setFieldValue('Country', editValues.Country)
    formik.setFieldValue('State', editValues.State)
    formik.setFieldValue('City', editValues.City)
  }

  let saveHandler = async data => {
    try {
      if (mode === 'ADD') {
        await axios
          .post('/cities/create', data)
          .then(response => {
            console.log(response)
            axios.get('/cities').then(response => {
              setCities(response.data.cityList)
            })
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        await axios
          .post('/cities/update/' + id, data)
          .then(response => {
            console.log(response)
            axios.get('/cities').then(response => {
              setCities(response.data.cityList)
            })
            setMode('ADD')
            setId('')
          })
          .catch(error => {
            console.log(error)
          })
      }
    } catch (error) {
      console.log(error)
    }
  }
  function handleClose () {
    props.onClose(0)
  }

  return (
    <div className='tab-content' key="City">
      
    <TitleDisplay Title='Manage City' onClose={handleClose}/>
      <form onSubmit={formik.handleSubmit}>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                className='form-control'
                name='Country'
                id='Country'
                autoComplete='off'
                placeholder='Enter Country'
                maxLength={50}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.Country}
              />
              {formik.touched.Country && formik.errors.Country ? (
                <div className='validation-message'>
                  {formik.errors.Country}
                </div>
              ) : null}
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>
              <label htmlFor='state'>State</label>
              <input
                type='text'
                className='form-control'
                id='State'
                name='State'
                autoComplete='off'
                placeholder='Enter State'
                maxLength={50}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.State}
              />
              {formik.touched.State && formik.errors.State ? (
                <div className='validation-message'>{formik.errors.State}</div>
              ) : null}
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='form-group'>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                className='form-control'
                id='City'
                name='City'
                autoComplete='off'
                placeholder='Enter City'
                maxLength={50}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.City}
              />
              {formik.touched.City && formik.errors.City ? (
                <div className='validation-message'>{formik.errors.City}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 btn-align'>
            <button type='submit' className='btn btn-default'>
              {mode === 'ADD' ? 'Add' : 'Update'}
            </button>
            <button
              type='reset'
              className='btn btn-cancel'
              onClick={() => {
                formik.handleReset()
                setMode('ADD')
              }}
            >
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
                <th scope='col'>Country</th>
                <th scope='col'>State</th>
                <th scope='col'>City</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((obj, index) => {
                return (
                  <tr key={obj._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{obj.Country}</td>
                    <td>{obj.State}</td>
                    <td>{obj.City}</td>
                    <td>
                      {' '}
                      <span
                        className='action-icon'
                        onClick={() => handleEdit(obj._id)}
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
      </div>
    </div>
  )
}
