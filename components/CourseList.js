import {useState, useEffect} from 'react'
import CourseComponent from './course-components/CourseComponent'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { projectFirestore } from '@/fbConfig';
import classes from '../styles/AddCompanyForm.module.css'
import { useLocalStorage } from '@/helper-functions/HelperFunctions'




const CourseList = () => {
const [courseData, setCourseData] = useState();
const [courseDetails, setCourseDetails] = useState();
const [classTitle, setClassTitle] = useState();
const employee = useLocalStorage('employee')
const company = useLocalStorage('company')
const [searchInfo, setSearchInfo] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const collectionRef = projectFirestore.collection('newcourses'); // Replace 'yourCollection' with the actual name of your Firestore collection
            const snapshot = await collectionRef.get();
    
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            setCourseData(data);
          } catch (error) {
            console.error('Error fetching Firestore collection:', error);
          }
        };
    
        fetchData();
      }, []);

if(courseData){
    console.log(courseData)

}
console.log(classTitle)

  return <>
  <Container>
    <Row>
        <Col sm={12}>
        

<br />
            <br />

            <h4>All Courses</h4>
            <br />

            <hr />
            <br />
            <Form.Control
            className={classes.searchBar}
            placeholder="Seach Company"
            onChange={(e)=>setSearchInfo(e.target.value.toUpperCase())}
            ></Form.Control>
{courseDetails &&
<Button style={{margin:"1rem"}} onClick={()=>setCourseDetails(false)}>Back to All Courses</Button>
}
{courseData && !courseDetails && courseData.map((course)=>{
    return <> 
    <Card className={classes.employeecard}>
<Card.Body>
    <div>
      <b onClick={(e)=>{setClassTitle(e.target.innerText); setCourseDetails(true)}}>{course.id}</b><br/>
      <span style={{fontSize:"13px"}}>Course Type: online learning</span>
    </div>
</Card.Body>
</Card>
    
    </>
})}

{courseDetails && <>


  <h1 style={{margin:"1rem"}}>{classTitle}</h1>
  <CourseComponent courseTitle={classTitle} employee={employee} company={company}/>

</>}
<br/>
<br/>
</Col>
    </Row>
  </Container>
  </>
}

export default CourseList;