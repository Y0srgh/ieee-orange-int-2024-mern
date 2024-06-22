import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./App.css";
import CreateEmployee from "./components/CreateEmployee";
import HomeEmployee from "./components/HomeEmployee";
import EditEmployee from "./components/EditEmployee";
import DeleteEmployee from "./components/DeleteEmployee";
import LoginForm from "./components/LoginForm";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const fetchRefresh = async () => {
      try {
        const response = await axios
          .get("http://localhost:5000/employee/auth/refresh", {
            headers: {
              "Content-Type": "application/json",
              jwt: localStorage.getItem("refreshToken"),
            },
          })
          .then((resp) => {
            localStorage.setItem("accessToken", resp.data.accessToken);
            console.log("------------------", resp);
          })
          .catch((error) => {
            console.log(error);

            localStorage.setItem("accessToken", "");
            localStorage.setItem("refreshToken", "");
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchRefresh();
  }, []);

  const refresh = localStorage.getItem("refreshToken");
  refresh && console.log(refresh);
  //setAccessToken(localStorage.getItem('accessToken'))
  const token = localStorage.getItem("accessToken");
  if (token) {
    console.log(
      "tokeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeen",
      localStorage.getItem("accessToken")
    );
    var role = localStorage.getItem("userRole");
    console.log(token);
    console.log(token);
    const decodedToken = jwtDecode(localStorage.getItem("accessToken"));
    console.log("the decoded --------", decodedToken);
    console.log("tokeeen", token);
  }
  return (
    <>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            {token && (<><Route
              exact
              path="/employee/ajouter-employee"
              element={<CreateEmployee />}
            />
            <Route
              exact
              path="/employee/modifier-employee/:id"
              element={<EditEmployee />}
            />
            <Route
              exact
              path="/employee/supprimer-employee/:id"
              element={<DeleteEmployee />}
            />
            <Route exact path="/employee" element={<HomeEmployee />} />

            </>) || <Route path="/*" element={<LoginForm />} />}
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
};

export default App;
