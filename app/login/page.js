'use client';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from '@/lib/auth-client';
import GoogleButton from '@/components/GoogleButton';
import Title from '@/components/Title';
function Form() {
  const router = useRouter(); const next = useSearchParams().get('next') || '/'; const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault(); const f = new FormData(e.target); setErr('');
    const { error } = await signIn.email({ email: f.get('email'), password: f.get('password') });
    if (error) { setErr(error.message || 'Wrong email or password.'); toast.error('Login failed. Check your email and password.'); return; }
    toast.success('Welcome back!'); router.push(next);
  };
  return (<div className="max-w-md mx-auto my-16 card bg-base-100 shadow-xl rounded-2xl p-8"><Title t="Login" />
    <h1 className="text-3xl font-bold mb-6">Login to BookNook</h1>
    <form onSubmit={submit} className="grid gap-4">
      <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
      <input name="password" type="password" placeholder="Password" className="input input-bordered" required />
      <Link href="#" onClick={(e) => { e.preventDefault(); toast('Password reset is coming soon.'); }} className="text-sm link">Forgot password?</Link>
      {err && <p className="text-error text-sm">{err}</p>}
      <button className="btn btn-primary">Login</button></form>
    <GoogleButton callbackURL={next} />
    <p className="mt-6 text-sm">New here? <Link href="/register" className="link link-primary">Create an account</Link></p></div>);
}
export default function Login() { return <Suspense><Form /></Suspense>; }