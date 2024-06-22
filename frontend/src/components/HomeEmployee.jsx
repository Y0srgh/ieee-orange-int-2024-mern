import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import ModalCard from "./cards/ModalCard";
import "./styles.css";
const HomeEmployee = () => {
  const [employees, setemployees] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/employee")
      .then((response) => {
        console.log("reponse home emp: ", response.data);
        setemployees(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="header-container">
        <h2 className="section-heading">La liste des employés</h2>
        <Link to={`/employee/ajouter-employee`}>
          Ajouter un employé
        </Link>
      </div>
      <div className="results">
        {employees.map((employee) => (
          <ModalCard key={employee._id} employee={employee} />
        ))}
      </div>
    </>
  );
};

export default HomeEmployee;
