import React from 'react'
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full mb-8">
      <div className="flex items-center">
        <a href="/">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </a>
        <ul className="flex space-x-4 ml-8">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/viewer" className="hover:underline">Offer Viewer</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Sign In
      </button>
    </nav>
  );
}
