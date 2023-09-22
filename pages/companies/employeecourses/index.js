import EmployeeCourseList from "@/components/EmployeeCourseList"
import { AuthContext } from "@/auth/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";


const EmployeeCourses = () => {
    const [hasWindow, setHasWindow] = useState(false);
    const {currentUser} = useContext(AuthContext)
    const router = useRouter();
    useEffect(()=>{
        currentUser ? router.push('/companies/employeecourses/')
        : router.push('/')
      },[])

    useEffect(() => {
      if (typeof window !== "undefined") {
        setHasWindow(true);
      }
    }, []);
    return <>
        {hasWindow && <EmployeeCourseList />}
        </>
}

export default EmployeeCourses;