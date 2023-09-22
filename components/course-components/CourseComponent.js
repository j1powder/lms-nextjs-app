import { Fragment, useState, useRef, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReactPlayer from "react-player";
import { arrayUnion, arrayRemove, documentId } from "firebase/firestore";
import classes from "../../styles/AddCompanyForm.module.css";
import { projectFirestore } from "@/fbConfig";
import Certificate from "./Certificate";

const CourseComponent = (props) => {
  const [openItem, setOpenItem] = useState(null);
  const [finalExamOpen, setFinalExamOpen] = useState(false);
  const [scoreCalculated, setScoreCalculated] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [usersCollection, setUsersCollection] = useState(null);
  const [myNewCourses, setMyNewCourses] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [reviewAnswer1, setReviewAnswer1] = useState(null);
  const [reviewAnswer2, setReviewAnswer2] = useState(null);
  const [reviewAnswer3, setReviewAnswer3] = useState(null);
  const [reviewAnswer4, setReviewAnswer4] = useState(null);
  const finalForm = useRef();

  const [show, setShow] = useState(false);
  const [showAlso, setShowAlso] = useState(false);
  const [showCert, setShowCert] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(0);

  //const { documents, error } = useCollection(`newcourses/${props.courseTitle}/Sections`);
  //const { updateDocument } = useFirestore('users');
  //const { user } = useAuthContext();
  const subBtnRef = useRef();
  const finalVideo = "https://player.vimeo.com/video/455943382?h=2d45027c8e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479";
  const finalScore = Math.round((totalCorrect / totalQuestions) * 100);

  console.log(totalQuestions)
  //console.log(totalCorrect)
  useEffect(() => {
    const ref = projectFirestore
      .collection(`newcourses/${props.courseTitle}/Sections`)
      .orderBy("orderNumber");
    ref.onSnapshot((snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
        setMyNewCourses(results);
      });
    });
  }, []);

  useEffect(() => {
    const ref = projectFirestore.collection("users");
    ref.onSnapshot((snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
        setUsersCollection(results);
      });
    });
  }, []);

  if (usersCollection) {
    usersCollection.map((thisUser) => {
      if (thisUser.id === user.uid) {
        thisUser.courses.map((course) => {
          if (course.title === props.courseTitle && course.title !== "") {
          }
        });
      }
    });
  }


  const updateScoreHandler = async (e) => {
    e.preventDefault();
    if (usersCollection) {
      usersCollection.map((thisUser) => {
        if (thisUser.id === user.uid) {
          thisUser.courses.map(async (course) => {
            if (course.title === props.courseTitle && course.score === "") {
              const date = new Date();
              const todaysDate = {
                month: "long",
                year: "numeric",
                day: "numeric",
              };

              await updateDocument(user.uid, {
                courses: arrayRemove({
                  title: props.courseTitle,
                  score: "",
                  date: "",
                  passed: "",
                  isAssigned: true,
                }),
              });
              await updateDocument(user.uid, {
                courses: arrayUnion({
                  title: props.courseTitle,
                  score: finalScore,
                  date: date.toLocaleString("en-US", todaysDate),
                  passed: "",
                  isAssigned: true,
                }),
              });
              console.log(finalScore);
              e.target.disabled = "true";
            } else {
              console.log(finalScore);
              e.target.disabled = "true";
            }
          });
        }
      });
    }
  };

  let myquestions = [];
  const openModal = (e) => {
    e.preventDefault();
    setShow(true);

    if (myNewCourses) {
      const questions = document.querySelectorAll('b')      
      Object.values(questions).map((question) => {
        if (question.innerText !== "" ) {
          myquestions.push(question.innerText);
          console.log(question)
          setTotalQuestions(myquestions.length);
          
        }
      });
    }

    

    const final = document.getElementById("courseFinal");
    for (let x = 0; x < final.length; x++) {
      if (final[x].checked && final[x].isCorrect === "true") {
        setTotalCorrect((score) => score + 1);
        e.target.disabled = true;
        setScoreCalculated(true);
      }
    }
  };

 

  const closeModal = () => {
    setShow(false);
  };

  const closeSectionModal = () => {
    setShowAlso(false);
  };

  //console.log(finalForm)
  console.log(finalForm.current )
 
  //console.log(props.courseTitle)
  //console.log(videoEnded)
  console.log(props.sectionData);

  let completionDate;
  if(props.sectionData){
    props.sectionData.map((section)=>{
      if(section.name === "Final Knowledge Check" && section.edit){
        return completionDate = section.edit.toDate().toDateString();
      }
    })
  }

  if(completionDate){
    console.log(completionDate)
  } 
  
  
 

  return (
    <Fragment>
      {myNewCourses && (
        <div>
          {myNewCourses.map((section) => {
            return (
              <>
                <Container>
                  <Row>
                    <Col sm={12}>
                      <Card key={section.id} className={classes.coursecard}>
                        <Card.Body>
                          <div
                            className="courseTitle"
                            onClick={() => {
                              setShowAlso(true);
                              setOpenItem(section.id);
                              setFinalExamOpen(false);
                            }}
                          >
                            <span className={classes.sectionTitle}>{section.title}</span>
                          </div>
                          {props.sectionData && props.sectionData.find(
                            (data) =>
                              data.name === section.id && data.progress == "100"
                          ) ? (
                            <>
                              <br />
                              <ProgressBar striped  variant="success" now={100} label={`100% complete`} />
                            </>
                          ) : (
                            <>
                              <br />
                              <ProgressBar now={0} />
                            </>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>

                    {openItem === section.id ? (
                      <>
                        <Modal
                          show={showAlso}
                          size="lg"
                          onHide={closeSectionModal}
                          fullscreen
                        >
                          <Modal.Body>
                            <br />
                            <ReactPlayer
                              onReady={() => {
                                setVideoEnded(false);
                                setReviewAnswer1(null);
                                setReviewAnswer2(null);
                              }}
                              onEnded={() => {
                                setVideoEnded(true);
                              }}
                              className="video-one"
                              url={section.video}
                              controls
                            ></ReactPlayer>
                            <br />
                            <form>
                              <p>
                                <b>{section.question1.questionText}</b>
                              </p>
                              {section.question1.answerOptions.map((item) =>
                                item !== null ? (
                                  <label
                                    style={
                                      videoEnded ? { fontWeight: "bold" } : null
                                    }
                                    className={classes.answers}
                                  >
                                    <input
                                      onChange={(e) => {
                                        setReviewAnswer1(e.target.id);
                                      }}
                                      id={item}
                                      disabled={videoEnded ? false : true}
                                      className={classes.answerinput}
                                      type="radio"
                                      name="selection1"
                                    />
                                    {item}
                                  </label>
                                ) : null
                              )}
                              <br />
                              {reviewAnswer1 ===
                                section.question1.isCorrect && (
                                <p style={{ color: "green" }}>
                                  Correct Answer!
                                </p>
                              )}
                              {reviewAnswer1 !== null &&
                              reviewAnswer1 !== section.question1.isCorrect ? (
                                <p style={{ color: "red" }}>
                                  Incorrect. The correct answer is{" "}
                                  {section.question1.isCorrect}
                                </p>
                              ) : null}

                              <p>
                                <b>{section.question2.questionText}</b>
                              </p>
                              {section.question2.answerOptions.map((item) =>
                                item !== null ? (
                                  <label
                                    style={
                                      videoEnded ? { fontWeight: "bold" } : null
                                    }
                                    className={classes.answers}
                                  >
                                    <input
                                      onChange={(e) => {
                                        setReviewAnswer2(e.target.id);
                                      }}
                                      id={item}
                                      disabled={videoEnded ? false : true}
                                      className={classes.answerinput}
                                      type="radio"
                                      name="selection2"
                                    />
                                    {item}
                                  </label>
                                ) : null
                              )}
                              <br />
                              {reviewAnswer2 ===
                                section.question2.isCorrect && (
                                <p style={{ color: "green" }}>
                                  Correct Answer!
                                </p>
                              )}
                              {reviewAnswer2 !== null &&
                              reviewAnswer2 !== section.question2.isCorrect ? (
                                <p style={{ color: "red" }}>
                                  Incorrect. The correct answer is{" "}
                                  {section.question2.isCorrect}
                                </p>
                              ) : null}

                              <br />

                              <p>
                                <b>{section.question3.questionText}</b>
                              </p>
                              {section.question3.answerOptions.map((item) =>
                                item !== null ? (
                                  <label
                                    style={
                                      videoEnded ? { fontWeight: "bold" } : null
                                    }
                                    className={classes.answers}
                                  >
                                    <input
                                      onChange={(e) => {
                                        setReviewAnswer3(e.target.id);
                                      }}
                                      id={item}
                                      disabled={videoEnded ? false : true}
                                      className={classes.answerinput}
                                      type="radio"
                                      name="selection1"
                                    />
                                    {item}
                                  </label>
                                ) : null
                              )}
                              <br />
                              {reviewAnswer3 ===
                                section.question3.isCorrect && (
                                <p style={{ color: "green" }}>
                                  Correct Answer!
                                </p>
                              )}
                              {reviewAnswer3 !== null &&
                              reviewAnswer3 !== section.question3.isCorrect ? (
                                <p style={{ color: "red" }}>
                                  Incorrect. The correct answer is{" "}
                                  {section.question3.isCorrect}
                                </p>
                              ) : null}

                              <br/>

                              <p>
                                <b>{section.question4.questionText}</b>
                              </p>
                              {section.question4.answerOptions.map((item) =>
                                item !== null ? (
                                  <label
                                    style={
                                      videoEnded ? { fontWeight: "bold" } : null
                                    }
                                    className={classes.answers}
                                  >
                                    <input
                                      onChange={(e) => {
                                        setReviewAnswer4(e.target.id);
                                      }}
                                      id={item}
                                      disabled={videoEnded ? false : true}
                                      className={classes.answerinput}
                                      type="radio"
                                      name="selection1"
                                    />
                                    {item}
                                  </label>
                                ) : null
                              )}
                              <br />
                              {reviewAnswer4 ===
                                section.question4.isCorrect && (
                                <p style={{ color: "green" }}>
                                  Correct Answer!
                                </p>
                              )}
                              {reviewAnswer4 !== null &&
                              reviewAnswer4 !== section.question4.isCorrect ? (
                                <p style={{ color: "red" }}>
                                  Incorrect. The correct answer is{" "}
                                  {section.question3.isCorrect}
                                </p>
                              ) : null}

                            </form>
                            <Button
                              style={{
                                backgroundColor: "gray",
                                border: "black",
                              }}
                              onClick={() => {
                                setOpenItem(null);
                              }}
                            >
                              Close
                            </Button>
                          </Modal.Body>
                        </Modal>
                      </>
                    ) : null}
                    <div></div>
                  </Row>
                </Container>
              </>
            );
          })}


          <Container>
            <Row>
              <Col sm={12}>
                <Card className="coursecard">
                  <Card.Body>
                    <div
                      className="courseTitle"
                      onClick={() => {
                        if (openItem == null) {
                          setShowAlso(true);
                          setFinalExamOpen(true);
                        }
                      }}
                    >
                      <span className={classes.sectionTitle}>Final Knowledge Check</span>
                    </div>
                    {props.sectionData && props.sectionData.find(
                      (data) =>
                        data.name === "Final Knowledge Check" &&
                        data.progress == "100" && 
                        data.grade > 79
                    ) ? (
                      <>
                        <br />
                        <Button style={{width: "100%"}} onClick={()=>setShowCert(true)}>Get Certificate</Button>
                        <br/>
                        <Modal show={showCert} onHide={()=>setShowCert(false)} fullscreen>
                          <Modal.Header closeButton>
                            <Modal.Title>Completion Certificate</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Certificate date={completionDate}  employee={props.employee} company={props.company} courseTitle={props.courseTitle} />
                          </Modal.Body>
                        </Modal>
                        
                        
                      </>
                    ) : (
                      <>
                        <br />
                        <ProgressBar now={0} />
                      </>
                    )}

                    {finalExamOpen && openItem === null && (
                      <>
                        
                        
                        
                        <Modal
                          show={showAlso}
                          size="lg"
                          onHide={closeSectionModal}
                          fullscreen
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Final Exam</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            
                            <form id="courseFinal" ref={finalForm}>
                              <br />
                              <ReactPlayer
                                url={finalVideo}
                                controls
                              ></ReactPlayer>
                              <br />
                              {finalExamOpen
                                ? myNewCourses.map((section) => {
                                    return (
                                      <>
                                        {!section.question1.isCorrect.includes("ready to proceed") ? (
                                          <>
                                            <div
                                              id={section.question1.isCorrect}
                                              iscounted="true"
                                            >
                                              <b
                                                className={classes.questions}
                                                key={
                                                  section.question1.isCorrect
                                                }
                                              >
                                                {section.question1.questionText}
                                              </b>
                                            </div>
                                            {section.question1.answerOptions.map(
                                              (item) =>
                                                item !== null ? (
                                                  <label
                                                    key={item}
                                                    className={classes.answers}
                                                    htmlFor={item}
                                                  >
                                                    <input
                                                      onChange={(e) => {
                                                        if (
                                                          e.target.id ===
                                                          section.question1
                                                            .isCorrect
                                                        ) {
                                                          e.target.disabled =
                                                            "true";
                                                          e.target.isCorrect =
                                                            "true";
                                                        } else {
                                                          e.target.disabled =
                                                            "true";
                                                          e.target.isCorrect =
                                                            "false";
                                                        }
                                                      }}
                                                      key={item}
                                                      id={item}
                                                      className={
                                                        classes.answerinput
                                                      }
                                                      type="radio"
                                                      name={
                                                        section.question1
                                                          .questionText
                                                      }
                                                    />
                                                    {item}
                                                  </label>
                                                ) : null
                                            )}
                                          </>
                                        ) : null}

                                    <br />

                                        <div
                                          key={section.question2.isCorrect}
                                          iscounted="true"
                                        >
                                          <b
                                            className={classes.questions}
                                            key={section.question2.isCorrect}
                                          >
                                            {section.question2.questionText}
                                          </b>
                                        </div>
                                        {section.question2.answerOptions.map(
                                          (item) =>
                                            item !== null ? (
                                              <label
                                                key={item}
                                                className={classes.answers}
                                                htmlFor={item}
                                              >
                                                <input
                                                  onChange={(e) => {
                                                    if (
                                                      e.target.id ===
                                                      section.question2
                                                        .isCorrect
                                                    ) {
                                                      e.target.disabled =
                                                        "true";
                                                      e.target.isCorrect =
                                                        "true";
                                                    } else {
                                                      e.target.disabled =
                                                        "true";
                                                      e.target.isCorrect =
                                                        "false";
                                                    }
                                                  }}
                                                  key={item}
                                                  id={item}
                                                  className={
                                                    classes.answerinput
                                                  }
                                                  type="radio"
                                                  name={
                                                    section.question2
                                                      .questionText
                                                  }
                                                />
                                                {item}
                                              </label>
                                            ) : null
                                        )}
                                        <br />
                                                  {/* start question 3 */}
                              <div
                                              id={section.question3.isCorrect}
                                              iscounted="true"
                                            >
                                              <b
                                                className={classes.questions}
                                                key={
                                                  section.question3.isCorrect
                                                }
                                              >
                                                {section.question3.questionText}
                                              </b>
                                            </div>
                                            {section.question3.answerOptions.map(
                                              (item) =>
                                                item !== null ? (
                                                  <label
                                                    key={item}
                                                    className={classes.answers}
                                                    htmlFor={item}
                                                  >
                                                    <input
                                                      onChange={(e) => {
                                                        if (
                                                          e.target.id ===
                                                          section.question3
                                                            .isCorrect
                                                        ) {
                                                          e.target.disabled =
                                                            "true";
                                                          e.target.isCorrect =
                                                            "true";
                                                        } else {
                                                          e.target.disabled =
                                                            "true";
                                                          e.target.isCorrect =
                                                            "false";
                                                        }
                                                      }}
                                                      key={item}
                                                      id={item}
                                                      className={
                                                        classes.answerinput
                                                      }
                                                      type="radio"
                                                      name={
                                                        section.question3
                                                          .questionText
                                                      }
                                                    />
                                                    {item}
                                                  </label>
                                                ) : null
                                            )}
                                        {/*start question 4 */}
                                        <div
                                              id={section.question4.isCorrect}
                                              iscounted="true"
                                            >
                                              <b
                                                className={classes.questions}
                                                key={
                                                  section.question4.isCorrect
                                                }
                                              >
                                                {section.question4.questionText}
                                              </b>
                                            </div>
                                            {section.question4.answerOptions.map(
                                              (item) =>
                                                item !== null ? (
                                                  <label
                                                    key={item}
                                                    className={classes.answers}
                                                    htmlFor={item}
                                                  >
                                                    <input
                                                      onChange={(e) => {
                                                        if (
                                                          e.target.id ===
                                                          section.question4
                                                            .isCorrect
                                                        ) {
                                                          e.target.disabled =
                                                            "true";
                                                          e.target.isCorrect =
                                                            "true";
                                                        } else {
                                                          e.target.disabled =
                                                            "true";
                                                          e.target.isCorrect =
                                                            "false";
                                                        }
                                                      }}
                                                      key={item}
                                                      id={item}
                                                      className={
                                                        classes.answerinput
                                                      }
                                                      type="radio"
                                                      name={
                                                        section.question4
                                                          .questionText
                                                      }
                                                    />
                                                    {item}
                                                  </label>
                                                ) : null
                                            )}

                                      </>
                                    );
                                  })
                                : null}
                              <br />

                              
                              <br/>
                              

                              {!scoreCalculated && (
                                <Button
                                  onClick={openModal}
                                  className="btn-final"
                                >
                                  Submit
                                </Button>
                              )}
                              <Modal show={show} onHide={closeModal} centered>
                                <Modal.Body
                                  style={{ backgroundColor: "whitesmoke" }}
                                >
                                  <h2>Your Final Score is: {finalScore}%</h2>
                                  <p>Would you like to save this score?</p>
                                  <br />
                                  <Button
                                    className="btn-final"
                                    onClick={updateScoreHandler}
                                  >
                                    Save Score
                                  </Button>
                                </Modal.Body>
                              </Modal>
                            </form>
                          </Modal.Body>
                        </Modal> 
                        

                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </Fragment>
  );
};

export default CourseComponent;
