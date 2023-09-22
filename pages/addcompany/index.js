import AddCompanyForm from "@/components/AddCompanyForm"
import { useState, useEffect } from 'react'


const AddCompany = () => {
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setHasWindow(true);
      }
    }, []);

   return <>
    {hasWindow && <AddCompanyForm />}
    </>
}

export default AddCompany;