"use client"
import { signup } from '@/app/actions/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useActionState, useState } from 'react'

const Register = () => {
  const [state, action, pending ] = useActionState(signup, undefined)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cfpassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Xóa lỗi nếu người dùng nhập đúng
  if (state?.errors) {
    state.errors[name as keyof typeof state.errors] = undefined;
  }
  };
  if (state?.status) {
    if (state.status === "ok") {
      redirect("/login");
    }
  }
  return (
    <div className='w-full max-w-[450px] flex items-center justify-center inset-0 bg-black/80'>
    <div className="flex flex-col w-full justify-center p-8 rounded-lg shadow-lg">
         <h2 className="text-white text-3xl mb-6 font-semibold">Sign Up</h2>
         <form className="flex flex-col space-y-4" action={action}>
           <input
             value={formData.email}
             onChange={handleChange}
             type="email"
             placeholder="Email"
             name='email'
             className={`p-3 rounded inset-0 border-1 text-white focus:outline-amber-50  ${state?.errors?.email ? "border-red-600 focus:border-red-500" : "border-gray-400 focus:border-amber-50"}`}
             autoComplete='email'
           />
            {state?.errors?.email && <p className="text-red-600">{state?.errors?.email}</p>}
           <input
            value={formData.password}
            onChange={handleChange}
             type="password"
             placeholder="Password"
             name='password'
             className={`p-3 rounded inset-0 border-1 text-white focus:outline-amber-50  ${state?.errors?.password ? "border-red-600 focus:border-red-500" : "border-gray-400 focus:border-amber-50"}`}
             autoComplete='new-password'
           />
            {state?.errors?.password && <p className="text-red-600">{state?.errors?.password}</p>}
           <input
             type="password"
             name='cfpassword'
             value={formData.cfpassword}
             onChange={handleChange}
             placeholder="Confirm Password"
             className={`p-3 rounded inset-0 border-1 text-white focus:outline-amber-50  ${state?.errors?.cfpassword ? "border-red-600 focus:border-red-500" : "border-gray-400 focus:border-amber-50"}`}
             autoComplete='new-password'
           />
            {state?.errors?.cfpassword && <p className="text-red-600">{state?.errors?.cfpassword}</p>}
           <button disabled={pending} className="bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold">
             Sign Up
           </button>
         </form>
         <p className="text-gray-400 mt-6 text-sm text-center">
           You already have Netflix account?{' '}
           <Link href="/login" className="text-white hover:underline">
             Sign in now
           </Link>
         </p>
       </div>
   </div>
  )
}

export default Register