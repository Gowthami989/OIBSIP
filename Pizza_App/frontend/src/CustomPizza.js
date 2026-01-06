import { useState } from "react";

function CustomPizza({ token }) {
  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [topping, setTopping] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const prices = {
    base: 100,
    sauce: 40,
    cheese: 60,
    topping: 50,
  };

  const total =
    (base ? prices.base : 0) +
    (sauce ? prices.sauce : 0) +
    (cheese ? prices.cheese : 0) +
    (topping ? prices.topping : 0);

  const placeOrder = async () => {
    if (!token) {
      alert("Please login first to place order!");
      return;
    }

    if (!base || !sauce || !cheese || !topping) {
      alert("Please select all options");
      return;
    }

    const orderData = {
      base,
      sauce,
      cheese,
      topping,
      totalPrice: total,
    };

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ token included
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Custom pizza order placed successfully ✅");
        setShowSummary(true);
      } else {
        alert(result.message || "Failed to place order ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Order failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px" }}>
      <h2>Custom Pizza Builder 🍕</h2>

      <select value={base} onChange={(e) => setBase(e.target.value)} style={{ width: "100%", padding: "5px", marginBottom: "10px" }}>
        <option value="">Select Base</option>
        <option>Thin Crust</option>
        <option>Cheese Burst</option>
        <option>Pan Base</option>
      </select>

      <select value={sauce} onChange={(e) => setSauce(e.target.value)} style={{ width: "100%", padding: "5px", marginBottom: "10px" }}>
        <option value="">Select Sauce</option>
        <option>Tomato</option>
        <option>BBQ</option>
        <option>White Sauce</option>
      </select>

      <select value={cheese} onChange={(e) => setCheese(e.target.value)} style={{ width: "100%", padding: "5px", marginBottom: "10px" }}>
        <option value="">Select Cheese</option>
        <option>Mozzarella</option>
        <option>Cheddar</option>
      </select>

      <select value={topping} onChange={(e) => setTopping(e.target.value)} style={{ width: "100%", padding: "5px", marginBottom: "10px" }}>
        <option value="">Select Topping</option>
        <option>Olives</option>
        <option>Onions</option>
        <option>Jalapenos</option>
      </select>

      <button onClick={placeOrder} style={{ padding: "8px 15px", backgroundColor: "#61dafb", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Place Order
      </button>

      {showSummary && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f8f8f8", borderRadius: "5px" }}>
          <h3>Order Summary 🧾</h3>
          <p><b>Base:</b> {base}</p>
          <p><b>Sauce:</b> {sauce}</p>
          <p><b>Cheese:</b> {cheese}</p>
          <p><b>Topping:</b> {topping}</p>
          <h4>Total Price: ₹{total}</h4>
        </div>
      )}
    </div>
  );
}

export default CustomPizza;
