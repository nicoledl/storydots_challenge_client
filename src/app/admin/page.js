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
    <main style={{marginTop: 50}}>
      <PrivateRoute>
        <Navbar setClicked={setClicked}/>
        {clicked === 'products' ? <DashboardProducts /> : <DashboardBrands />}
      </PrivateRoute>
    </main>
  );
}

export default Home