import React, { useState, useEffect, useContext, useRef } from "react";
import { projectFirestore } from "@/fbConfig";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import classes from "../styles/AddCompanyForm.module.css";
import Image from "next/image";
import { Router } from "next/router";
import Link from "next/link";
import CompanyContext from "@/statestorage/current-companycontext";
import { useLocalStorage } from "@/helper-functions/HelperFunctions";

import jjlogo from '../assets/JJ-safety-logo-only.png';
import Pagination from 'react-bootstrap/Pagination';






const CompanyList = () => {
  
  const [companydData, setCompanyData] = useState();
  const [searchInfo, setSearchInfo] = useState("");
  const ctx = useContext(CompanyContext);
  const listItem = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = projectFirestore.collection("companies").orderBy("name"); // Replace 'yourCollection' with the actual name of your Firestore collection
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

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  


  return (
    <>
      <Container style={{ padding: "3rem" }}>
        <Row>
          <Col sm={12}>
            <Link href="/addcompany"><Button style={{float:"right"}}>Add Company</Button></Link>
            <br />
            <br />

            <h4>All Companies({companydData && companydData.length})</h4>
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
                  {company.name.toUpperCase().includes(searchInfo) && <ListGroup key={company}>

                    <ListGroup.Item
                      key={company.id}
                      ref={listItem}
                      className={classes.listitem}
                    >
                      <Image src={jjlogo} className={classes.jjlogo} />
                      <Link
                        style={{ textDecoration: "none" }}
                        href="/companies/employees"
                      >
                        <div onClick={(e)=>{localStorage.setItem('company', company.name); localStorage.setItem('companyId', company.uid); console.log(company) }}>
                          <b style={{color: "#353839"}} >{company.name}</b>
                        </div>
                      </Link>
                      <div style={{ fontSize: "13px" }}>
                        Company Type: contractor
                      </div>
                      {!company.membershipactive && <div className={classes.lockspan}>locked</div>}
                    </ListGroup.Item>
                  </ListGroup>}
                  </>
                );
              })}
          </Col>
        </Row>
      </Container>
      <div className={classes.pagination}>
      <Pagination >{items}</Pagination>
      </div>
    </>
  );
};

export default CompanyList;
