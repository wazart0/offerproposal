import React from "react";
import Image from "next/image";

import Navbar from "../components/navbar";


export default () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      

      <Navbar />

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
