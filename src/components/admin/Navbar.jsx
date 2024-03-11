'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';


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
        <nav>
            <button onClick={()=>handleClick('home')}>Home</button>
            <button onClick={()=>handleClick('products')}>Products</button>
            <button onClick={()=>handleClick('brands')}>Brands</button>
            <button onClick={()=>handleClick('logout')}>Log out</button>
        </nav>
    )
}

export default Navbar