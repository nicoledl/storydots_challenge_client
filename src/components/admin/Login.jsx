'use client'
import { useEffect, useState } from "react"
import style from "../../styles/admin.module.css"
import { getToken } from "@/utils/get_token"
import { useRouter } from 'next/navigation'
import { BsFillPersonVcardFill, BsPersonFillLock } from "react-icons/bs"
import LoadingScreen from "../Loading"

function Login() {
  const token = getToken()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validToken, setValidToken] = useState(false)

  useEffect(()=>{
    if (!token) {
      setValidToken(true)
    }
  },[])

  async function onSubmit(e){
      e.preventDefault()
      setIsLoading(true)
      setError(null)
  
      const { username, password } = e.target; 
      const formData ={
          username: username.value,
          password: password.value,
        }

    try
    {  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        setError("Failed to submit the data. Please try again.")
        throw new Error("Failed to submit the data. Please try again.")
      }

      const result = await response.json();
      
      localStorage.setItem('token', JSON.stringify(result));

      setTimeout(() => {
        router.push('/admin')
      }, 500);
    }
    catch (error)
    {
      setError(error.message)
      setIsLoading(false)
    }
  }

  if (validToken) {
    return(
      <>
        {isLoading &&  <LoadingScreen />}
        {error && <span className={style.error_msg} onClick={()=>setError(null)}>{error}</span>}
        <div className={style.login}>
          <div>
              <p>Only administrator user.</p>
              <form onSubmit={onSubmit}>
                <label>username</label>
                <input type="text" name='username' />
                <label>password</label>
                <input type="password" name="password"/>
                <button type="submit">{isLoading ? 'Loading...' : 'Login'}</button>
            </form>
          </div>
          <BsPersonFillLock style={{fontSize:40}} />
        </div>
      </>
    )
  }
  
  return(
    <div className={style.button_admin_route} onClick={()=> router.push('/admin')}>
      <BsFillPersonVcardFill/>
    </div>
  )
}

export default Login