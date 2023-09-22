import {useContext, useState, useEffect} from 'react'
//import {projectFirestore, projectAuth} from '../firebaseConfig'
import Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { AuthContext } from '@/auth/AuthContext';
import classes from '../../styles/Register.module.css'
import { useRouter } from 'next/router';

const Register = () => {
const {currentUser, signUp } = useContext(AuthContext);
const [firstName, setFName] = useState();
const [lastName, setLName] = useState();
const [companyName, setCompanyName] = useState();
const [displayName, setDisplayName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const router = useRouter();



const createUser = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(firstName, lastName, companyName, displayName, email, password);
      console.log('created User', currentUser);
      router.push('/dashboard')
      // Redirect or handle successful login
    } catch (error) {
      console.error('Login error:', error.message);
      // Handle error
    }
  };


    return <>
    <Card className={classes.spacing}>
        <Card.Body>
            <h1>Sign Up</h1><br/>
    <Form onSubmit={createUser} className={classes.formbody}>
        <Form.Group>
        <Form.Label>First Name</Form.Label><Form.Control required type='text' onChange={(e)=>{setFName(e.target.value)}} />
        <Form.Label>Last Name</Form.Label><Form.Control required type='text' onChange={(e)=>{setLName(e.target.value)}} />
        <Form.Label>Company Name</Form.Label><Form.Control required type='text' onChange={(e)=>{setCompanyName(e.target.value)}} />
        <Form.Label>Display Name</Form.Label><Form.Control required type='text' onChange={(e)=>{setDisplayName(e.target.value)}} />
        <Form.Label>Email</Form.Label><Form.Control required type='email' onChange={(e)=>{setEmail(e.target.value)}} />
        <Form.Label>Password</Form.Label><Form.Control required type='password' onChange={(e)=>{setPassword(e.target.value)}} />
        <br/>
        <Button type="submit" variant='secondary'>Submit</Button>
        </Form.Group>
    </Form>
    </Card.Body>
    </Card>
    </>
}

export default Register;