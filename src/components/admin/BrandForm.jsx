'use client'
import { add_brand,  } from "@/utils/fetch_data"
import { useRouter } from "next/navigation"
import { useState } from "react"
import style from "../../styles/admin.module.css"
import { BsArrowLeftCircleFill } from "react-icons/bs"
import LoadingScreen from "../Loading"

function BrandForm() { 
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  
  function handlerError(message) {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 2000);
  }


  async function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { name, logo_url } = e.target;

    const formData ={
      name: name.value,
      logo_url: logo_url.value,
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
      setIsLoading(false)
      throw error;
    } 
  }


  return(
    <>
      {isLoading &&  <LoadingScreen />}
      <span className={style.back_button}>
        <BsArrowLeftCircleFill onClick={()=> router.push('/admin')}/> Back
      </span>
      <div className={style.form}>
        <h1>Add a new brand</h1>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={onSubmit}>
            <label>Name</label>
              <input type="text" name="name" maxLength={20} required/>
            <label>Image</label>
              <input type="text" name="logo_url" />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
        </form>
      </div>
    </>
  )
}

export default BrandForm