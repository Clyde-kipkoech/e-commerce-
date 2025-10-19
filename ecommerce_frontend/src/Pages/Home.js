import React, { useState } from "react";
import products from "./products";
import ProductCard from "./ProductCard";

const HomePage = () => {
  const [cart, setCart] = useState([]);

  //  Add product to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      alert(`${product.name} is already in the cart!`);
    } else {
      setCart([...cart, product]);
      alert(`${product.name} added to cart!`);
    }
  };

  // ✅ Remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // ✅ Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>🛍️ Our Products</h2>

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {/* Cart Section */}
      <div
        style={{
          marginTop: "50px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          marginInline: "auto",
        }}
      >
        <h3 style={{ textAlign: "center" }}>🛒 Your Cart ({cart.length})</h3>

        {cart.length > 0 ? (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cart.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <span>
                    {item.name} — <strong>Ksh {item.price}</strong>
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <h4
              style={{
                textAlign: "right",
                marginTop: "20px",
                fontSize: "18px",
              }}
            >
              Total: <span style={{ color: "#28a745" }}>Ksh {totalPrice}</span>
            </h4>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>No items in the cart.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
