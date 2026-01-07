import { useEffect, useState } from "react";
import CustomPizza from "./CustomPizza";
import Signup from "./Signup";
import Login from "./Login";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(null);
  const [orders, setOrders] = useState([]);

  // Load token from localStorage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // Fetch backend data with token
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) return; // skip if not logged in

      try {
        const response = await fetch("http://localhost:5000/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, [token]); // run when token changes

  // Fetch pizzas list (public)
  useEffect(() => {
    async function fetchPizzas() {
      try {
        const response = await fetch("http://localhost:5000/pizzas");
        const result = await response.json();
        setPizzas(result);
      } catch (err) {
        console.error("Failed to fetch pizzas:", err);
      }
    }
    fetchPizzas();
  }, []);

  // Cart operations
  const addToCart = (pizza) => {
    const index = cart.findIndex(item => item.pizza.id === pizza.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart[index].qty += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { pizza, qty: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const increaseQty = (index) => {
    const newCart = [...cart];
    newCart[index].qty += 1;
    setCart(newCart);
  };

  const decreaseQty = (index) => {
    const newCart = [...cart];
    if (newCart[index].qty > 1) {
      newCart[index].qty -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.pizza.price * item.qty, 0);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          total: total,
        }),
      });

      const result = await response.json();
      alert(result.message);
      setCart([]);
      fetchOrders();
    } catch (error) {
      console.error("Order failed:", error);
      alert("❌ Failed to place order");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    window.location.reload();
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/orders", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="container">
      <h1>Pizza App 🍕</h1>

      {!token ? (
        <>
          <h2>Welcome! Please Signup or Login</h2>
          <Signup />
          <hr />
          <Login />
        </>
      ) : (
        <>
          <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
            Logout
          </button>

          {data ? (
            <div className="message">
              <p><b>Message:</b> {data.message}</p>
            </div>
          ) : (
            <p>Loading backend data...</p>
          )}

          <hr />

          <h2>Pizza List</h2>
          {pizzas.length > 0 ? (
            <div>
              {pizzas.map((pizza, index) => (
                <div key={index} className="card">
                  <h3>{pizza.name}</h3>
                  <p>Price: ₹{pizza.price}</p>
                  <button onClick={() => addToCart(pizza)}>Add to Cart</button>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading pizzas...</p>
          )}

          <hr />

          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="message">Cart is empty</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="card">
                  <p>{item.pizza.name} - ₹{item.pizza.price} x {item.qty}</p>
                  <button onClick={() => increaseQty(index)}>+</button>
                  <button onClick={() => decreaseQty(index)} style={{ marginLeft: "5px" }}>-</button>
                  <button onClick={() => removeFromCart(index)} style={{ marginLeft: "5px" }}>Remove</button>
                </div>
              ))}
              <p><b>Total: ₹{cart.reduce((sum, item) => sum + item.pizza.price * item.qty, 0)}</b></p>
              <button onClick={placeOrder}>Place Order</button>
            </>
          )}

          <hr />

          {/* ✅ Pass token to CustomPizza */}
          <CustomPizza token={token} />

          <hr />

          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p className="message">No orders yet</p>
          ) : (
            orders.map(order => (
              <div key={order._id} className="card">
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>Total:</b> ₹{order.total}</p>
                <ul>
                  {order.items.map((pizza, i) => (
                    <li key={i}>{pizza.pizza.name} - ₹{pizza.pizza.price} x {pizza.qty}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default App;

