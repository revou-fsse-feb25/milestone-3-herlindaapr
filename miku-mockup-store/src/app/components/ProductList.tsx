"use client"

import { useCallback, useEffect, useRef, useState }  from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import NotFound from "./NotFound";
import { DataProduct } from "../types/index.types";
import { getProducts } from "../services/productServices";


export default function ProductList() {
    const [products, setProduct] = useState<DataProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNoMoreProducts, setIsNoMoreProducts] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    let data: DataProduct[] = [];
    let error: string | null = null;

    const fetchData = async (searchInput: string = "", limit: number = 12, offset: number = 0) => {
        setIsLoading(true);
        try {
            const res = await getProducts(limit, offset, searchInput);
            data = res.products
            
                setIsNoMoreProducts(data.length < limit);
             
            setProduct((prev) => {
                const existingIds = prev.map((e)=> e.id)
                const filteredData = data.filter((item)=> !existingIds.includes(item.id))
                return [...prev, ...filteredData]
            });
        } catch (e: any) {
            error = e.message;
        } finally {
            setIsLoading(false);
        }  
    }


    useEffect(() => {
        fetchData();
    },[]);

    // Handle search input from SearchBar component
    const handleSearchInput = (searchInput: string) => {
        setProduct([]); // Clear current products
        setIsNoMoreProducts(false); // Reset no more products state
        setSearchInput(searchInput); // Update search input state
        fetchData(searchInput);
    }

    // Infinite scroll functionality using Intersection Observer
    const observer = useRef<IntersectionObserver>(null);
    const lastPostElementRef = useCallback(
        (node: HTMLDivElement) => {
          if (isLoading || isNoMoreProducts) return;
          if (observer.current) observer.current.disconnect();
    
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // console.log("Fetching more products...");
                fetchData(searchInput, 12, products.length);
            }
          });
    
          if (node) observer.current.observe(node);
        },
        [isLoading, isNoMoreProducts, searchInput]
      );

    // Handle error state
    if (error) {
        return <div>Error: {error}</div>;
      };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-10">
            <SearchBar handleSearch={handleSearchInput} />
       { products.length === 0
            ? isLoading ? <></> : <NotFound/>
            :<div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-24 justify-center items-center">
                {products.map((product: DataProduct) => (
                    <ProductCard product={product} key={product.id} />
                ))}
                
            </div>
        }

        {
            isLoading
            ? <LoadingSpinner/>
            : null
        }

        <div ref={lastPostElementRef}></div>
        
    </div>
    );
}