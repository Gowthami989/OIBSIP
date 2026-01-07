import React from "react";

function Cart({ cart }) {
  // calculate total price
  const total = cart.reduce((sum, pizza) => sum + pizza.price, 0);

  return (
    <div style={{border:"1px solid blue", padding:"10px", margin:"10px"}}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : null}
      {cart.map((pizza, index) => (
        <p key={index}>{pizza.name} - ₹{pizza.price}</p>
      ))}
      <h3>Total: ₹{total}</h3>
      {cart.length > 0 && <button>Place Order</button>}
    </div>
  );
}

export default Cart;
