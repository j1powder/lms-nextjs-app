import CompanyList from "@/components/CompanyList";
import {useState, useEffect, useContext} from 'react'
import { useRouter } from "next/router";
import { AuthContext } from "@/auth/AuthContext";


const Companies = () => {
    const [hasWindow, setHasWindow] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== "undefined") {
        setHasWindow(true);
      }
    }, []);

    useEffect(()=>{
      currentUser ? router.push('/companies')
      : router.push('/')
    },[])

    return <>
        {hasWindow && <CompanyList />}
    </>
}

export default Companies;