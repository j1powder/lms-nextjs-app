import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { projectFirestore } from "@/fbConfig";
import Link from "next/link";

import classes from "../styles/AddCompanyForm.module.css";

const AddCompanyForm = () => {
  const [companyName, setCompanyName] = useState();
  const [companyAddress, setCompanyAddress] = useState();
  const [companyPhone, setCompanyPhone] = useState();
  const [companyEmail, setCompanyEmail] = useState();

  const addCompany = async (e) => {
    e.preventDefault();
    try {
      await projectFirestore.collection("companies").add({
        companyName,
        companyAddress,
        companyPhone,
        companyEmail,
      });
      setCompanyName("");
      setCompanyAddress("");
      setCompanyPhone("");
      setCompanyEmail("");
      console.log("successfully added company");
    } catch (error) {
      throw new Error(error.message);
      console.log("something went wrong");
    }
  };
//cloned version
  return (
    <>
      <Container style={{ padding: "3rem" }}>
        <Row>
          <Col sm={12}>
            <Link href="/companies"><Button>Back to Companies</Button></Link>
            <br />
            <br />
          
            <h4>Add Company</h4>
            <br />

            <hr />
            <br />
            <Form className={classes.formbody} onSubmit={addCompany}>
              <Form.Group>
                
                <Form.Control
                  placeholder="Company Name"
                  className={classes.inputcontrol}
                  required
                  type="text"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  value={companyName}
                /> <br/>
                
                <Form.Control
                  placeholder="Company Address"
                  className={classes.inputcontrol}
                  required
                  type="text"
                  onChange={(e) => {
                    setCompanyAddress(e.target.value);
                  }}
                  value={companyAddress}
                /> <br/>
                
                <Form.Control
                  placeholder="Company Phone"
                  className={classes.inputcontrol}
                  required
                  type="text"
                  onChange={(e) => {
                    setCompanyPhone(e.target.value);
                  }}
                  value={companyPhone}
                /> <br/>
                
                <Form.Control
                placeholder="Company Email"
                className={classes.inputcontrol}
                  required
                  type="text"
                  onChange={(e) => {
                    setCompanyEmail(e.target.value);
                  }}
                  value={companyEmail}
                /> <br/>

                <br />
                <Button
                  type="submit"
                  variant="primary"
                  className={classes.btn}
                >
                  Add Company
                </Button>
              </Form.Group>
            </Form>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddCompanyForm;
