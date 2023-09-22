import CourseList from '@/components/CourseList';
import {useState, useEffect, useContext} from 'react'
import { useRouter } from "next/router";
import { AuthContext } from "@/auth/AuthContext";


const CourseListPage = () => {
    const [hasWindow, setHasWindow] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== "undefined") {
        setHasWindow(true);
      }
    }, []);

    useEffect(()=>{
      currentUser ? router.push('/courselist')
      : router.push('/')
    },[])

    return <>
        {hasWindow && <CourseList />}
    </>
}

export default CourseListPage;