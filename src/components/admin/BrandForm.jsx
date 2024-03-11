'use client'
import { add_and_edit, add_brand, get_by_id } from "@/utils/fetch_data"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function BrandForm({method, id}) { 
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  //  If the method is PUT we are gonna get the product by id
  //  Then create the function getProduct() to get the product by id
  const [product, setProduct] = useState({})
  async function getProduct(id) {
    try 
    {
      const response = await get_by_id('products', id);
      setProduct(response) 
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

    const { name, logo_url } = e.target;

    const formData ={
      name: name.value || product.name,
      logo_url: logo_url.value || product.logo_url,
    }
      
    try {
      const response = await add_brand(formData)
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
            <input type="text" name="name" required/>
          <label>Image</label>
            <input type="text" name="logo_url" />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
      </form>
    </div>
  )
}

export default BrandForm