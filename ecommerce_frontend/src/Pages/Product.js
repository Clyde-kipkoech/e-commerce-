// src/pages/Products.js
import React, { useEffect, useState } from "react";
import API from "../api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("products/"); // GET /api/products/
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products">
      <h1>Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
            }}
          >
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>
              <strong>${p.price}</strong>
            </p>
            <p>Stock: {p.stock}</p>
            <p>Category: {p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
