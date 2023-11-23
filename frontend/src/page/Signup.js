import React, { useState } from "react";
import loginSignUpImage from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { Link,useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import {toast} from 'react-hot-toast';


function Signup() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
    image : ""
  });
  console.log(data);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleOnChange =(e)=>{
     const {name,value}=e.target
     setData((prev)=>{
        return{
            ...prev,
           [name] : value
        }
     })

  }
  const handleUploadProfileImage = async(e)=>{
    
    const data = await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((prev)=>{
       return{
        ...prev,
        image :data
       }
      
    })
  } 
  console.log(process.env.REACT_APP_SERVER_DOMIN)
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {firstName,email,password,confirmPassword}=data
    if(firstName&& email&& password&&confirmPassword){
        if(password === confirmPassword){
           const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
            method :"POST",
            headers :{
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
           })

           const dataRes= await fetchData.json()
           console.log(dataRes)

           // alert(dataRes.message);
            toast(dataRes.message)
            if(dataRes.alert){
              navigate("/Login")
            }

            }else{
            alert("password and confirm password should be same")
        }
    }
    else{
        alert("please enter all required fields")
    }
  }
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col  p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img src={data.image ? data.image :loginSignUpImage} className="w-full h-full " />
          <label htmlFor="profileImage">
          <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
            <p className="text-sm p-1 text-white">Upload</p>
          </div>
          <input type={"file"} id="profileImage" className="hidden" accept="image/*" onChange={handleUploadProfileImage}/>
          </label>
        </div>
        <form className="w-full py-3 flex flex-col"onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value ={data.firstName}
            onChange={handleOnChange}
         />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
          />
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

          <label htmlFor="confirmPassword">confirm Password</label>
          <div className=" px-2 py-1 rounded flex mt-1 mb-2  bg-slate-200  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex cursor-pointer mt-1"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button   className="max-w-[120px] w-full bg-red-500 text-white text-xl text-center font-medium m-auto  mt-3 cursor-pointer hover:bg-red-600 rounded">
            Sign Up
          </button>
        </form>
        <p className="mt-3 text-sm ">
          Already have an account ?{" "}
          <Link to={"/Login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
