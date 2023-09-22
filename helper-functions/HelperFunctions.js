import { useState, useEffect } from 'react';



const useLocalStorage = (name) => {
    const [value, setValue] = useState('')
  
    useEffect(() => {
      setValue(localStorage.getItem(name))
    }, [name])
  
    return value
  }

  export { useLocalStorage };