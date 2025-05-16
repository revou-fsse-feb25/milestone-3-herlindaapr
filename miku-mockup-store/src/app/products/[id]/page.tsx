import ButtonCart from "@/app/components/ButtonCart";
import Carousel from "@/app/components/Carousel";

export default async function DetailProduct({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params;

     // Check if the request is coming from the client
     const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
     const data = await response.json();

    return (
        <div className="bg-gradient-to-bl from-teal-700 to-teal-950 max-h-max py-14">
          <div className="bg-white flex flex-col w-3/4 lg:w-1/2 h-max justify-self-center gap-y-4 shadow-md shadow-gray-200/60 px-4 lg:px-8">
            <h1 className="text-xl lg:text-2xl text-center text-teal-900 pt-4">{data.title}</h1>
            <div className="flex flex-row justify-center self-center">
              <Carousel data={data} />
            </div>
            <div>
              <h2 className="text-teal-900">Description:</h2>
              <p className="text-teal-800">{data.description}</p>
            </div>
            <div>
              <h2 className="text-teal-900 font-light">Price:</h2>
              <p className="text-teal-700 font-extrabold text-xl lg:text-2xl">${data.price}</p>
            </div>
            <div className="self-end py-4">
              <ButtonCart />
            </div>
          </div>
        </div> 
    )
}