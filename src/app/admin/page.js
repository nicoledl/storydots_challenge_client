'use client'
import DashboardBrands from "@/components/admin/DashboardBrands";
import DashboardProducts from "@/components/admin/DashboardProducts";
import Navbar from "@/components/admin/Navbar";
import PrivateRoute from "@/components/admin/PrivateRoute";
import { useEffect, useState } from "react";

function Home() {
  const [clicked, setClicked] = useState('products')

  useEffect(()=>{

  },[clicked])
  
  return (
    <main style={{marginTop: 50, width:"100vw", justifyContent:"center", maxWidth:"none"}}>
      <PrivateRoute>
        <div style={{maxWidth:'1400px', width:"1400px"}}>
          <Navbar setClicked={setClicked}/>
          {clicked === 'products' ? <DashboardProducts /> : <DashboardBrands />}
        </div>
      </PrivateRoute>
    </main>
  );
}

export default Home