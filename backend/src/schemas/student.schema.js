import { z } from "zod";

export const createStudentSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  department: z
    .string({
      required_error: "Department is required",
    })
    .min(1),
  grade: z
    .string({
      required_error: "Grade is required",
    })
    .min(1),
  enrollNumber: z.string().optional(),
});
