import React from 'react'
import image1 from "../assets/image1.avif"
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { AddItem } from '../redux/CartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function Card({ name, image, id, price, type }) {
    let dispatch = useDispatch();
  return (
    <div className='w-[300px] h-[400px] bg-amber-200 p-3 rounded-lg flex flex-col justify-between shadow-lg hover:border-2 border-amber-500 transition-all cursor-pointer'>
      <div className='w-[100%] h-[60%] overflow-hidden rounded-lg'>
            <img src={image} alt="PanCake" className='object-cover w-full h-full'/>
      </div>
      <div>
        <div className=' mt-3 font-semibold text-[25px] text-gray-900'>
            {name}
      </div>
      <div className='w-full flex justify-between items-center mt-1'>
            <div className='text-lg font-bold text-gray-800'>
                {`₹ ${price}/-`}
            </div>
            <div className='flex items-center gap-1 font-semibold'> 
                {type === "veg" ?(
                    <>
                        <GoTriangleUp className="text-green-500"/>
                        <span className="text-green-500">Veg</span>
                    </>
                ):(
                    <>
                        <GoTriangleDown className="text-red-600"/>
                        <span className="text-red-600">Non-Veg</span>
                    </>
                )}
            </div>
        </div>
    </div>
        <button className='bg-yellow-300 text-gray-950 px-4 py-2 rounded mt-auto cursor-pointer hover:bg-amber-400 text-[20px] transition-all' onClick={()=>{dispatch(AddItem({name: name, image: image, id: id, qty:1, price: price,})); toast.success("Item Added")}}>Add to cart</button>
      </div>
  )
}

export default Card
