import React, { useState } from 'react';
import  './FilterTags.css';

function FilterTags(props) {

    const[selectedOption, setSelectedOption] = useState(props.filterTags);


    function onFilterSelect(idx) {
        // Here, we invoke the callback with the new value
        selectedOption[idx].isSelected = true; 
        setSelectedOption([...selectedOption])

        props.onFilterSelect(props.filterName, [...selectedOption]);
    }


  return (
    <div className="row">
        <div className='col-12  tag-align'>
            {
            
            selectedOption.map((tag,idx) =>  (
               
                    <label key={`${props.filterName}-${idx}`} id={`${props.filterName}-${idx}`} className={tag.isSelected ? "filter-tag--selected": "filter-tag"} 
                        onClick={()=>onFilterSelect(idx)}>{tag.label}</label>
              
            ))}
        </div>
    </div>
  )
}

export default FilterTags
