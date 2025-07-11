import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/UserContext.jsx'
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { food_items } from '../assets/food.js';
import { useSelector } from 'react-redux';
function Nav() {
    const {input, setInput,cate,setCate,showCart,setShowCart} = useContext(DataContext)
    useEffect(()=>{
        const newList=food_items.filter((item)=>item.food_name.toLowerCase().includes(input.toLowerCase()))
        setCate(newList)},[input, setCate])
        let items = useSelector(state => state.Cart)
  return (
    <div className='w-full h-[100px] bg-amber-100 flex justify-between items-center px-5 md:px-8'>
        <div className='w-[200px] h-[70px] bg-amber-100 flex '>
            <img src="src/assets/logo1.png" alt="" />
        </div> 
            <form className='w-[45%] h-[60%] bg-white flex items-center gap-0.5 px-5 rounded-md shadow-md md:w-[70%]' onSubmit={(e)=>e.preventDefault()}>
                <IoSearch className='text-orange-400 w-[20px] h-[20px]'/>
                <input type="text" placeholder=' Search your dish...' className='w-[100%] outline-none text-[15px] md:text-[20px]' onChange={(e)=>setInput(e.target.value)} value={input}/>
            </form>
        <div className='w-[25px] h-[60px] flex justify-center items-center relative' onClick={()=>setShowCart(true)}>
            <span className='absolute top-1 right-0 font-bold w-[3%] md:w-[7%1'>{items.length}</span>
            <FaShoppingCart className='w-[40px] h-[70px] text-orange-400 hover:text-amber-500 cursor-pointer'  />
        </div>
    </div>
  )
}

export default Nav

