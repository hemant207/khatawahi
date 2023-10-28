import React from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
  const nav = useNavigate();
  return (
    <>
    <div class="header" id='myHeader' style={{'textTransform':'uppercase'}}>
    <h1 className='text-5xl font-bold p-4 pl-1 mb-2 bg-amber-400'>khatawahi</h1>
    {localStorage.getItem('username')}
    <button onClick={(e)=>{
      localStorage.clear();
      nav('/');

    }}>Sign out</button>
    </div>
    </>
  )
}

export default Header