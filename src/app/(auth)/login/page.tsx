"use client"
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 
  const handleRedirect = () => {
    router.push("/");
  };
  const { data: session } = useSession();
  if(session) {
    handleRedirect()
  }
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    console.log(result)
    setLoading(false);

    if (result?.error) {
      toast.error("Tài khoản hoặc mật khẩu không chính xác!")
  } else {
      toast.success("Đăng nhập thành công")
      handleRedirect()
  }
  };
  return (
    <div className='w-full max-w-[450px] flex items-center justify-center  inset-0 bg-black/80'>
     <div className="flex flex-col w-full justify-center  p-8  rounded-lg shadow-lg">
          <h2 className="text-white text-3xl mb-6 font-semibold">Sign In</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
            value={formData.email}
            onChange={handleChange}
              type="email"
              name='email'
              placeholder="Email"
              required
              className="p-3 rounded inset-0 border-1 text-white focus:outline-amber-50"
            />
            
            <input
                     value={formData.password}
                     onChange={handleChange}
              type="password"
              name='password'
              placeholder="Password"
              required
              className="p-3 rounded inset-0 border-1 text-white focus:outline-amber-50"
            />
            <button disabled={loading} className="bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold">
              Sign In
            </button>
          </form>
          <p className="text-gray-400 mt-6 text-sm text-center">
            New to Netflix?{' '}
            <Link href="/register" className="text-white hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
    </div>
  )
}

export default Login