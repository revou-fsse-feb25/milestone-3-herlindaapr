"use client"
import { get } from "http";
import {useEffect, useState}  from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import NotFound from "./NotFound";

async function getData(searchInput: string = ""): Promise<DataProduct[]> {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products?title=${searchInput}`);
    const data = await response.json();
  
    return data;
}

export default function ProductList() {
    const [products, setProduct] = useState<DataProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    let data: DataProduct[] = [];
    let error: string | null = null;

    const fetchData = async (searchInput: string = "") => {
        setIsLoading(true);
        try {
            data = await getData(searchInput);
            setProduct(data);
        } catch (e: any) {
            error = e.message;
        } finally {
            setIsLoading(false);
        }  
    }        

    useEffect(() => {
        fetchData();
    },[]);

    const handleSearchInput = (searchInput: string) => {
        fetchData(searchInput);
    }

    if (error) {
        return <div>Error: {error}</div>;
      };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-10">
            <SearchBar handleSearch={handleSearchInput} />
        {
            isLoading
            ? <LoadingSpinner/>
            : products.length === 0
            ? <NotFound/>
            :<div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-24 justify-center items-center">
                {products.map((product: DataProduct) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        }
        
    </div>
    );
}