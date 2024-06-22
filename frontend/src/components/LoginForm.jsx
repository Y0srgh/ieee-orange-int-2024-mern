import React, { useState } from "react";
import axios from "axios";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = {
            email,
            password
        }

        const response = await axios.post('http://localhost:5000/employee/auth', data);

        if (response.status === 200) {
            const decodedToken = jwtDecode(response.data.accessToken);
            
            const { accessToken } = response.data;
            console.log("helooooooooooooooooooo",response.data);
            localStorage.setItem('accessToken', accessToken); // Store the access token in local storage
            
            localStorage.setItem('refreshToken',response.data.refreshToken);
            console.log("acceeeess token",decodedToken);
            enqueueSnackbar('Logged in successfully!', { variant: 'success' });
            navigate('/employee')
        }
    } catch (error) {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: 'error' });

    }

  }

  return <div className="adding-employee-container">
  <div className="adding-employee">
    <h2 className="section-heading">Se connecter</h2>
    <form onSubmit={handleSubmit}>
      
      <label>Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Mot de pass</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="primary">
        login
      </button>
    </form>
  </div>
</div>;
};

export default LoginForm;
