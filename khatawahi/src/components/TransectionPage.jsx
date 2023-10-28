import React from 'react'
import Amount from './Amount'
import AddTransection from './AddTransection'
import AllTransactions from './AllTransactions'


function TransectionPage() {
  return (
    <div className='p-4'>
      <Amount/>
      <AddTransection/>
      <AllTransactions/>
    </div>
  )
}

export default TransectionPage