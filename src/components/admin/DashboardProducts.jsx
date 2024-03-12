'use client'
import { useEffect, useState } from 'react';
import style from '../../styles/admin.module.css';
import { delete_product, get_all } from '@/utils/fetch_data';
import { useRouter } from 'next/navigation';
import { BsBoxArrowDown, BsFillPencilFill, BsFillTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import LoadingScreen from '../Loading';

function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [action, setAction] = useState(false);
  const [windowScreen, setWindowScreen] = useState(0);
  const router = useRouter()

  async function fetchData() {
    try 
    {
      setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [action]);

  useEffect(() => {
    setWindowScreen(window.innerWidth);
    const handlerWindowChange = () => setWindowScreen(window.innerWidth);

    window.addEventListener('resize', handlerWindowChange);

    return () => window.removeEventListener('resize', handlerWindowChange);
  }, [windowScreen]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return(
    <div className={style.dashboard}>
      <div className={style.dashboard_row} style={{backgroundColor:'#ffffff', cursor:'auto', textTransform:'uppercase', fontWeight:'600'}} >
        <div>Image</div>
        <div>Name</div>
        {windowScreen > 722 && <div>Description</div>}
        {windowScreen > 722 && <div>Brand</div>}
        <div>Price</div>
        <div>
          <BsPlusCircleFill onClick={()=>router.push('/admin/add/products')} style={{color:'var(--main-color)', fontSize:'20px', cursor:'pointer'}} />
        </div>
      </div>
      {products?.map(product => <Row key={product.id} product={product} action={action} setAction={setAction} router={router} brands={brands} windowScreen={windowScreen} />)}
    </div>
  )
}

function Row({ product, action, setAction, router, brands, windowScreen }) {
  const { name, description, brandId, image_url, price, id } = product;
  const default_image = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
  const brand = brands.find(brand => brandId === brand.id);
  const [openData, setOpenData] = useState(false);

  async function remove(id, setAction, action) {
    try {
      const response = await delete_product('products', id);

      if (response.ok) {
        setAction(!action);
      }
    } catch (error) {
      localStorage.removeItem('token');
      if (error.status === 401) {
        router.push(`/`);
      }
      throw error;
    }
  }

  function container() {
    return (
      <div className={style.dashboard_row_container}>
        <div>
          <p><span>Name</span>: {name}</p>
          <p><span>Price</span>: ${price}</p>
          <p><span>Brand</span>: {brand?.name}</p>
        </div>
        <p><span>Description</span>:<br /> {description}</p>
      </div>
    );
  }

  function handleClick() {
    setOpenData(!openData);
  }

  return (
    <>
      <div className={style.dashboard_row} key={id} onClick={handleClick}>
        <img src={image_url || default_image} alt={name} />
        <div>{name}</div>
        {windowScreen > 722 && <div><BsBoxArrowDown /></div>}
        <div>{price}</div>
        {windowScreen > 722 && <div>{brand?.name}</div>}
        <div style={{ gap: 5 }}>
          <BsFillTrash3Fill onClick={() => { remove(id, setAction, action) }} style={{ color: '#FF595E', cursor: 'pointer' }} />
          <BsFillPencilFill onClick={() => { router.push(`/admin/edit/${id}`) }} style={{ color: '#1982C4', cursor: 'pointer' }} />
        </div>
      </div>
      {openData && container()}
    </>
  );
}


export default DashboardProducts