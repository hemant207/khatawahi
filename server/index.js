require('dotenv').config();
const express = require('express');
const app = express();
const transectionRouter = require('./src/routes/transection.js');
const userRouter =  require('./src/routes/user.js')
const db = require('./src/database/db.js');
const cors = require('cors');
const userAuth = require('./src/middleware/auth.js')

app.use(express.json());
app.use(cors());


//defining router routes    
app.use('/transections',userAuth,transectionRouter);
app.use('/user',userRouter);

 
app.get('/',(req,res)=>{
    res.send({"message":'hello from the server'})
})

app.listen(process.env.server_port,(error)=>{
    if(error){
        console.log(error);
    }
    console.log("server is runnog on port "+process.env.server_port)
})