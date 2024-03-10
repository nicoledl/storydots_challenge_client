import { getAllList } from "@/utils/fetch_data";
import { useEffect, useState } from "react";
import style from "../../../styles/home.module.css"

function Cards({product}) {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {name, description, brandId, image_url, price, id} = product;
  const default_image= "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllList('brands');
      setBrands(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getBrand=()=>{
    const brandName = brands.find((brand) => brand.id == brandId)
    return brandName
  }

  const product_brand = getBrand()

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return(
    <div className={style.card} key={id}>
      <p>{name}</p>
      <span />
      <img src={image_url ? image_url : default_image} alt={name} />
      <p>${price}</p>
    </div>
  )
}

export default Cards