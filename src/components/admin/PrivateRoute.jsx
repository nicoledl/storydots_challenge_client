'use client'
import { verify_token } from '@/utils/fetch_data';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function PrivateRoute({ children }) {
  const router = useRouter();
  const token = localStorage.getItem('token');

  async function verifyToken() {
    try 
    {
      const response = await verify_token(token);
      return response
    } 
    catch (error) 
    {
      console.error(error)
      router.push('/');
    }
  };

  useEffect(() => {
    verifyToken()
  }, [token, router]);
    
  return children;
};

export default PrivateRoute