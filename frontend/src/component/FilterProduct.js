import React from 'react'
import {CiForkAndKnife} from "react-icons/ci";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
    <div className={` text-5xl p-5 hover:bg-yellow-600 rounded-full cursor-pointer ${isActive ? "bg-red-900 text-white" : "bg-yellow-500"}`}>
          <CiForkAndKnife/>
        </div>
        <p className='text-center font-medium capitalize my-1 text-sm'>{category}</p>
    </div>
    
  )
}

export default FilterProduct;