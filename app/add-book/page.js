'use client';
import toast from 'react-hot-toast';
import Guard from '@/components/Guard';
import BookForm from '@/components/BookForm';
import Title from '@/components/Title';
import { api } from '@/lib/api';
import { useSession } from '@/lib/auth-client';
function Add() {
  const { data } = useSession();
  return (<div className="max-w-xl mx-auto px-4 py-12"><Title t="Add Book" />
    <div className="bg-base-100 shadow-xl rounded-2xl p-8"><h1 className="section-title">Add a Book</h1>
      <BookForm user={data.user} label="Add Book" onSubmit={async (b) => { await api('/books', { method: 'POST', body: JSON.stringify(b) }); toast.success('Book added to the library.'); }} /></div></div>);
}
export default function Page() { return <Guard><Add /></Guard>; }