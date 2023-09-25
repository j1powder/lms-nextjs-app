import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { projectFirestore } from "@/fbConfig";
import { AuthContext } from "@/auth/AuthContext";
import classes from '../styles/Dashboard.module.css'

const Dashboard = () => {
const [employeeData, setEmployeeData] = useState('');
const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const collectionRef = projectFirestore
              .collection("employees")
               // Replace 'yourCollection' with the actual name of your Firestore collection
            const snapshot = await collectionRef.get();
    
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            setEmployeeData(data);
          } catch (error) {
            console.error("Error fetching Firestore collection:", error);
          }
        };
    
        fetchData();
      }, []);

//console.log(currentUser)
let thisUser;
if(employeeData){
   employeeData.map((employee)=>{
    if(employee.email === currentUser.email ){
        return thisUser = employee
    }
   })
}



if(employeeData){
    const fullName = thisUser.firstname + " " + thisUser.lastname;

    return <>
    <Container>
      <Row>
        <Col md={12}>
        
        <Card>
        <Container>
          <Row>
            <Col md={12}>
              <br/>
            <h2>Hi {fullName}</h2>
            <span>{thisUser.email}</span>
        </Col>
        </Row>
        </Container>
        </Card>
        </Col>
        </Row>
          <br/>
          <br/>
            <Row>
              <Col md={4}>
                <p className={classes.topcontact}>Contact Information</p><br/>
                <p>Please Update Contact Info</p><br/>
                <p className={classes.update}>Update</p>
              </Col>
              <Col md={4}>
                <p className={classes.topcontact}>Address</p><br/>
                <p>Please Update Contact Info</p><br/>
                <p className={classes.update}>Update</p>
                </Col>
              <Col md={4}>
                <p className={classes.topcontact}>Preferences</p><br/>
                <p>Dark/Light Theme</p><br/>
                </Col>
            </Row>

            <Row>
              <Col md={4}></Col>
              <Col md={4}></Col>
              <Col md={4}></Col>
            </Row>
            <Row>
              <Col md={4}></Col>
              <Col md={4}></Col>
              <Col md={4}></Col>
            </Row>
          
        
        
        
      


    </Container>


</>
} else {
    return <>
    <h1>Loading Data...</h1>
    </>
}

}

export default Dashboard;