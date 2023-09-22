import ActiveCompanies from '@/components/ActiveCompanies';
import {useState, useEffect, useContext} from 'react'
import { useRouter } from "next/router";
import { AuthContext } from "@/auth/AuthContext";


const ActiveCompanyList = () => {
    const [hasWindow, setHasWindow] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== "undefined") {
        setHasWindow(true);
      }
    }, []);

    useEffect(()=>{
      currentUser ? router.push('/activecompanies')
      : router.push('/')
    },[])

    return <>
        {hasWindow && <ActiveCompanies />}
    </>
}

export default ActiveCompanyList;