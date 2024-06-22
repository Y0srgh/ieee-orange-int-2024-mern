import express from "express";
import {
  addEmployee,
  updateEmployee,
  findAllEmployees,
  findOneEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", addEmployee);
router.get("/", findAllEmployees);
router.get("/:id", findOneEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;