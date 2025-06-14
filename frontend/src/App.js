import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    subname: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.subname || !formData.email) {
      setMessage("Veuillez remplir tous les champs.");
      setIsSuccess(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("User saved successfully !");
        setIsSuccess(true);
        setFormData({ name: "", subname: "", email: "" });
      } else {
        const errorData = await res.json();
        setMessage(`Erreur : ${errorData.message || "Failed to save user"}`);
        setIsSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to save user.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="App">
      <h1>Mini App Form</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="write your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subname">Subname</label>
          <input
            id="subname"
            type="text"
            name="subname"
            placeholder="write your subname"
            value={formData.subname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save</button>
      </form>

      {message && (
        <p className={`message ${isSuccess ? "success" : "error"}`}>{message}</p>
      )}
    </div>
  );
}

export default App;