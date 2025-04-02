import { FormSignUpState, SignupFormSchema } from "@/app/lib/definitions";
import { User } from "@/model/User";
import { UserLogin } from "@/model/UserLogin";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from 'react-toastify'

export async function signup(state: FormSignUpState, formData : FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    cfpassword: formData.get("cfpassword")
  })

  
  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

    // Call the provider or db to create a user...
  const {email, password} = validatedFields.data
  try{
    const response = await fetch(`http://localhost:8000/account?email=${email}`)
    const data = await response.json()
    if (data.length > 0) {
      toast.error("Email đã tồn tại!")
      return { errors: { email: ["Email đã tồn tại!"] } };
    }
  }catch(error) {
    toast.error("Lỗi khi gửi dữ liệu:" + error);
    return {status: "err", message: "Lỗi server. Vui lòng thử lại sau." };
  }
  
  try {
    // Gửi request POST đến JSON Server
    const response = await fetch("http://localhost:8000/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Không lưu cfpassword
    });

    if (!response.ok) {
    toast.error("Có lỗi xảy ra khi tạo tài khoản.");
      return {status: "err", message: "Có lỗi xảy ra khi tạo tài khoản." };
    }
    toast.success("Đăng ký thành công!")
    return {status: "ok", message: "Đăng ký thành công!" };
  } catch (error) {
    toast.error("Lỗi khi gửi dữ liệu:"+ error);
    return { status: "err" , message: "Lỗi server. Vui lòng thử lại sau." };
  }
}


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { },
        password: { }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng nhập email và mật khẩu");
        }

        // Gọi JSON Server để kiểm tra user
        const res = await fetch(`http://localhost:8000/account`);
        const users:User[] = await res.json();

        const foundUser = users.find(user => user.email === credentials.email && user.password === credentials.password);
        if (!foundUser) {
          throw new Error("Email hoặc mật khẩu không đúng!");
        }
        
        return foundUser
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
};