'use client'
import { add_and_edit, get_all, get_by_id } from "@/utils/fetch_data"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function ProductForm({method, id}) { 
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  //  If the method is PUT we are gonna get the product by id
  //  Then create the function getProduct() to get the product by id
  const [product, setProduct] = useState({})
  async function getProduct(id) {
    try 
    {
      const responseProducts = await get_by_id('products', id);
      const responseBrands = await get_all('brands');

      setProduct(responseProducts) 
      setBrands(responseBrands)
    } 
    catch (error) 
    {
      console.error(error)
    }
  };

  
  function handlerError(message) {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 2000);
  }

  useEffect(()=>{
    if (method === "PUT") {
      getProduct(id)
    }
  },[])


  async function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { name, description,  image_url, price, brandId} = e.target;

    const formData ={
      name: name.value || product.name,
      description: description.value || product.description,
      image_url: image_url.value || product.image_url,
      price: price.value || product.price,
      brandId: brandId.value || product.brandId,
    }
      
    try {
      const response = await add_and_edit(method, product?.id, formData)
      router.push(`/admin/`)
    } 
    catch (error) 
    {
      handlerError(`${error.status} ${error.message} `)
      if (error.status === 401) {
      router.push(`/`)
      }
      throw error;
    } 
  }


  return(
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
          <label>Name</label>
            <input type="text" name="name" defaultValue={product?.name && product.name} required/>
          <label>Description</label>
            <input type="text" name="description" defaultValue={product?.description && product.description} required/>
          <label>Price</label>
            <input type="text" name="price" defaultValue={product?.price && product.price} required/>
          <label>Image</label>
            <input type="text" name="image_url" defaultValue={product?.image_url && product.image_url}/>
          <label>Brands</label>
            <select name="brandId" id="brands" defaultValue={product?.brands && product.brands} required>
              {
                brands.map(brand=> <option key={brand.id} value={brand.id}>{brand.name}</option>)
              }
            </select>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
      </form>
    </div>
  )
}

export default ProductForm