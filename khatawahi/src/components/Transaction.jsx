import axios from 'axios';
import React from 'react'
import { useState } from 'react';


function Transaction({transactions}) {
  const token  = localStorage.getItem("token")
    const handleDelete = async (id) =>{

        if(id){
            try {
                const res = await axios.delete(`http://localhost:3000/transections/${id}`,{headers:{Authorization:token}}).catch(console.error());
                if(res){
                    console.log(res.data.message);
                    location.reload();
                }              
            } catch (error) {
                console.log("error while deleting "+error);
            }
        }
       
    }


    return (
        <>
        <table className="transaction-table mt-8">
        </table>
          {transactions.map((datapoint, index) => (
            <div className="transaction-row" key={index}>
              <table className="transaction-table">
                <tbody>
                  <tr>
                    <td className='tbl-cell'>{datapoint.date}</td>
                    <td className='tbl-cell'>{datapoint.type}</td>
                    <td className='tbl-cell'>{datapoint.amount}</td>
                    <td className='tbl-cell'>{datapoint.bank}</td>
                    <td className='tbl-cell'>{datapoint.verified ? 'Yes' : 'No'}</td>
                    <td className='tbl-cell'>
                        <button className="bg-red-700" type="submit" onClick={e=>handleDelete(datapoint.id)}>
                            Delete
                        </button>
                    </td>
                 </tr>
                </tbody>
              </table>
            </div>
          ))}
        </>
      );
      
}

export default Transaction