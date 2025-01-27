import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/students.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createStudentSchema } from "../schemas/student.schema.js";

const router = Router();

router.get("/api/students", authRequired, getStudents);

router.get("/api/students/:id", authRequired, getStudent);

router.post(
  "/api/students",
  authRequired,
  validateSchema(createStudentSchema),
  createStudent
);

router.delete("/api/students/:id", authRequired, deleteStudent);

router.put("/api/students/:id", authRequired, updateStudent);

export default router;
