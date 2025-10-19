import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        width: "220px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h4 style={{ margin: "10px 0" }}>{product.name}</h4>
      <p style={{ color: "#555", fontSize: "14px" }}>{product.description}</p>
      <p style={{ fontWeight: "bold" }}>Ksh {product.price}</p>
      <button
        onClick={() => addToCart(product)}
        style={{
          background: "#007bff",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
