import '@/styles/globals.css'
import SSRProvider from 'react-bootstrap/SSRProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/auth/AuthContext';
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import {useState, useContext} from 'react'
import CompanyContext from '@/statestorage/current-companycontext';


export default function App({ Component, pageProps }) {
  const [selectedCompany, setSelectedCompany] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();

  const setCompany = (e) => {
    setSelectedCompany(e.target.innerText);
    
    localStorage.setItem('company', e.target.innerText);
    //console.log(e.target.innerText)
    }

  const setEmployee = (e) => {
    setSelectedEmployee(e.target.innerText)
    localStorage.setItem('employee', e.target.innerText)
   // console.log(e.target.innerText)
  }

  return <>
  <SSRProvider>
  <AuthProvider>
      <CompanyContext.Provider value={
        {
          company:selectedCompany, 
          employee: selectedEmployee, 
          onSelectionChange: setCompany, 
          onEmployeeChange: setEmployee,
          }}>
  <Header />
  <Component {...pageProps} />
  <Footer/>
    </CompanyContext.Provider>
  </AuthProvider>
  </SSRProvider>
  </>
}

