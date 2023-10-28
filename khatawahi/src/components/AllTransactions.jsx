import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Transaction from './Transaction';


function AllTransactions() {
    const [transactions,setTransactions] = useState([]);
    const [sortDate,setSortDate] = useState(true);
    const [sortBank,setSortBank] = useState(true);
    const token = window.localStorage.getItem("token");

    console.log(token);
    useEffect(()=>{    
        try {
            const config = {
                headers: {
                    'Authorization': token, 
                  },
                params: {
                    sort_by: 'date',
                    order: (sortDate?'ASC':'DESC')
                  }
            }
            axios.get('https://api-katawahi.onrender.com/transections',config).then((res)=>{
                console.log(res.data.row);

                if(res.data.row){
                    setTransactions(res.data.row);
                }else{
                    console.log("no data..")
                }
            })
        } catch (error) {
            console.log(error);
        }
    },[sortDate])
    
    
  return (
    <>
    {/** 
    <div>
        <select name="sortFilter"
              required 
              onChange={e=>setSortDate(e.target.value)}>
            <option value='ASC'>Date: low to high</option>
            <option value='DESC'>Date: high to low</option>
        </select>
    </div>
    <h1>{sortDate}</h1>
    
     */}
     <br/>
    <div>
        <table className='transaction-table max-w-full mb-0 p-0'>
    <thead>
                    <tr>
                    <th className='tbl-cell' onClick={e=>setSortDate(!sortDate)}>Date</th>
                    <th className='tbl-cell'>Type</th>
                    <th className='tbl-cell'>Amount</th>
                    <th className='tbl-cell' onClick={e=>setSortBank(!sortBank)}>Bank</th>
                    <th className='tbl-cell'>Verified</th>
                    <th className='tbl-cell'>Action</th>
                    </tr>
        </thead>
        </table>
    </div>
    <Transaction transactions={transactions}/>
    </>
  )
}

export default AllTransactions