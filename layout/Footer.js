import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import classes from './Layouts.module.css'

const Footer = () => {
  return <>

<div className={classes.footcontainer}>
    <Container   >
        <Row>
            <Col md={5}>
                <p>Copyright &copy; 2023 JJ Safety LLC. All rights reserved</p>
            </Col>
            <Col md={2}></Col>
            <Col md={5}>
                <p>Contact | Privacy | Terms</p>
            </Col>
        </Row>
    </Container>
    </div>
  </>
}

export default Footer
