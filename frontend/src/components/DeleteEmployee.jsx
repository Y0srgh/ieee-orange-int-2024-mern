import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEmployee = () => {
    axios
      .delete(`http://localhost:5000/employee/${id}`)
      .then(() => {
        enqueueSnackbar('L\'employé a été effacé avec succès', { variant: 'success' });
        navigate('/employee');
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
        navigate('/employee');
      });
  };

  return <div className="adding-employee-container">
        <h2 className="section-heading">Voulez-vous vraiment effacer cet employé?</h2>
        <div className='delete-form'>
        <button
          className='primary confirm-delete'
          onClick={handleDeleteEmployee}
        >
          Confirmer
        </button>
      </div>
  </div>;
};

export default DeleteEmployee;
