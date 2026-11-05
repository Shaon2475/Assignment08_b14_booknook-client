'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signUp } from '@/lib/auth-client';
import { uploadImage } from '@/lib/api';
import { avatar } from '@/lib/avatars';
import GoogleButton from '@/components/GoogleButton';
import Title from '@/components/Title';
export default function Register() {
  const router = useRouter(); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); const f = new FormData(e.target); const pw = f.get('password');
    const bad = !/[A-Z]/.test(pw) ? 'Password needs an uppercase letter.' : !/[a-z]/.test(pw) ? 'Password needs a lowercase letter.' : pw.length < 6 ? 'Password must be at least 6 characters.' : '';
    setErr(bad); if (bad) return;
    setBusy(true);
    try {
      const file = f.get('photo'); let image = avatar(f.get('gender'));
      if (file && file.size) image = await uploadImage(file);
      const { error } = await signUp.email({ name: f.get('name'), email: f.get('email'), password: pw, image });
      if (error) throw new Error(error.message || 'Registration failed.');
      toast.success('Account created. Please log in.'); router.push('/login');
    } catch (ex) { setErr(ex.message); toast.error(ex.message); } finally { setBusy(false); }
  };
  return (<div className="max-w-md mx-auto my-16 card bg-base-100 shadow-xl rounded-2xl p-8"><Title t="Register" />
    <h1 className="text-3xl font-bold mb-6">Create your account</h1>
    <form onSubmit={submit} className="grid gap-4">
      <input name="name" placeholder="Name" className="input input-bordered" required />
      <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
      <select name="gender" defaultValue="male" className="select select-bordered"><option value="male">Male</option><option value="female">Female</option></select>
      <div><label className="text-sm opacity-70">Profile picture (optional)</label>
        <input name="photo" type="file" accept="image/*" className="file-input file-input-bordered w-full mt-1" /></div>
      <input name="password" type="password" placeholder="Password" className="input input-bordered" required />
      {err && <p className="text-error text-sm">{err}</p>}
      <button className="btn btn-primary" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : 'Register'}</button></form>
    <GoogleButton callbackURL="/" />
    <p className="mt-6 text-sm">Already registered? <Link href="/login" className="link link-primary">Login</Link></p></div>);
}