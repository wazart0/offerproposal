import React from "react";
import Image from "next/image";


export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <nav className="flex items-center justify-between w-full mb-8">
        <div className="flex items-center">
          <a href="/">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </a>
          <ul className="flex space-x-4 ml-8">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/viewer" className="hover:underline">Plan Viewer</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign In
        </button>
      </nav>

      <form className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-lg font-medium">First Name</label>
          <input type="text" id="firstName" className="border border-gray-300 rounded-md p-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-lg font-medium">Last Name</label>
          <input type="text" id="lastName" className="border border-gray-300 rounded-md p-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-medium">Email</label>
          <input type="email" id="email" className="border border-gray-300 rounded-md p-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-lg font-medium">Phone</label>
          <input type="tel" id="phone" className="border border-gray-300 rounded-md p-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="details" className="text-lg font-medium">Details</label>
          <textarea id="details" className="border border-gray-300 rounded-md p-2" rows={4}></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </form>

    </main>
  );
}
