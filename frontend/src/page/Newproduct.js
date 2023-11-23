import React, { useState } from 'react'
import {IoIosCloudUpload} from "react-icons/io"
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast from 'react-hot-toast';

const Newproduct = () => {
  const [data,setData]= useState({
    name : "",
    category :"",
    image :"",
    price : "",
    description :""
  })
/*  const uploadImage = async(e)=>{
    
    const data = await ImagetoBase64(e.target.files[0])
   // console.log(data)
   setData((prev)=>{
    return{
      ...prev,
      image :data
    }
   })
  }
  */
  const uploadImage = async (e) => {
    try {
      const data = await ImagetoBase64(e.target.files[0]);
      setData((prev) => {
        return {
          ...prev,
          image: data,
        };
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      // Handle the error as needed
    }
  };
  
   const handleOnChange = (e)=>{
    const {name,value} = e.target
    setData ((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
   }
  /* const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price} = data
    if(name && image && category&& price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadproduct`,{
        method :"POST",
        headers :{
          "content-type":"application/json"},
          body : JSON.stringify(data) 
        })
  
          const fetchRes = await fetchData.json()
          console.log(fetchRes)
          toast(fetchRes.message)

          setData(()=>{
            return {
              name : "",
              category :"",
              image :"",
              price : "",
              description :""
            }

          })
    }
    else{
      toast("Enter the required fields")
    }
    }
    */
   const handleSubmit = async (e) => {
  e.preventDefault();
 // console.log(data);

  const { name, image, category, price } = data;

  if (name && image && category && price) {
    try {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!fetchData.ok) {
        // Handle non-2xx responses
        const errorResponse = await fetchData.json();
        throw new Error(errorResponse.message);
      }

      const fetchRes = await fetchData.json();
    //  console.log(fetchRes);
      toast(fetchRes.message);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } catch (error) {
      console.error("Error during fetch:", error.message);
      toast("Error submitting the form. Please try again.");
    }
  } else {
    toast("Enter the required fields");
  }
};
  
  return (
    
    <div className='p-4'>
      <h2 className='text-bold capitalize font-medium flex items-center justify-center mb-2'>Upload product</h2>
      <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white'onSubmit={handleSubmit}>
    <label htmlFor='name'>Name</label>
    <input type={"text"} name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name} />


    <label htmlFor='category' >Category</label>
    <select className='bg-slate-200 p-1 my-1 ' name='category'id='category'onChange={handleOnChange} value={data.category} >
      <option></option>
      <option>Fruits</option>
      <option>Vegetables</option>
      <option>Tiffins</option>
      <option>sweet cuisines</option>
      <option>Fast foods</option>
      <option>Rice</option>
      <option>Non-veg</option>
      <option>veg</option>
    </select>

    <label htmlFor='image' className='my-1 cursor-pointer'>Image

    <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center'>
      {
        data.image ? <img src={data.image} className='h-full'/> : <span className='text-5xl'>
        <IoIosCloudUpload/>
        </span>
      }
      
      
      <input type={"file"} onChange={uploadImage} className='hidden' id="image"/>
    </div>
    </label>
    <label htmlFor='price' className='my1'>Price</label>
    <input type={"text"} className='bg-slate-200 p-1 my-1' name='price'onChange={handleOnChange} value={data.price} />
    <label htmlFor='description' >Description</label>
    <textarea rows={2}  value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange} ></textarea>

    <button className='bg-red-500 hover:bg-red-600 text-white text-bold'>Save</button>
    
    </form></div>
  )
}

export default Newproduct