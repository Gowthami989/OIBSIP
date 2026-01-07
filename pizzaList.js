import React, { useEffect, useState } from "react";

function PizzaList({ addToCart }) {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas") // fetch pizzas from backend
      .then(res => res.json())
      .then(data => setPizzas(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {pizzas.map((pizza) => (
        <div key={pizza._id} style={{border:"1px solid black", padding:"10px", margin:"10px"}}>
          <h2>{pizza.name}</h2>
          <p>Price: ₹{pizza.price}</p>
          <button onClick={() => addToCart(pizza)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default PizzaList;
