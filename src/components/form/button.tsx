"use client";
import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: "button" | "submit" | "reset";
}

export const Button = ({
    children,
    onClick = () => { },
    type = "button",
}: ButtonProps) => {
    return (
        <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type={type}    >
            {children}
        </button>
    );
};
