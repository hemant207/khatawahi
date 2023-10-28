import React, { useEffect, useRef, useState } from 'react'

function Filter() {

    const [sortFilter,setSortFilter] = useState('low');

    useEffect(()=>{
        console.log("render on slect...")
    },[sortFilter])


  return (
    <>
    <div>
        <select name="sortFilter"
              required 
              onChange={e=>setSortFilter(e.target.value)}>
            <option value='ASC'>Date: low to high</option>
            <option value='DESC'>Date: high to low</option>
        </select>
    </div>
    <h1>{sortFilter}</h1>       
    </>
  )
}

export default Filter