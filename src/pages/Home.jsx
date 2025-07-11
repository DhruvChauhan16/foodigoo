import React, { useContext } from 'react';
import Nav from '../components/Nav';
import categories from '../category';
import Card from '../components/Card';
import { food_items } from '../assets/food';
import { DataContext } from '../context/UserContext';
import { RxCross2 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux'; // <-- updated
import { clearCart } from '../redux/CartSlice';   // <-- added
import Card2 from '../components/Card2';
import { toast } from 'react-toastify';

function Home() {
  const { cate, setCate, input, showCart, setShowCart } = useContext(DataContext);
  const items = useSelector((state) => state.Cart);
  const dispatch = useDispatch(); // <-- added

  function filterCategory(category) {
    if (category === 'All') {
      setCate(food_items);
    } else {
      const filteredItems = food_items.filter((item) => item.food_category === category);
      setCate(filteredItems);
    }
  }

  let subtotal = items.reduce((total, item) => total + item.qty * item.price, 0);
  let deliveryFee = 50;
  let taxes = parseFloat((subtotal * 0.05).toFixed(2)); // Assuming 5% tax
  let total = parseFloat((subtotal + deliveryFee + taxes).toFixed(2));

  return (
    <div className="w-full min-h-screen bg-amber-50">
      <Nav />

      {/* Categories Section */}
      {input.trim() === '' && (
        <div className="flex flex-wrap justify-center items-center gap-5 px-4 py-6">
          {categories.map((item, index) => (
            <div
              key={index}
              className="w-[130px] h-[170px] bg-amber-200 flex flex-col items-center justify-center gap-4 p-4 text-[18px] sm:text-[20px] font-bold text-gray-900 rounded-lg shadow-xl cursor-pointer transition-all duration-200 hover:bg-amber-300"
              onClick={() => filterCategory(item.name)}
            >
              {item.image}
              {item.name}
            </div>
          ))}
        </div>
      )}

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-20 max-w-7xl mx-auto mt-6">
        {cate.map((item) => (
          <Card
            key={item.id}
            name={item.food_name}
            image={item.food_image}
            price={item.price}
            id={item.id}
            type={item.food_type}
          />
        ))}
      </div>

      {/* No Results */}
      {input.trim() !== '' && cate.length === 0 && (
        <div className="text-center text-gray-500 text-2xl mt-10">
          No results found for "<span className="font-semibold">{input}</span>"
        </div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[80vw] md:w-[50vw] lg:w-[35vw] bg-white shadow-2xl z-50 p-5 transform transition-transform duration-300 ease-in-out ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Cart Header */}
        <header className="flex justify-between items-center mb-4">
          <span className="text-[22px] sm:text-[26px] font-semibold font-serif">Order Items</span>
          <RxCross2
            className="w-[25px] h-[25px] text-gray-600 hover:text-red-600 cursor-pointer"
            onClick={() => setShowCart(false)}
          />
        </header>

        {/* Cart Items */}
        <div className="h-[60%] overflow-y-auto pr-2">
          {items.length > 0 ? (
            items.map((item) => (
              <Card2
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                qty={item.qty}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
          )}
        </div>

        {/* Price Summary and Place Order */}
        {items.length > 0 && (
          <>
            <div className="mt-4 space-y-2 border-t border-b py-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>{subtotal}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Delivery Fee</span>
                <span>{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Taxes</span>
                <span>{taxes}</span>
              </div>
              <div className="flex justify-between font-semibold text-xl border-t pt-2 mt-2">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="w-full bg-yellow-300 text-gray-950 px-4 py-2 rounded cursor-pointer hover:bg-amber-400 text-[20px] transition-all"
                onClick={() => {
                  toast.success("Order Placed Successfully");
                  dispatch(clearCart());          // Clear cart
                  setShowCart(false);             // Close cart
                }}
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
