import Image from "next/image";
import ProductList from "../components/ProductList";

export default function HomePage() {
    return (
        <main>
          <section className="flex w-full h-screen">
            <div>
              <Image src={"/background.png"} 
              alt="Miku"
              fill
              objectFit="cover" />
            </div>
            <div className="w-full h-screen absolute flex flex-col justify-center px-10">
              <h1 className="text-4xl text-teal-950">Miku Mockup Store</h1>
              <p className="text-xl font-semibold text-teal-900">Your next favorite thing is just a tap away!<br/> 
                                                      Find it, love it, or pass it on<br/>
                                                      The cutest way to shop and sell!</p>
            </div>
            <div className="absolute bottom-0 left-3/6 -translate-x-1/2 animate-bounce">
              <Image src={"/scroll.png"}
              width={60}
              height={60} 
              alt="Scroll Down Icon"
              />
            </div>
          </section>
          <section className="w-full h-full bg-teal-950 min-h-screen">
            <h1 className="text-3xl text-white text-center py-10">PRODUCTS</h1>
            <ProductList />
          </section>
        </main>
      );
}