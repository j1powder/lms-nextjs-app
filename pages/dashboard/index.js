import React, {useContext, useEffect} from 'react'
import { AuthContext } from '@/auth/AuthContext'
import { useRouter } from 'next/router';

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();
    
    useEffect(()=>{
        currentUser ? router.push('/dashboard')
        : router.push('/')
      },[])

    console.log(currentUser)
  return <>
  
            <h2>Dashboard</h2>
            <h5>Placeholder Text

            </h5>

        </>
}

export default Dashboard;
