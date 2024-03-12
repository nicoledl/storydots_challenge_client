'use client'
import { useEffect, useState } from 'react';
import style from '../../styles/admin.module.css';
import { delete_brand, get_all } from '@/utils/fetch_data';
import { useRouter } from 'next/navigation';
import { BsFillTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import LoadingScreen from "../Loading"

function DashboardBrands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [action, setAction] = useState(false);
  const router = useRouter()

  async function fetchData() {
    try 
    {
      setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [action]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return(
    <div className={style.dashboard}>
      <div className={style.dashboard_row_brands} style={{backgroundColor:'#ffffff', cursor:'auto', textTransform:'uppercase', fontWeight:'600'}}>
        <div>Image</div>
        <div>Name</div>
        <div>
          <BsPlusCircleFill onClick={()=>router.push('/admin/add/brands')} style={{color:'var(--main-color)', fontSize:'20px', cursor:'pointer'}}/>
        </div>
      </div>
      {brands?.map(brand => <Row key={brand.id} brand={brand} action={action} setAction={setAction} router={router} />)}
    </div>
  )
}


function Row({brand, action, setAction, router}){
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
        <BsFillTrash3Fill onClick={()=>{remove(id, setAction, action)}} style={{color:'#FF595E', cursor:'pointer'}}/>
      </div>
    </div>
  )
}


export default DashboardBrands