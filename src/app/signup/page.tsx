"use client";

import React, { useState } from "react";
import { Input, Button } from "@/components";
import withAccessControl from "@/hooks/withAccessControl";

const Signup = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email:""
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        // Redirect or clear form here if needed
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-6">Signup</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            type="email"
          />
          <Input
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            value={formData.username}
            type="text"
          />
           
          <Input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            type="password"
          />
          <Button type="submit" >
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default withAccessControl(Signup,{public:true});
