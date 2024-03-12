import { get_all } from "@/utils/fetch_data";
import { useEffect, useState } from "react";
import style from "../../../styles/home.module.css"
import Modal from "./Modal";
import LoadingScreen from "@/components/Loading";

function Cards({product}) {
  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const {name, description, brandId, image_url, price, id} = product;
  const default_image= "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
  

  function handleModal() {
    setOpenModal(true)
  }

  async function fetchData(){
    try {
      setIsLoading(true);
      const response = await get_all('brands');
      setBrands(response);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return(
    <>
      {openModal && <Modal product={product} handleModal={setOpenModal} />}
      <div className={style.card} key={id}>
        <p>{name}</p>
        <span />
        <img src={image_url ? image_url : default_image} alt={name} onClick={handleModal}/>
        <p>${price}</p>
      </div>
    </>
  )
}

export default Cards