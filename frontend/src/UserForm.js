import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
      alert(' User saved successfully!');
      console.log('Saved:', response.data);
    } catch (error) {
      alert(` Error: ${error.response?.data?.error || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <br />

        <div>
          <label>Surname:</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
        </div>
        <br />

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <br />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;