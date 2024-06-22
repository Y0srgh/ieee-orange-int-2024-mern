import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./App.css";
import CreateEmployee from "./components/CreateEmployee";
import HomeEmployee from "./components/HomeEmployee";
import EditEmployee from "./components/EditEmployee";
import DeleteEmployee from "./components/DeleteEmployee";

const App = () => {
  return (
    <>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
          <Route exact path="/employee/ajouter-employee" element={<CreateEmployee />} />
          <Route exact path="/employee/modifier-employee/:id" element={<EditEmployee />} />
          <Route exact path="/employee/supprimer-employee/:id" element={<DeleteEmployee />} />
          <Route exact path="/employee" element={<HomeEmployee />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
};

export default App;
