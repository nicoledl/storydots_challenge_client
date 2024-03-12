'use client'
import { verify_token } from '@/utils/fetch_data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingScreen from '../Loading';

function PrivateRoute({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  async function verifyToken() {
    setIsLoading(true)
    try 
    {
      const response = await verify_token();
      return response
    } 
    catch (error) 
    {
      console.error(error)
      router.push('/');
    }
    finally
    {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    verifyToken()
  }, [router]);
    
  if (!isLoading) {
    return <LoadingScreen />
  }

  return children;
};

export default PrivateRoute