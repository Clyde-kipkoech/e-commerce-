// src/pages/AddProduct.js
import React, { useState } from "react";
import API from "../api";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    category: "other",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("products/", form); // POST /api/products/
      alert("Product added!");
    } catch (err) {
      console.error(err);
      alert("Error adding product. Check console.");
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
          <option value="books">Books</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
