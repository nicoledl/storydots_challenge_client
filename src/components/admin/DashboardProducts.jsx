'use client'
import { useEffect, useState } from 'react';
import style from '../../styles/admin.module.css';
import { delete_product, get_all } from '@/utils/fetch_data';
import { useRouter } from 'next/navigation';
import { BsFillPencilFill, BsFillTrash3Fill, BsPlusCircleFill } from "react-icons/bs";

function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [action, setAction] = useState(false);
  const router = useRouter()

  async function fetchData() {
    try 
    {
      setLoading(true);

      const responseProducts = await get_all('products');
      const responseBrands = await get_all('brands');
      
      setProducts(responseProducts);
      setBrands(responseBrands)
    } 
    catch (error) 
    {
      setError(error);
      router.push('/')
    } 
    finally 
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [action]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return(
    <div className={style.dashboard}>
      <div className={style.dashboard_row}>
        <div>Image</div>
        <div>Name</div>
        <div>Description</div>
        <div>Price</div>
        <div>Brand</div>
        <div>
          <BsPlusCircleFill onClick={()=>router.push('/admin/add/product')} />
        </div>
      </div>
      {products?.map(product => row(product, action, setAction, router, brands))}
    </div>
  )
}


function row(product, action, setAction, router, brands){
  async function remove(id, setAction, action) {
    try 
    {
      const response = await delete_product('products',id);
  
      if (response.ok) {
        setAction(!action)
      }
    } 
    catch (error) 
    {
      localStorage.removeItem('token');
      if (error.status === 401) {
        router.push(`/`)
      }
      throw error;
    }
  }

  const {name, description, brandId, image_url, price, id} = product;
  const default_image= "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
  const brand = brands.find(brand=> brandId === brand.id)

  return(
    <div className={style.dashboard_row} key={id}>
      <img src={image_url || default_image} alt={name} style={{objectFit:'cover'}} />
      <div>{name}</div>
      <div>{description}</div>
      <div>{price}</div>
      <div>{brand.name}</div>
      <div>
        <BsFillTrash3Fill onClick={()=>{remove(id, setAction, action)}} />
        <BsFillPencilFill onClick={()=>{router.push(`/admin/edit/${id}`)}} />
      </div>
    </div>
  )
}


export default DashboardProducts