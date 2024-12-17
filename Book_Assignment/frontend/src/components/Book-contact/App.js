import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [contact, setContact] = useState({ name: "", mobile: "", message: "" });
  const [book, setBook] = useState({
    title: "",
    authorID: "",
    genreID: "",
    pages: "",
    publishedDate: "",
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const submitContactForm = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/contact", contact);
      alert("Contact form submitted successfully!");
      setContact({ name: "", mobile: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to submit contact form.");
    }
  };

  const submitBookForm = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/books", book);
      alert("Book added successfully!");
      setBook({ title: "", authorID: "", genreID: "", pages: "", publishedDate: "" });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Form</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={contact.name}
        onChange={handleContactChange}
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={contact.mobile}
        onChange={handleContactChange}
      />
      <textarea
        name="message"
        placeholder="Message"
        value={contact.message}
        onChange={handleContactChange}
      />
      <button onClick={submitContactForm}>Submit Contact</button>

      <h1>Add Book</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={book.title}
        onChange={handleBookChange}
      />
      <input
        type="text"
        name="authorID"
        placeholder="Author ID"
        value={book.authorID}
        onChange={handleBookChange}
      />
      <input
        type="text"
        name="genreID"
        placeholder="Genre ID"
        value={book.genreID}
        onChange={handleBookChange}
      />
      <input
        type="number"
        name="pages"
        placeholder="Pages"
        value={book.pages}
        onChange={handleBookChange}
      />
      <input
        type="date"
        name="publishedDate"
        placeholder="Published Date"
        value={book.publishedDate}
        onChange={handleBookChange}
      />
      <button onClick={submitBookForm}>Add Book</button>
    </div>
  );
};

export default App;
