import { useState, useEffect, useContext } from "react";
import CompanyContext from "@/statestorage/current-companycontext";
import { projectFirestore } from "@/fbConfig";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classes from "../styles/AddCompanyForm.module.css";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { Dialog } from 'primereact/dialog';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useLocalStorage } from "@/helper-functions/HelperFunctions";
import CourseComponent from "./course-components/CourseComponent";

const UserLevelCourses = () => {
  const [empId, setEmpId] = useState();
  const [courseData, setCourseData] = useState();
  const [employeeData, setEmployeeData] = useState();
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [classTitle, setClassTitle] = useState();
  const ctx = useContext(CompanyContext);
  const employee = useLocalStorage('employee')
  const company = useLocalStorage('company')
  const employeeID = useLocalStorage('employeeID');
  const [employeeId, setEmployeeId] = useState();


 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = projectFirestore
          .collection("employees")
          .where(`companyname`, "==", `${company}`); // Replace 'yourCollection' with the actual name of your Firestore collection
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
  }, [company]);



  
/*   let employeeID;
  if (employeeData) {
    employeeData.map((currentEmp) => {
      if (currentEmp.firstname + " " + currentEmp.lastname === employee) {
        return (employeeID = currentEmp.id);
      }
    });
  } */


  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = projectFirestore.collection(
          `employees/${employeeID}/lms-courses`
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
  }, [employeeID, company]);

  

  let courseSections = [];
   if (courseData) {
    courseData.map((course)=>{
      if(course.id === classTitle && course.questData){
          course.questData.map((section)=>{
            return courseSections.push(section);
          })
      }
    })
   }
  
  
const handleClose = () => {
  setShow(false)
}


  return (
    <>
      <Container style={{ padding: "3rem" }}>
        <Row>
          <Col sm={12}>
            <br />
            <br />

           {show && <Link href="/mycourses">
              <Button onClick={()=> setShow(false)}>Back to Course List</Button>
            </Link>}
            <br/>
            <br/>

            <h4>Courses</h4>
            <br />

            <hr />
            <br />

            {courseData &&
              courseData.map((course) => {
                return (
                  <>
                  {!show && <Card className={classes.listitem}>
                    <Card.Body key={course.id} >
                      <span className={classes.datespan}>{course.assigndate.toDate().toDateString()}</span>
                      <div>
                        <b onClick={(e)=>{setShow(true); setClassTitle(e.target.innerText)}}>{course.id}</b>
                      </div>

                      <div style={{ fontSize: "13px" }}>
                        Course Type: online learning
                      </div>

                      
                       <ProgressBar animated striped variant={course.progress > 80 ? "success": "warning"} now={course.progress} label={course.progress == 100 ? "Complete": null} />
                    {course.progress != 0 && course.progress && <span className={classes.percentspan}>{Math.round(course.progress)}%</span>}
                    </Card.Body>
                  </Card>}


                    



                        
                        
         


                  </>
                );
              })}

{show && <><h4>{classTitle}</h4> <CourseComponent courseTitle={classTitle} sectionData={courseSections} employee={employee} company={company}/> </>}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserLevelCourses;
