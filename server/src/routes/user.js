const express = require('express');
const router = express.Router();
const db = require('../database/db')
const jwt  = require('jsonwebtoken');
const userAuth = require('../middleware/auth');

//adding user to database
router.get('/me',userAuth,(req,res)=>{
    const me_data = req.data;
    res.send({"user":me_data});
})

router.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const query = `select * from User where username = ?`;

    db.all(query,[username],(err,row)=>{
        if(err){
            console.log("error while checking user"+row);
        }if(row){
            if(row.length==0){
                const addUserQuery = `Insert into User (username,password) VALUES (?,?)`;
            
                db.run(addUserQuery,[username,password],(row,err)=>{
                    if(err){
                        console.log("error while adding user : "+ err);
                    }else{
                        console.log("user added sucessfully:"+username);
                        res.send({"user added sucessfully":username})
                    }
            })
            }else{
                console.log("user exists :"+ row)
                res.send({"user exists ": row})
            }
            
        }
    })
    
})

//login api endpoint
router.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const FoundUserQuery = `select * from User where username = ? and password = ?`;
    
    db.all(FoundUserQuery,[username,password],(err,row)=>{
        if(err){
            console.log("error: "+ err);
            res.send({"error while geting user : " : err})
        }if(row){
            const token = jwt.sign(row[0],process.env.jwt_sec_key)
            res.send({"token":token})
        }
    })
})

module.exports = router