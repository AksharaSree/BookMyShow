import React from 'react'

function TitleDisplay(props) {
    function handleClose() {
        // Here, we invoke the callback with the new value
        props.onClose(0);
    }

  return (
    <div className='row'>
        <div className='col-10'>
            <h4>{props.Title}</h4>
        </div>
        <div className='col-2'>
            <button type='button' className='btn close-icon' onClick={handleClose}>
                <span aria-hidden='true'>X</span>
            </button>
        </div>
    </div> 
  )
}

export default TitleDisplay
