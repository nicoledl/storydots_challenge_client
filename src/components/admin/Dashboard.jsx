'use client'
import { useEffect, useState } from 'react';
import style from '../../styles/admin.module.css';
import { deleteProduct, getAllList } from '@/utils/fetch_data';
import { useRouter } from 'next/navigation';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [action, setAction] = useState(false);
  const router = useRouter()

  async function fetchData() {
    try 
    {
      setLoading(true);
      const response = await getAllList('products');
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
          <button onClick={()=>router.push('/admin/add')}>+</button>
        </div>
      </div>
      {products.map(product => row(product, action, setAction, router))}
    </div>
  )
}

function row(product, action, setAction, router){
  const {name, description, brandId, image_url, price, id} = product;
  const default_image= "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"

  return(
    <div className={style.dashboard_row} key={id}>
      <img src={image_url || default_image} alt={name} style={{objectFit:'cover'}} />
      <div>{name}</div>
      <div>{description}</div>
      <div>{price}</div>
      <div>Brand</div>
      <div>
        <button onClick={()=>{remove(id, setAction, action)}}>Delete</button>
        <button onClick={()=>{router.push(`/admin/edit/${id}`)}}>Edit</button>
      </div>
    </div>
  )
}

async function remove(id, setAction, action) {
  try 
  {
    const response = await deleteProduct('products',id);

    if (response === 200) {
      setAction(!action)
    }
  } 
  catch (error) 
  {
    console.error(error)
  }
  return
}


export default Dashboard