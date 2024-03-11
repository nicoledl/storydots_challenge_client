'use client'
import { get_all } from "@/utils/fetch_data";
import { useEffect, useState } from "react";
import Cards from "./products/Cards";
import style from "../../styles/home.module.css"

function Container() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try 
    {
      setLoading(true);
      const response = await get_all('products');
      setProducts(response);
    } 
    catch (error) 
    {
      setError(error);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={style.container}>
      {products?.map((product) => (
        <Cards product={product} key={product.id} />
      ))}
    </div>
);
}

export default Container