import { z } from "zod";

const transactionZod = z.object({
  type: z.enum(["RECIPE", "EXPENSE"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'RECIPE' or 'EXPENSE'"
  }),
  value: z
    .number({
      required_error: "Value is required",
      invalid_type_error: "Value must be a number"
    })
    .min(0.01, { message: "Value must be greater than zero" }),
  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string"
    })
    .min(1, { message: "Category cannot be empty" }),
  userId: z
    .number({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a number"
    })
    .int()
    .min(1, { message: "User ID must be a positive integer" })
});

export default transactionZod;
