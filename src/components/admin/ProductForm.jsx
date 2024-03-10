'use client'
import { add_and_edit, getOne } from "@/utils/fetch_data"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function ProductForm({method, id}) { 
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  //  If the method is PUT we are gonna get the product by id
  //  Then create the function getProduct() to get the product by id
  const [product, setProduct] = useState({})
  async function getProduct(id) {
    try 
    {
      const response = await getOne('products', id);
      setProduct(response) 
    } 
    catch (error) 
    {
      console.error(error)
    }
  };

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
        brandId: 1
      }

    try {
      const response = await add_and_edit(method, product?.id, formData)
  
      if (!response) {
        throw new Error('Failed to submit the data. Please try again.')
      }
      router.push(`/admin/`)
    } catch (error) {
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
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
          <label>Brand</label>
            <select name="brandId" id="brands" defaultValue={product?.brands && product.brands} required>
                <option value="volvo">Volvo</option>
            </select>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
      </form>
    </div>
  )
}

export default ProductForm