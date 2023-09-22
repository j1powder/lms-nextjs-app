import UserLevelCourses from "@/components/UserLevelCourses";
import { AuthContext } from "@/auth/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";


const MyCourses = () => {
    const [hasWindow, setHasWindow] = useState(false);
    const {currentUser} = useContext(AuthContext)
    const router = useRouter();
    useEffect(()=>{
        currentUser ? router.push('/mycourses')
        : router.push('/')
      },[])

    useEffect(() => {
      if (typeof window !== "undefined") {
        setHasWindow(true);
      }
    }, []);
    
    return <>
        {hasWindow && <> <UserLevelCourses /> </>}
        </>
}

export default MyCourses;