'use client'
import { useEffect, useState } from 'react'
import style from '../../../styles/home.module.css'
import { get_all } from '@/utils/fetch_data';
import { BsXLg } from 'react-icons/bs';

function Modal({product, handleModal}) {
  const {name, description, brandId, image_url, price, id} = product;
  const [brand, setBrand] = useState([]);
  const default_image= "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"

  async function getBrands() {
    try 
    {
      const responseBrands = await get_all('brands');
      const findBrand = responseBrands.find(brand=> brand.id == brandId)
      setBrand(findBrand)
    } 
    catch (error) 
    {
      console.error(error)
    }
  };

  function closeModal() {
    handleModal(false)
  }

  useEffect(()=>{
    getBrands()
  },[])

  return(
    <div className={style.modal} key={id}>
      <div>
        <div className={style.modal_container}>
          <BsXLg onClick={closeModal}/>
          <p>hold click to zoom in</p>
          <img src={image_url || default_image} alt={name} draggable={false}/>
          <div>
            <div>
              <h2 style={{margin:0}}>{name}</h2>
              <p>{brand?.name}</p>
              <p style={{fontSize:'20px'}}>${price}</p>
            </div>
            <div>
              Description:<br />
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal