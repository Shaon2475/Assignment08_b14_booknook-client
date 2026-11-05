'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession, signOut } from '@/lib/auth-client';
import { avatar } from '@/lib/avatars';
export default function Navbar() {
  const { data } = useSession(); const router = useRouter(); const [dark, setDark] = useState(false);
  useEffect(() => { const d = localStorage.theme === 'dark'; setDark(d); document.documentElement.dataset.theme = d ? 'dark' : 'light'; }, []);
  const toggle = () => { const d = !dark; setDark(d); localStorage.theme = d ? 'dark' : 'light'; document.documentElement.dataset.theme = d ? 'dark' : 'light'; };
  const links = (<>
    <li><Link href="/">Home</Link></li><li><Link href="/books">All Books</Link></li>
    {data && <><li><Link href="/add-book">Add Book</Link></li><li><Link href="/my-books">My Books</Link></li><li><Link href="/my-borrows">My Borrows</Link></li></>}
  </>);
  const logout = async () => { await signOut(); toast.success('You have been logged out.'); router.push('/'); };
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-40 px-4 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown lg:hidden"><label tabIndex={0} className="btn btn-ghost">☰</label>
          <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">{links}</ul></div>
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M8 7h6"/></svg>BookNook</Link>
      </div>
      <div className="navbar-center hidden lg:flex"><ul className="menu menu-horizontal">{links}</ul></div>
      <div className="navbar-end gap-2">
        <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Toggle theme">{dark ? '☀' : '☾'}</button>
        {data ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="avatar cursor-pointer"><div className="w-10 rounded-full"><img src={data.user.image || avatar('male')} alt={data.user.name} /></div></label>
            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow border border-base-300">
              <li className="px-3 py-2 font-semibold">{data.user.name}</li>
              <li><Link href="/profile">My Profile</Link></li>
              <li><Link href="/my-books?tab=fav">♥ My Favourites</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        ) : (<><Link href="/login" className="btn btn-primary btn-sm">Login</Link><Link href="/register" className="btn btn-outline btn-primary btn-sm">Register</Link></>)}
      </div>
    </div>
  );
}