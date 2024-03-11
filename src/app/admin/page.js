'use client'
import DashboardBrands from "@/components/admin/DashboardBrands";
import DashboardProducts from "@/components/admin/DashboardProducts";
import Navbar from "@/components/admin/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState('products')

  useEffect(()=>{

  },[clicked])
  
  return (
    <main>
      <h1>Dashboard</h1>
      <Navbar setClicked={setClicked}/>
      {clicked === 'products' ? <DashboardProducts /> : <DashboardBrands />}
    </main>
  );
}