import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Employee } from "../models/employeeModel.js";

export const addEmployee = async (req, res) => {
  try {
    const { nom, email, password } = req.body;
    console.log(req.body);
    if (!nom || !email || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Un employé avec cet email existe déjà." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await Employee.create({
      nom,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'employé :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de l'employé.",
    });
  }
};

export const findAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des employés :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des employés.",
    });
  }
};

export const findOneEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ error: "id invalid" });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ error: "id invalid" });
    }

    if (!nom && !email && password) {
      return res.status(400).json({
        message: "Vous devez mettre à jour au moins un champ",
      });
    }

    let updatedFields = {
      nom,
      email,
      password,
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    updatedFields.password = hashedPassword;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    return res.status(200).json({ message: "Employé mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'employé :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour de l'employé.",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ error: "id invalid" });
    }

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    return res.status(200).json({ message: "Employé supprimé avec succès." });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du mot de passe de l'employé :",
      error
    );
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour du mot de passe.",
    });
  }
};
