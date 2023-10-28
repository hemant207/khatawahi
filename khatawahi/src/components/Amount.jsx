import React from 'react'
import { useRecoilValue } from 'recoil'
import { total_in, total_out } from '../src/selector/total'


function Amount() {
    
    const amount_in = useRecoilValue(total_in);
    const amount_out  = useRecoilValue(total_out);

  return (
    <div className='flex justify-between text-2xl font-bold' style={{'textTransform':'uppercase'}}>
    <div className='bg-green-400 p-2 mb-2'>
    <h1>Amount IN : {amount_in}</h1>
    </div>
    <div  className='bg-red-400 p-2 mb-2'>
    <h1>Amount out : {amount_out}</h1>
    </div>
    <div  className='bg-blue-400 p-2 mb-2'>
    <h1>Remaining : {amount_in-amount_out}</h1>
    </div>
    </div>
  )
}

export default Amount