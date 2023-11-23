import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FeatureCard from "../component/FeatureCard";
import CardFeature from "../component/CardFeature";
import {GrNext} from "react-icons/gr"
import { GrPrevious } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";



const Home = () => {
  const productData = useSelector((state) => state.product.productList);
 
  const homeproductcartlist = productData.slice(0, 5);
  const homeproductcartlistVegetables = productData.filter(
    (el) => el.category === "Vegetables",
    []
  );
 

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  
  const slideProductRef = useRef()

  const nextProduct = ()=>{
   slideProductRef.current.scrollLeft +=200
  }

  const prevproduct = ()=>{
    slideProductRef.current.scrollLeft -=200
  }

  


  

  return (
    <div className="p-2 md:p-4">
      <div className="md: flex gap-4 py-2 ">
        <div className="md:w-1/2 ">
          <div className="flex gap-3 w-30 px-2 items-center rounded">
            <p className="text-sm ">Bike Delivery</p>
            <img
              className="h-7"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1_o6qVQiCQgfeHq4yjT8ZvjzHFWcprZUcUA&usqp=CAU"
            />
          </div>
          <h2 className="md:text-7xl text-4xl font-bold py-3">
            Products in <span className="text-red-500">your home</span> on click
            away
          </h2>
          <p className="py-3 text-base">
            this is some random description about our app and i hope i will
            complete it fully without any errors or complications in the middle{" "}
          </p>
          <button className="font-bold bg-red-500 text-slate-200 p-2 rounded">
            Order Now!
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap  gap-5 p-4 justify-center ">
          {homeproductcartlist[0]
            ? homeproductcartlist.map((el) => {
                return (
                  <FeatureCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <FeatureCard key={index+"loading"} loading={"Loading..."} />;
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
        <h2 className="font-bold text-2xl text-slate-800 ">Fresh vegetables</h2>
        <div className="ml-auto  flex gap-4">
          <button onClick={prevproduct} className="bg-slate-300 hover:bg-slate-400 text-lg flex rounded  p-1"><GrPrevious/></button>
          <button onClick={nextProduct} className="bg-slate-300 hover:bg-slate-400 text-lg flex  rounded p-1"><GrNext/></button>
        </div>
        </div>
       
        <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProductRef}>
          {
           homeproductcartlistVegetables[0] ? homeproductcartlistVegetables.map((el) => {
            return (
              <CardFeature
                key={el._id+"vegetables"}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
              />
            );
          })
        :
        loadingArrayFeature.map((el,index) => (<CardFeature loading="Loading..." key={index+"cartloading"}/>)
        
        )}
        </div>
      </div>

      <AllProduct heading={"Your product"}/>
      
    </div>
  );
};

export default Home;
