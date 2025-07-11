import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/UserContext.jsx';
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { food_items } from '../assets/food.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const { input, setInput, cate, setCate, showCart, setShowCart } = useContext(DataContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newList = food_items.filter((item) =>
      item.food_name.toLowerCase().includes(input.toLowerCase())
    );
    setCate(newList);
  }, [input, setCate]);

  const items = useSelector((state) => state.Cart);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    navigate('/login');
  };

  return (
    <div className='w-full h-[100px] bg-amber-100 flex justify-between items-center px-5 md:px-8'>
      {/* Logo */}
      <div className='w-[200px] h-[70px] bg-amber-100 flex '>
        <img src="src/assets/logo1.png" alt="logo" />
      </div>

      {/* Search Bar */}
      <form
        className='w-[45%] h-[60%] bg-white flex items-center gap-0.5 px-5 rounded-md shadow-md md:w-[70%]'
        onSubmit={(e) => e.preventDefault()}
      >
        <IoSearch className='text-orange-400 w-[20px] h-[20px]' />
        <input
          type="text"
          placeholder=' Search your dish...'
          className='w-[100%] outline-none text-[15px] md:text-[20px]'
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </form>

      {/* Profile + Cart */}
      <div className='flex items-center gap-8 relative'>

        {/* Profile Icon */}
        <div className='relative'>
          <FaUserCircle
            className='text-gray-700 hover:text-amber-600 text-[30px] cursor-pointer'
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className='absolute right-0 mt-2 bg-white border rounded shadow-md z-50'>
              <button
                onClick={handleLogout}
                className='px-4 py-2 hover:bg-amber-100 text-sm w-full text-left'
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <div className='w-[25px] h-[60px] flex justify-center items-center relative' onClick={() => setShowCart(true)}>
          <span className='absolute top-1 right-0 font-bold text-sm text-black'>
            {items.length}
          </span>
          <FaShoppingCart className='w-[40px] h-[70px] text-orange-400 hover:text-amber-500 cursor-pointer' />
        </div>
      </div>
    </div>
  );
}

export default Nav;
