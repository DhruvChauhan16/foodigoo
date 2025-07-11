import React from 'react';
import { useDispatch } from 'react-redux';
import { RiDeleteBinLine } from "react-icons/ri";
import { DecrementQty, IncrementQty, RemoveItem } from '../redux/CartSlice';
import { toast } from 'react-toastify';

const Card2 = ({ id, name, image, price, qty }) => {
  const dispatch = useDispatch();

  return (
    <div className='w-full h-[140px] p-2 shadow-lg rounded-lg mt-3 flex justify-between'>
      <div className='w-[60%] h-full gap-4 flex'>
        <div className='w-[60%] h-full overflow-hidden rounded-lg'>
          <img src={image} alt="" className='object-cover w-full h-full' />
        </div>
        <div className='w-[40%] h-full flex flex-col'>
          <div className='text-[15px] font-semibold text-gray-900 mt-3'>{name}</div>
          <div className='w-[110px] h-[50px] bg-white rounded-lg flex justify-between items-center mt-6 shadow-lg border-2 border-amber-400'>
            <button className='w-[30%] h-full text-2xl font-bold hover:bg-orange-300 cursor-pointer' onClick={() => dispatch(DecrementQty(id))}>-</button>
            <span className='w-[40%] h-full font-sans bg-orange-200 flex justify-center items-center'>{qty}</span>
            <button className='w-[30%] h-full text-xl font-bold hover:bg-orange-300 cursor-pointer' onClick={() => dispatch(IncrementQty(id))}>+</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-start items-end gap-12 mt-3'>
        <span className='text-[15px] font-semibold'>₹ {price}/-</span>
        <RiDeleteBinLine
          className='w-[25px] h-[30px] text-red-600 hover:text-red-400 cursor-pointer'
          onClick={() => dispatch(RemoveItem(id))}
        />
      </div>
    </div>
  );
};

export default Card2;
