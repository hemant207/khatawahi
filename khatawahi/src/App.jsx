import { RecoilRoot, useSetRecoilState } from 'recoil'
import './App.css'
import Header from './components/Header'
import TransectionPage from './components/TransectionPage'
import axios from 'axios'
import totalAmountState from './src/atom/totalAmountState'
import { useEffect } from 'react'
import Login from './components/Login'
import {BrowserRouter as Router , Route , Routes, useNavigate } from "react-router-dom"

function App() { 
  
  return (
    <>
    <RecoilRoot>
      <Init></Init>
  
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/transections' element={<TransectionPage/>}/>
      </Routes>
    </Router>
     </RecoilRoot>
    </>
  )
}

export default App

const Init = () =>{
  let amount_in = 0;
  let amount_out = 0;
  const setTotal = useSetRecoilState(totalAmountState);

  useEffect(()=>{
    try {

      axios.get('https://api-katawahi.onrender.com/user/me',{headers:{
        Authorization: localStorage.getItem("token")
      }}).then((res)=>{
        localStorage.setItem("username",res.data.user.username);
        console.log(res.data.user);
      })

      try {
        axios.get('https://api-katawahi.onrender.com/transections/totalout',{headers:{
          Authorization: localStorage.getItem("token")
        }}).then((res)=>{
          if(res.data.total || res.data.total===null){
            console.log("out : "+ res.data.total);
           amount_out = res.data.total || 0;
  
          }else{
            console.log("something went wrong for getting total out")
          }
        })
      } catch (error) {
        console.log(error);
      }
      
    
      axios.get('https://api-katawahi.onrender.com/transections/total',{headers:{
        Authorization: localStorage.getItem("token")
      }}).then((res)=>{
        if(res){
          console.log(res.data.total);
          amount_in = res.data.total;
        }else{
          console.log("something went wrong fro getting total in")
        }
      })
    } catch (error) {
      console.log(error);
    }


    setTimeout(()=>{
      console.log(amount_in + amount_out);

      setTotal({
      amount_in:amount_in,
      amount_out:amount_out})
    },300)

    
  })
  
}