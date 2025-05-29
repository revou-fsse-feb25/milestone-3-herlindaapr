import Link from "next/link";
import ButtonCart from "./ButtonCart";
import { DataProduct } from "../types/index.types";


export default function ProductCard({product} : {product: DataProduct}) {
    return (
        <div key={product.id} className="w-full h-full bg-white relative flex flex-col shadow-md rounded-lg p-4">
            <div className="flex flex-col justify-center">
                <img
                    width={400}
                    height={200}
                    src={product.images[0]}
                    alt={product.title}
                    className="object-cover rounded-lg"
                />
            </div>
            <h2 className="text-xl text-gray-950 font-bold mt-2">{product.title}</h2>
            <p className="text-gray-700 text-base font-semibold pb-10">${product.price}</p>
            <div className="flex flex-row self-end absolute bottom-2 right-2 text-sm">
                <Link href={`/products/${product.id}`} className="text-teal-900 py-1 hover:underline">Details</Link>
                <ButtonCart product={{
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: product.images[0],
                }}/>
            </div>
        </div>
    );
}