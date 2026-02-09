// Registration.js - Registration form component with various UI elements and validations

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { db } from './firebase';
function Registration({ auth, db }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    newsletter: false, // Switch (toggle)
    country: '', // Dropdown
    gender: '', // Radio
    terms: false, // Checkbox
    birthdate: '', // Date (cannot select future date)
    startDate: '', // Date range start (cannot select past dates)
    endDate: '', // Date range end (must be after start)
    preferredTime: '', // Time (cannot select past time for today)
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' || type === 'switch' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const currentTime = new Date().toISOString().split('T')[1].slice(0, 5); // HH:MM

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.terms) newErrors.terms = 'You must agree to terms';
    if (!formData.birthdate || formData.birthdate > currentDate) newErrors.birthdate = 'Birthdate cannot be in the future';
    if (!formData.startDate || formData.startDate < currentDate) newErrors.startDate = 'Start date cannot be in the past';
    if (!formData.endDate || formData.endDate <= formData.startDate) newErrors.endDate = 'End date must be after start date';
    if (!formData.preferredTime || (formData.startDate === currentDate && formData.preferredTime < currentTime)) {
      newErrors.preferredTime = 'Preferred time cannot be in the past for today';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store additional data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: formData.username,
        password:formData.password,
        newsletter: formData.newsletter,
        country: formData.country,
        gender: formData.gender,
        birthdate: formData.birthdate,
        dateRange: { start: formData.startDate, end: formData.endDate },
        preferredTime: formData.preferredTime,
      });

      navigate('/login');
    } catch (err) {
      setErrors({ submit: 'Registration failed: ' + err.message });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Input - Username */}
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>

        {/* Input - Email */}
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        {/* Input - Password */}
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        {/* Switch - Newsletter */}
        <div>
          <label>Subscribe to Newsletter:</label>
          <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} /> {/* Using checkbox as switch for simplicity; style as switch if needed */}
        </div>

        {/* Dropdown - Country */}
        <div>
          <label>Country:</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
        </div>

        {/* Radio - Gender */}
        <div>
          <label>Gender:</label>
          <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
          <input type="radio" name="gender" value="Other" onChange={handleChange} /> Other
          {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
        </div>

        {/* Checkbox - Terms */}
        <div>
          <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
          <label>I agree to terms</label>
          {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}
        </div>

        {/* Date - Birthdate (max today) */}
        <div>
          <label>Birthdate:</label>
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
          {errors.birthdate && <p style={{ color: 'red' }}>{errors.birthdate}</p>}
        </div>

        {/* Date Range - Example: Event Period (start min today, end > start) */}
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
          {errors.startDate && <p style={{ color: 'red' }}>{errors.startDate}</p>}
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} min={formData.startDate || new Date().toISOString().split('T')[0]} />
          {errors.endDate && <p style={{ color: 'red' }}>{errors.endDate}</p>}
        </div>

        {/* Time - Preferred Time (if startDate is today, min current time) */}
        <div>
          <label>Preferred Time:</label>
          <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} />
          {errors.preferredTime && <p style={{ color: 'red' }}>{errors.preferredTime}</p>}
        </div>

        {errors.submit && <p style={{ color: 'red' }}>{errors.submit}</p>}
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Registration;