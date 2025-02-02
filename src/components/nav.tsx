'use client'
import { useAuth } from "@/app/context/authContext";
import Link from "next/link";

export const NavBar = () => {
    const { logout } = useAuth();
    return (
        <div className="flex">
            <Link className="px-9 border border-cyan-50" href={'/signup'}>Signup</Link>
            <Link className="px-9 border border-cyan-50" href={'/login'}>login</Link>
            <Link className="px-9 border border-cyan-50" href={'/about'}>about</Link>
            <Link className="px-9 border border-cyan-50" href={'/'}>Home</Link>
            <Link className="px-9 border border-cyan-50" href={'#'} onClick={logout}>Logout</Link>
        </div>
    );
};