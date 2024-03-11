'use client'
import { useEffect, useState } from 'react';
import style from '../../styles/admin.module.css';
import { delete_brand, get_all } from '@/utils/fetch_data';
import { useRouter } from 'next/navigation';
import { BsFillTrash3Fill, BsPlusCircleFill } from "react-icons/bs";

function DashboardBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [action, setAction] = useState(false);
  const router = useRouter()

  async function fetchData() {
    try 
    {
      setLoading(true);

      const responseBrands = await get_all('brands');
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
      <div className={style.dashboard_row_brands}>
        <div>Image</div>
        <div>Name</div>
        <div>
          <BsPlusCircleFill onClick={()=>router.push('/admin/add/brands')} />
        </div>
      </div>
      {brands?.map(brand => row(brand, action, setAction, router))}
    </div>
  )
}


function row(brand, action, setAction, router){
  async function remove(id, setAction, action) {
    try 
    {
      const response = await delete_brand(id);
  
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

  const {name, logo_url, id} = brand;
  const default_image= "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"

  return(
    <div className={style.dashboard_row_brands} key={id}>
      <img src={logo_url || default_image} alt={name} style={{objectFit:'cover'}} />
      <div>{name}</div>
      <div>
        <BsFillTrash3Fill onClick={()=>{remove(id, setAction, action)}} />
      </div>
    </div>
  )
}


export default DashboardBrands