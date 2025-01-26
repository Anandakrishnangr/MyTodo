"use client"
import { Input, Button } from '@/components'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    password: "",
    email: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.token}; path=/; secure; HttpOnly;`;
        alert('Login successful!'); 
        login()
        // Redirect or perform other actions
      } else {
        const error = await response.json();
        alert(error.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      alert('Something went wrong.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className='flex justify-center'>
      <div>
        <h1 className='text-center text-3xl'>LOGIN</h1>
        <form className='flex flex-col w-96 gap-1 '>
          <Input name={"email"} placeholder={"Email"} onChange={handleChange} type={"email"} />
          <Input name={"password"} placeholder={"Password"} onChange={handleChange} type={"password"} />
          <Button onClick={handleSubmit}> Login</Button>
        </form>
      </div>
    </div>
  )
}

export default Login