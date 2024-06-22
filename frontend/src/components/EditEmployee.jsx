import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";

const EditEmployee = () => {
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employee/${id}`)
      .then((response) => {
        setNom(response.data.nom);
        setEmail(response.data.email);
      })
      .catch((error) => {
        navigate("/employee");
        enqueueSnackbar("An error has occurred", { variant: "error" });
        console.log(error);
      });
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nom,
      email,
      password,
    };

    try {
      await axios.put(`http://localhost:5000/employee/${id}`, data);
      enqueueSnackbar("L'employé a été ajouté avec succès", {
        variant: "success",
      });
      navigate("/employee");
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      console.log(error);
      navigate("/employee");
    }
  };

  const validaterEmail = (email) => {
    const emailRegex = /^[a-z]+(\.[a-z]+)?@gmail\.com$/;
    return emailRegex.test(email);
  };
  const validaterNom = (username) => {
    const usernameRegex = /^[a-zA-Z]+$/;
    return usernameRegex.test(username);
  };

  const validateForm = () => {
    if ((password && password.length < 5) || !validaterNom(nom) || !validaterEmail(email)) {
      return false;
    }
    return true
  };

  return <div className="adding-employee-container">
  <div className="adding-employee">
    <h2 className="section-heading">Modifier les données de l'employé</h2>
    <form onSubmit={handleSubmit}>
      <label>Nom</label>
      <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Mot de pass</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="primary" disabled={!validateForm()}>
        Modifier
      </button>
    </form>
  </div>
</div>;
};

export default EditEmployee;
