import React from 'react'
import  { useState } from "react";
import loginSignUpImage from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
 // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
  
    email : "",
    password :"",
    
  });
  const navigate = useNavigate()
  const userData = useSelector(state =>state)
  console.log(userData.user)

   const dispatch = useDispatch()
 
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
 /* const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  */
  const handleOnChange =(e)=>{
     const {name,value}=e.target
     setData((prev)=>{
        return{
            ...prev,
           [name] : value
        }
     })

  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {email,password}=data
    if( email&& password){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{
        method :"POST",
        headers :{
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
       })

       const dataRes= await fetchData.json()
       console.log(dataRes)
       toast(dataRes.message)


       if(dataRes.alert){
        dispatch(loginRedux(dataRes))
         setTimeout(()=>{
          navigate("/")
         },1000);
           
       }
       console.log(userData)
       
    }
    else{
        alert("please enter all required fields")
    }
  }
  return (
    <div className="p-3 md:p-4">
    <div className="w-full max-w-sm bg-white m-auto flex flex-col  p-4">
      <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
        <img src={loginSignUpImage} className="w-full m-auto" />
      </div>
      <form className="w-full py-3 flex flex-col"onSubmit={handleSubmit}>
       

       
        <label htmlFor="email"> Email</label>
        <input
          type={"email"}
          id="email"
          name="email"
          className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          value={data.email}
          onChange={handleOnChange}
        />

        <label htmlFor="password">Password</label>
        <div className=" px-2 py-1 rounded flex mt-1 mb-2  bg-slate-200  focus-within:outline focus-within:outline-blue-300">
          <input
            type={showPassword ? "text" : "password"}
            name="password"  
            id="password"
            className="w-full bg-slate-200 border-none outline-none"
            value={data.password}
            onChange={handleOnChange}
          />
          <span
            className="flex cursor-pointer mt-1"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>

        
        <button   className="max-w-[120px] w-full bg-red-500 text-white text-xl text-center font-medium m-auto  mt-3 cursor-pointer hover:bg-red-600 rounded">
          Login
        </button>
      </form>
      <p className="mt-3 text-sm ">
          Don't have an account ?{" "}
          <Link to={"/Signup"} className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
    </div>
  </div>
  )
}

export default Login