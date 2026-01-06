import React, { useState } from "react";
import PizzaList from "./PizzaList";
import Cart from "./Cart";

function App() {
  const [cart, setCart] = useState([]); // stores pizzas

  // function to add pizza to cart
  const addToCart = (pizza) => {
    setCart([...cart, pizza]); // add pizza to cart
  };

  return (
    <div>
      <h1>Pizza App</h1>
      <PizzaList addToCart={addToCart} /> {/* pizza menu */}
      <Cart cart={cart} />                {/* user cart */}
    </div>
  );
}

export default App;
