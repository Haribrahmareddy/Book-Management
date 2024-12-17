import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => alert("Contact saved!"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      <label>Name:</label>
      <input name="name" onChange={handleChange} required />
      <label>Mobile:</label>
      <input name="mobile" type="tel" onChange={handleChange} required />
      <label>Message:</label>
      <textarea name="message" onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Contact;
