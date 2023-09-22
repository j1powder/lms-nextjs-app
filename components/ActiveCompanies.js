import React, { useState, useEffect, useContext, useRef } from "react";
import { projectFirestore } from "@/fbConfig";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'
import classes from "../styles/AddCompanyForm.module.css";
import Image from "next/image";
import { Router } from "next/router";
import Link from "next/link";
import CompanyContext from "@/statestorage/current-companycontext";
import { useLocalStorage } from "@/helper-functions/HelperFunctions";

const ActiveCompanies = () => {
  
  const [companydData, setCompanyData] = useState();
  const [searchInfo, setSearchInfo] = useState("");
  const ctx = useContext(CompanyContext);
  const listItem = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = projectFirestore.collection("companies"); // Replace 'yourCollection' with the actual name of your Firestore collection
        const snapshot = await collectionRef.get();

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCompanyData(data);
      } catch (error) {
        console.error("Error fetching Firestore collection:", error);
      }
    };

    fetchData();
  }, []);

  //console.log(ctx.selectedCompany)

  const setCompany = (e) => {
    setSelectedCompany(e.target.innerText);
    console.log(e.target.innerText);
  };

  return (
    <>
      <Container style={{ padding: "3rem" }}>
        <Row>
          <Col sm={12}>
            <br />
            <br />

            <h4>All Companies</h4>
            <br />

            <hr />
            <br />
            <Form.Control
            className={classes.searchBar}
            placeholder="Seach Company"
            onChange={(e)=>setSearchInfo(e.target.value.toUpperCase())}
            ></Form.Control>
            {companydData &&
              companydData.map((company) => {
                return (
                  <>
                  {company.name.toUpperCase().includes(searchInfo) && company.membershipactive && company.registereddate.includes('Oct') &&<ListGroup>
                    <ListGroup.Item
                      key={company.id}
                      ref={listItem}
                      className={classes.listitem}
                    >
                       <Link
                        style={company.membershipactive ? { textDecoration: "none", color:"green" }: { textDecoration: "none", color:"red" }}
                        href="/companies/employees"
                      >
                        <div onClick={ctx.onSelectionChange}>
                          <b>{company.name}</b>
                        </div>
                      </Link>
                      <div style={{ fontSize: "13px" }}>
                        Company Type: contractor
                      </div>
                      <div>{company.registereddate}</div>
                    </ListGroup.Item>
                  </ListGroup>}
                  </>
                );
              })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ActiveCompanies;
