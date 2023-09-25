import { useState, useContext, useEffect } from "react";
import classes from "./Layouts.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Logo from "../assets/JJ-safety-logo-only.png";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import { AuthContext } from "../auth/AuthContext";
import Link from "next/link";
import { projectFirestore } from "@/fbConfig";

const Header = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [employeeData, setEmployeeData] = useState();
  const [password, setPassword] = useState();
  const { currentUser, signIn, signOut } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      console.log("Logged in user:", currentUser);
      // Redirect or handle successful login

      setEmail("");
      setPassword("");
      setShow(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle error
    }
  };

  const handleSignOut = () => {
    signOut();
    router.push('/');
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = projectFirestore.collection("employees").where("email", "==", `${currentUser.email}`); // Replace 'yourCollection' with the actual name of your Firestore collection
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
  }, [currentUser]);

useEffect(()=>{
  if(employeeData){
    console.log(employeeData)
    localStorage.setItem('company', employeeData[0].companyname);
    localStorage.setItem('employeeID', employeeData[0].id);
    localStorage.setItem('lastName', employeeData[0].lastname);
  }
}, [employeeData])


  


  return (
    <>
      <Navbar className="bg-body-tertiary" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <i>LMS</i>
            {employeeData && currentUser && <i style={{marginLeft: "1rem"}}>Welcome {employeeData[0].firstname + " " + employeeData[0].lastname}</i>}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {employeeData && currentUser && employeeData[0].isAdmin && <Link className={classes.links} href="/companies">
                Companies
              </Link>}


                {employeeData && currentUser && employeeData[0].isAdmin && <Link className={classes.links} href="/courselist">
                        All Courses
                </Link>}

                {employeeData && currentUser && employeeData[0].isAdmin && <Link className={classes.links} href="/coursebuilder">
                        Course Builder
                </Link>}
                
                {!currentUser && <Nav.Link className={classes.navlinks} href="#action2">
                Contact Us
              </Nav.Link>}
              {currentUser && <Link className={classes.links} href="/mycourses">
                        My Courses
                </Link>}
              
              {currentUser && <Nav.Link
                className={classes.signout}
                onClick={handleSignOut}
              >
                Sign Out
              </Nav.Link>
              
              }
              {!currentUser && <Nav.Link
                className={classes.signinlink}
                onClick={() => setShow(true)}
              >
                Sign In
              </Nav.Link>}

              {!currentUser && <Button className={classes.btn}>Try It Free</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Body>
          <h2 className={classes.modaltitle}>Sign In</h2>
          <Form onSubmit={handleLogin} className={classes.formbody}>
            <Form.Group>
              <div className={classes.formfields}>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              
              <Button style={{width: "100%"}} type="submit" variant="primary">
                Submit
              </Button>
              <br/>
              <br/>
              <p><Link href="#" style={{textDecoration: "none"}}>forgot password?</Link></p>
              </div>
              <br />

            </Form.Group>
          </Form>
          
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
