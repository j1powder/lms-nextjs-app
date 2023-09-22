import { useState, useEffect, useContext } from "react";
import { projectFirestore } from "@/fbConfig";
import CompanyContext from "@/statestorage/current-companycontext";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classes from "../styles/AddCompanyForm.module.css";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { useLocalStorage } from "@/helper-functions/HelperFunctions";

const EmployeeRoster = () => {
  const [employeeData, setEmployeeData] = useState();
  const [courseData, setCourseData] = useState();
  const [empId, setEmpId] = useState();
  const [empInfo, setEmpInfo] = useState();
  const [searchInfo, setSearchInfo] = useState("");
  const employee = useLocalStorage('employee');
  const company = useLocalStorage('company');
  const companyID = useLocalStorage('companyId');

  const ctx = useContext(CompanyContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = projectFirestore
          .collection("employees")
          .where(`companyid`, "==", `${companyID}`)// Replace 'yourCollection' with the actual name of your Firestore collection
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
  }, [company ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = projectFirestore.collection(
          `employees/${empId}/lms-courses`
        ); // Replace 'yourCollection' with the actual name of your Firestore collection
        const snapshot = await collectionRef.get();

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCourseData(data);
      } catch (error) {
        console.error("Error fetching Firestore collection:", error);
      }
    };

    fetchData();
  }, [empId ]);

  //console.log(employeeData)

  /* if(courseData){
  console.log(courseData)
  } else {
    console.log("Couldn't get course data")
  } */

  //console.log(ctx)
 // console.log(company);
 
 
  return (
    <>
      <Container style={{ padding: "3rem" }}>
        <Row>
          <Col sm={12}>
            <br />
            <br />
            <Link href="/companies">
              <Button>Back to Companies</Button>
            </Link>
            
            <br />
            <br />
            <br />
            <br />
            <h4>{company} - Employee Roster</h4>
            <ul >
            <li className={classes.menuList}><Link href="/addemployee"><Button style={{borderRadius: "20px"}}>Add Employee</Button></Link></li>
            <li className={classes.menuList}>Upload Roster</li>
            <li className={classes.menuList}>Edit Company</li>
              
              
            </ul>
            <br />

            <hr />
            <br />
            <Form.Control
            className={classes.searchBar}
            placeholder="Seach By Last Name"
            onChange={(e)=>setSearchInfo(e.target.value.toUpperCase())}
            ></Form.Control>
            <br />
            <br />
            {employeeData &&
              employeeData.map((employee) => {
                return (
                  <>
                  {employee.lastname.toUpperCase().includes(searchInfo) &&
                  
                  <Card className={classes.employeecard}>
                    <Card.Body>
                      <div>
                        <b
                          onClick={ctx.onEmployeeChange}
                          style={{ cursor: "pointer" }}
                        >
                          {employee.firstname + " " + employee.lastname}
                        </b>
                      </div>
                      <div style={{ fontSize: "13px" }}>{employee.email}</div>

                      {ctx.employee ===
                        employee.firstname + " " + employee.lastname && (
                        <>
                          <Link href="/companies/employeecourses">
                            <Button type="button" style={{ float: "right" }}>
                              Courses
                            </Button>
                          </Link>
                          <br />
                          <br />

                          <Form>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                size="lg"
                                placeholder={employee.firstname}
                              ></Form.Control>
                              <br />
                              <Form.Control
                                type="text"
                                size="lg"
                                placeholder={employee.lastname}
                              ></Form.Control>
                              <br />
                              <Form.Control
                                type="text"
                                size="lg"
                                placeholder={employee.email}
                              ></Form.Control>
                              <br />
                              <Form.Control
                                type="text"
                                size="lg"
                                placeholder={employee.id}
                              ></Form.Control>
                              <br />
                              <Form.Control
                                type="text"
                                size="lg"
                                placeholder={employee.companyname}
                              ></Form.Control>
                              <br />
                            </Form.Group>
                          </Form>
                        </>
                      )}
                    </Card.Body>
                  </Card>}
                  </>
                );
              })}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EmployeeRoster;
