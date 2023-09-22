import EmployeeRoster from "@/components/EmployeeRoster";
import { AuthContext } from "@/auth/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Employees = () => {
const {currentUser} = useContext(AuthContext)
const router = useRouter();
useEffect(()=>{
    currentUser ? router.push('/companies/employees')
    : router.push('/')
  },[])

    return <>
    <EmployeeRoster />
    </>
}

export default Employees;