import express from "express";
import {
  addEmployee,
  updateEmployee,
  findAllEmployees,
  findOneEmployee,
  deleteEmployee,
  authEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", addEmployee);
router.post("/auth", authEmployee);
router.get("/", findAllEmployees);
router.get("/:id", findOneEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;