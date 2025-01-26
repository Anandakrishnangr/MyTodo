"use client"

interface InputProps{
    type: string,
    placeholder: string,
    name: string,
    value?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ type, placeholder, name, value, onChange }:InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      
    />
  );
};