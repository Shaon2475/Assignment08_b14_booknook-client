'use client';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Guard from '@/components/Guard';
import Spinner from '@/components/Spinner';
import Title from '@/components/Title';
import { api } from '@/lib/api';
import { useSession } from '@/lib/auth-client';
function Details({ id }) {
  const { data } = useSession(); const [b, setB] = useState(null); const [open, setOpen] = useState(false); const [busy, setBusy] = useState(false); const [fav, setFav] = useState(false);
  useEffect(() => {
    api(`/books/${id}`).then(setB).catch((e) => { toast.error(e.message); setB(false); });
    api('/favorites').then((l) => setFav(l.some((x) => x._id === id))).catch(() => {});
  }, [id]);
  if (b === null) return <Spinner />; if (b === false) return <p className="text-center py-24">This book could not be found.</p>;
  const borrow = async () => {
    setBusy(true);
    try { await api('/borrows', { method: 'POST', body: JSON.stringify({ bookId: id }) }); toast.success('Book borrowed. Find it in My Borrows.');
      setB({ ...b, copies: b.copies - 1 }); setOpen(false); }
    catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };
  const toggleFav = async () => {
    try { const r = await api(`/favorites/${id}`, { method: 'POST' }); setFav(r.favorite); toast.success(r.favorite ? 'Added to your favourites.' : 'Removed from your favourites.'); }
    catch (e) { toast.error(e.message); }
  };
  return (<div className="max-w-5xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2"><Title t={b.title} />
    <img src={b.image} alt={b.title} className="w-full h-96 object-cover rounded-2xl shadow-lg" />
    <div><h1 className="text-3xl font-bold">{b.title}</h1><p className="mt-2">by {b.author}</p>
      <span className="badge badge-outline mt-3">{b.category}</span><p className="mt-6">{b.description}</p>
      <p className="mt-4 text-sm opacity-80">Added by {b.userName} ({b.userEmail}) · {b.copies} of {b.totalCopies} copies available</p>
      <div className="flex flex-wrap gap-3 mt-6">
        <button disabled={b.copies < 1} onClick={() => setOpen(true)} className="btn btn-primary">{b.copies < 1 ? 'Not Available' : 'Borrow This Book'}</button>
        <button onClick={toggleFav} className={`btn ${fav ? 'btn-error' : 'btn-outline'}`}>{fav ? '♥ In Favourites' : '♡ Add to Favourites'}</button>
      </div></div>
    {open && <dialog className="modal modal-open"><div className="modal-box"><h3 className="font-bold text-xl mb-4">Borrow “{b.title}”</h3>
      <div className="grid gap-3"><input readOnly value={data?.user.name} className="input input-bordered" /><input readOnly value={data?.user.email} className="input input-bordered" /></div>
      <div className="modal-action"><button className="btn" onClick={() => setOpen(false)}>Cancel</button>
        <button className="btn btn-primary" disabled={busy} onClick={borrow}>Confirm Borrow</button></div></div></dialog>}
  </div>);
}
export default function Page({ params }) { const { id } = use(params); return <Guard><Details id={id} /></Guard>; }