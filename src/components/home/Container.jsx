'use client'
import { get_all } from "@/utils/fetch_data";
import { useEffect, useState } from "react";
import Cards from "./products/Cards";
import style from "../../styles/home.module.css"
import LoadingScreen from "../Loading";

function Container() {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(){
    try 
    {
      setIsLoading(true);
      const response = await get_all('products');
      const fiveProducts = response.slice(0, 4)
    
      response.splice(0, 4)

      setDisplayed(displayed.concat(fiveProducts))
      setProducts(response);
    } 
    catch (error) 
    {
      setError(error);
    } 
    finally 
    {
      setIsLoading(false);
    }
  };

  function showMore() {
    const fiveProducts = products.slice(0, 4)
    
    products.splice(0, 4)

    setDisplayed(displayed.concat(fiveProducts))
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className={style.container}>
        <div>
        {displayed?.map((product) => (
          <Cards product={product} key={product.id} />
          ))}
        </div>
        {products?.length > 0 && <button onClick={showMore}>Show More</button>}
      </div>
    </>
);
}

export default Container