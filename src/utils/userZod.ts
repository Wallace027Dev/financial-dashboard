import { z } from "zod";

const userZod = z.object({
  name: z
    .string({
      required_error: "is required",
      invalid_type_error: "must be a string"
    })
    .min(3, {
      message: "must be a 3 or more characters long"
    }),
  email: z
    .string({
      required_error: "is required",
      invalid_type_error: "must be a string"
    })
    .email(),
  password: z
    .string({
      required_error: "is required",
      invalid_type_error: "must be a string"
    })
    .min(6, {
      message: "must be a 6 or more characters long"
    })
});

export default userZod;