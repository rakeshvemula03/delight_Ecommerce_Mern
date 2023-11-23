import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ name, image, category, price, loading,id }) => {
  return (
    <div className="bg-white shadow-md p-2 rounded min-w-[170px]">
      {name ? (
        <>
         <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
          <div className="w-40 min-h-[170px] ">
            <img src={image} className="w-full h-full" />
          </div>
          <h3 className="font-semibold text-slate-600 text-center capitalize text-lg ">
            {name}
          </h3>
          <p className="text-center text-slate-500 text-md font-medium">
            {category}
          </p>
          <p className="text-center font-bold">
            <span className="text-red-900">₹</span>
            <span>{price}</span>
          </p>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
