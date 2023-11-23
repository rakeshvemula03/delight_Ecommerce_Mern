import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const CardFeature = ({ image, name, price, category, loading,id}) => {
    const dispatch = useDispatch()
    
    const handleAddCartProduct =(e)=>{
       dispatch(addCartItem({
        _id :id,
        name : name,
        price: price,
        category : category,
        image :image
      }))
    };
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover-shadow-lg drop-shadow-lg cursor-pointer mb-2 py-5 px-4 flex flex-col over  justify-center items-center">
      {image ? (
        <>
        <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
          <div className="h-28 flex flex-col justify-center items-center">
            <img src={image} className="h-full" />
          </div>
          <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
            {name}
          </h3>
          <p className=" text-slate-500 text-md font-medium">{category}</p>
          <p className=" font-bold">
            <span className="text-red-900">₹</span>
            <span>{price}</span>
          </p>
          </Link>
          <button className="bg-yellow-500 text-slate-100 py-1 px-2 rounded mt-2 hover:bg-yellow-600 w-full" onClick={handleAddCartProduct}>
            Add to Cart
          </button>
          
        </>
      ) : (
        <div className=" min-h-[200px] flex justify-center items-center">
          <p className="">{loading}</p>
        </div>
      )}
    </div>
    
  );
};

export default CardFeature;
