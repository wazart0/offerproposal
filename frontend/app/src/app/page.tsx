import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <nav className="flex items-center justify-between w-full mb-8">
        <div className="flex items-center">
          <a href="/">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </a>
          <ul className="flex space-x-4 ml-8">
            <li><a href="/">Home</a></li>
            <li><a href="/viewer">Plan Viewer</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign In
        </button>
      </nav>

    </main>
  );
}
