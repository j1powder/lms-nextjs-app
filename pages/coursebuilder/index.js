import {useState, useEffect, useContext} from 'react'
import { AuthContext } from '@/auth/AuthContext';
import { useRouter } from 'next/router';

import CourseBuilder from '@/components/CourseBuilder'

const CourseBuilderPage = () => {
    const [hasWindow, setHasWindow] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== "undefined") {
        setHasWindow(true);
      }
    }, []);

    useEffect(()=>{
      currentUser ? router.push('/coursebuilder')
      : router.push('/')
    },[])

    return <>
            <br/>
            <br/>
            <CourseBuilder/>
        </>
}

export default CourseBuilderPage;