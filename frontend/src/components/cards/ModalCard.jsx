import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';

const ModalCard = ({employee}) => {
  return (
    <div className='listing'>
        <h2 className="listing-heading">{employee.nom}</h2>
        <h2 className="listing-heading">{employee.email}</h2>
        <div className='taking-action'>
            <Link className='modifier' to={`/employee/modifier-employee/${employee._id}`}>
              Modifier
            </Link>
            <Link className='supprimer' to={`/employee/supprimer-employee/${employee._id}`}>
              Supprimer
            </Link>
        </div>
    </div>
  )
}

export default ModalCard