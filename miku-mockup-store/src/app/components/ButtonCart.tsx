import { PiShoppingCartSimpleFill } from "react-icons/pi";

export default function ButtonCart() {
    return (
        <button className="flex self-end border-0 hover:cursor-pointer">
            <PiShoppingCartSimpleFill className="self-center text-teal-800 hover:text-teal-950 text-2xl lg:text-3xl mx-2" />
        </button>
    );
}