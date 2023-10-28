import React, { useState } from 'react';
import axios from 'axios';
import './transaction.css'

function AddTransection() {
  const token = localStorage.getItem("token");
  const [transaction, setTransaction] = useState({
    date: '',
    type: 'in',
    amount: '',
    bank: '',
    verified: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setTransaction({
      ...transaction,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(transaction);
    // You can send a POST request to your server with the form data here
    // Example: fetch('/addtransaction', { method: 'POST', body: JSON.stringify(transaction) })
    const res = await axios.post('https://api-katawahi.onrender.com/transections/add',transaction,{headers:{Authorization:token}}).catch(console.error());
    console.log(res.data);
    location.reload();
  };

  return (
    <table className="transaction-table max-w-full">
      <thead>
                    <tr>
                    <th className='tbl-cell'>Date</th>
                    <th className='tbl-cell'>Type</th>
                    <th className='tbl-cell'>Amount</th>
                    <th className='tbl-cell'>Bank</th>
                    <th className='tbl-cell'>Verified</th>
                    <th className='tbl-cell'>Action</th>
                    </tr>
        </thead>
      <tbody>
        <tr>
          <td className='tbl-cell'>
            <input
              type="date"
              id="date"
              name="date"
              value={transaction.date}
              onChange={handleInputChange}
              required
            />
          </td>
          <td className='tbl-cell'>
            <select
              id="type"
              name="type"
              value={transaction.type}
              onChange={handleInputChange}
              required
            >
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
          </td>
          <td className='tbl-cell'>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              value={transaction.amount}
              onChange={handleInputChange}
              required
            />
          </td>
          <td className='tbl-cell'>
            <input
              type="text"
              id="bank"
              name="bank"
              value={transaction.bank}
              onChange={handleInputChange}
              required
            />
          </td>
          <td className='tbl-cell'>
            <input
              type="checkbox"
              id="verified"
              name="verified"
              checked={transaction.verified}
              onChange={handleInputChange}
            />
          </td>
          <td className='tbl-cell'>
            <button type="submit" onClick={handleSubmit}>
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );

}

export default AddTransection;
