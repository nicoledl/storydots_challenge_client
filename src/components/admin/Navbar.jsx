'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import style from '../../styles/admin.module.css'
import Logo from "../Logo";


function Navbar({setClicked}) {
  const [click, setClick] = useState(null)
  const router = useRouter()

  function handleClick(button) {
    setClick(button)
    setClicked(button)
  }

  useEffect(()=>{
    switch (click) {
      case 'home':
        router.push('/')
        break;
      case 'logout':
        localStorage.removeItem('token');
        router.push('/')
        break;
      default:
        break;  
    }
  },[click])

  return(
    <>
      <span style={{fontSize:'40px', color:'#1b1b1b', fontSize:'clamp(1.125rem, 3.695vw + 0.169rem, 3.125rem)', margin:0, padding:20}}>
        <span style={{fontWeight:800, color:'var(--main-color)'}}>Hi!Buy</span>
        {" "}Dashboard
      </span>
      <nav className={style.navbar_admin}>
        <div>
          <button onClick={()=>handleClick('home')}>Home</button>|
          <button onClick={()=>handleClick('products')}>Products</button>|
          <button onClick={()=>handleClick('brands')}>Brands</button>|
          <button onClick={()=>handleClick('logout')}>Log out</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar