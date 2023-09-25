import React, {useContext, useEffect} from 'react'
import { AuthContext } from '@/auth/AuthContext'
import { useRouter } from 'next/router';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();
    
    useEffect(()=>{
        currentUser ? router.push('/dashboard')
        : router.push('/')
      },[])

    console.log(currentUser)
  return <>
  
        <br/>
        <Dashboard/>
        
        </>
}

export default DashboardPage;
