import React from 'react';
import TitleDisplay from '../../common/TitleDisplay';

import {CustomSelectComponent as FormikSelect} from '../../common/SelectComponent'

import { Formik, Form, Field } from 'formik';

export default function ManageShow(props) {
  function handleClose() {    
    props.onClose(0);
  }


const countries = [
  {label:"Test 1", value:1},
  {label:"Test 2", value:2}
];

  return (<div className='tab-content'>
      <TitleDisplay Title="Manage Show" onClose={handleClose}/>    
      <Formik
   initialValues={{ articleType: 'other' }}
 >
  <Form>
    <Field name="articleType" component={FormikSelect} options={countries} />
  </Form>
</Formik>

      </div>
    
  )

}
