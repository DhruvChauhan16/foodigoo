import React, { createContext, useState} from 'react'
import { food_items } from '../assets/food';
export const DataContext = createContext();
function UserContext({children}) {
    const [cate,setCate] = useState(food_items)
    const [input, setInput] = useState("")
    const [showCart, setShowCart] = useState(false)
    const data={
        input,
        setInput,
        cate,
        setCate,
        showCart,
        setShowCart
    };
  return (
    <div>
        <DataContext.Provider value={data}>
        {children}
        </DataContext.Provider>
    </div>
  )
}

export default UserContext
