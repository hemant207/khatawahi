const express = require('express');
const db = require('../database/db.js');
const userAuth = require('../middleware/auth.js');

const router = express.Router();

//RETRIVING ALL THE TRANSECTIONS
router.get('/', userAuth , (req,res)=>{
    const sortBy = req.query.sort_by;
    const sortOrder = req.query.order || 'asc';
    const user_id = req.data.user_id;

    console.log("transections requested...");
    let getTransectionQuery = 'SELECT * FROM Transections where user_id = ?';

    if (sortBy) {
      getTransectionQuery += ` ORDER BY ${sortBy} ${sortOrder}`;
    }

    console.log(getTransectionQuery);
    db.all(getTransectionQuery,[user_id],(err,row)=>{
        if(err){
            console.log("error retriving transections : "+err);
        }else{
            console.log(row);
            res.json({'row':row});
        }
    })
})

//ADDIND NEW TRANSECTION DATA INTO DATABASE
router.post('/add', userAuth ,(req,res)=>{
    const data = req.body;
    console.log("data :"+data);
    const date = req.body.date;
    const type = req.body.type;
    const amount = req.body.amount;
    const bank = req.body.bank;
    const verified = req.body.verified;
    const user_id = req.data.user_id;

    const addQuery = `
    INSERT INTO Transections (date, type, amount, bank, verified,user_id)
    VALUES (?, ?, ?, ?, ?, ?)`;

        try {
            db.run(addQuery,[date, type, amount, bank, verified , user_id],(err)=>{
                if(err){
                    console.log("error in adding entry: "+err);
                }else{
                    console.log("entry sucessfully added :" +data);
                    res.json({"row":data});
                }
            })
        } catch (error) {
            console.log(error);
        }
    
})

//total out end point
router.get('/totalout',userAuth,(req, res) => {
  console.log("--------------------attention-----------------")
  const user_id = req.data;
  console.log(user_id+" for data")

  const totalamountQuery = `
  SELECT SUM(amount) as total_out
  FROM Transections
  WHERE type = "out" and user_id = ?
  `;

  console.log(totalamountQuery);

  db.get(totalamountQuery, [user_id],(err, row) => {
    if (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Database error' });
    } else {
      if (row) {
        console.log('Total amount out:', row);
        res.json({ total: row.total_out });
      } else {
        console.log('No data found for the given condition.');
        res.json({ total: 0 }); // Return 0 if no data is found
      }
    }
  });
});

//GETAMOUNT TOTAL
router.get('/total', userAuth ,(req, res) => {
  const user_id = req.data.user_id;
  const totalamountQuery = `
      SELECT SUM(amount) as total
      FROM Transections
      WHERE type = "in" and user_id = ?
    `;

    console.log(totalamountQuery);
  
    db.get(totalamountQuery,[user_id], (err, row) => {
      if (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: 'Database error' });
      } else {
        if (row) {
          console.log('Total amount:', row.total);
          res.json({ total: row.total });
        } else {
          console.log('No data found for the given condition.');
          res.json({ total: 0 }); // Return 0 if no data is found
        }
      }
    });
  });

//RETRIVING SPECIFIC DATA
router.get('/:id',userAuth, (req,res)=>{
    const tarns_id = req.params.id;
    const user_id = req.data.user_id;
    console.log(tarns_id);
    
    const findQuery = `SELECT * FROM Transections WHERE id = ? and user_id = ?`;

// Execute the query with the provided parameter
        db.get(findQuery, [tarns_id,user_id], (err, row) => {
        if (err) {
            console.error('Error retrieving data:', err.message);
        } else {
            if (row) {
                console.log('Found data:', row);
                res.json({'row':row});
            } else {
                console.log('No data found for ID:', tarns_id);
            }
        }
        })

})

//UPDATING TRANSECTION

router.put('/:id',userAuth,(req,res)=>{
    const tarns_id  =req.params.id;
    const data = req.body;
    console.log("data :"+data);
    const date = req.body.date;
    const type = req.body.type;
    const amount = req.body.amount;
    const bank = req.body.bank;
    const verified = req.body.verified;
    const user_id = req.data.user_id;
    
    const updateQuery = `
            UPDATE Transections 
            SET date=?,
            type=?,
            amount=?,
            bank=?,
            verified=? 
            Where id = ?`;


    db.run(updateQuery,[date, type, amount, bank, verified,tarns_id],(err,row)=>{
        if(err){
            console.log("error while updating :"+err);
        }else{
            console.log(row);
            res.json({"message":"updated successfully","row":row})
        }
    })
    
})



//DELETING TRANS:ECTION
router.delete('/:id',userAuth,(req,res)=>{
    const tarns_id= req.params.id;

    const findDeleteQuery = `DELETE FROM Transections WHERE id=?`;

    db.run(findDeleteQuery,[tarns_id],(err,row)=>{
        if(err){
            console.log("error in deleting datapoint :"+err);
            res.json({"message":"something wrong while deleting data"})
        }else{
            console.log(row);
            res.json({"message":'entry deleted successfully','row':row});
        }
    })
})

  



//SERCHBAR

module.exports = router;