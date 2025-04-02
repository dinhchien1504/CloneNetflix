import { z } from "zod";

export const SignupFormSchema = z.object({
  email: z.string().email({ message: "Vui lòng nhập đúng định dạng email."}).trim(),
  password: z.string().min(8,{message: "Mật khẩu tối thiểu 8 ký tự"}).trim(),
  cfpassword: z.string()
}).refine((data) => data.password === data.cfpassword, {
  message: "Mật khẩu không khớp.",
  path: ["cfpassword"]
})

export type FormSignUpState = | {
    errors?: {
      email? : string[],
      password?: string[],
      cfpassword?: string[]
    }
    message?: string
 } | undefined