import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="fixed flex flex-row top-0 z-10 bg-white w-full max-h-max px-4 py-1">
            <>
            <Image
            src={"/logo.png"}
            width={35}
            height={30}
            alt="Miku Mockup Store"
            />
            <PiShoppingCartSimpleFill className="self-center text-teal-800 text-3xl mx-2" />
            <div className="py-1 px-1.5 self-center font-semibold flex flex-row">
                <button className="text-teal-800 text-sm hover:cursor-pointer hover:underline">Sign Up</button>
                <p className="text-gray-400 mx-1 select-none">|</p>
                <button className="text-teal-800 text-sm hover:cursor-pointer hover:underline">Login</button>
            </div>
            </>
        </nav>
  );
}