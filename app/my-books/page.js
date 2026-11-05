'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Guard from '@/components/Guard';
import BookForm from '@/components/BookForm';
import BookCard from '@/components/BookCard';
import Spinner from '@/components/Spinner';
import Title from '@/components/Title';
import { api } from '@/lib/api';
import { useSession } from '@/lib/auth-client';
function Mine() {
  const { data } = useSession(); const sp = useSearchParams(); const [tab, setTab] = useState(sp.get('tab') === 'fav' ? 'fav' : 'mine');
  const [books, setBooks] = useState(null); const [favs, setFavs] = useState(null); const [edit, setEdit] = useState(null); const [del, setDel] = useState(null);
  useEffect(() => { setTab(sp.get('tab') === 'fav' ? 'fav' : 'mine'); }, [sp]);
  useEffect(() => {
    api(`/books?email=${encodeURIComponent(data.user.email)}`, {}, false).then(setBooks).catch(() => setBooks([]));
    api('/favorites').then(setFavs).catch(() => setFavs([]));
  }, [data]);
  const save = async (b) => {
    await api(`/books/${edit._id}`, { method: 'PATCH', body: JSON.stringify(b) });
    const total = Math.max(parseInt(b.totalCopies) || 1, 1); const borrowed = edit.totalCopies - edit.copies;
    setBooks(books.map((x) => (x._id === edit._id ? { ...x, ...b, totalCopies: total, copies: total - borrowed } : x)));
    setEdit(null); toast.success('Book updated.');
  };
  const remove = async () => {
    try { await api(`/books/${del._id}`, { method: 'DELETE' }); setBooks(books.filter((x) => x._id !== del._id)); toast.success('Book deleted.'); }
    catch (e) { toast.error(e.message); } setDel(null);
  };
  return (<div className="max-w-6xl mx-auto px-4 py-12"><Title t="My Books" /><h1 className="section-title">My Books</h1>
    <div role="tablist" className="tabs tabs-boxed w-fit mx-auto mb-10">
      <button role="tab" className={`tab ${tab === 'mine' ? 'tab-active' : ''}`} onClick={() => setTab('mine')}>Added by me ({books ? books.length : 0})</button>
      <button role="tab" className={`tab ${tab === 'fav' ? 'tab-active' : ''}`} onClick={() => setTab('fav')}>♥ Favourites ({favs ? favs.length : 0})</button>
    </div>
    {tab === 'mine' && (!books ? <Spinner /> : books.length === 0 ? <p className="text-center">You have not added any books yet.</p> :
      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-md"><table className="table">
        <thead><tr><th>Cover</th><th>Title</th><th>Category</th><th>Copies</th><th /></tr></thead>
        <tbody>{books.map((b) => (<tr key={b._id}><td><img src={b.image} alt="" className="w-12 h-16 object-cover rounded" /></td><td>{b.title}</td><td>{b.category}</td><td>{b.copies}/{b.totalCopies}</td>
          <td className="flex gap-2"><button className="btn btn-sm btn-primary" onClick={() => setEdit(b)}>Edit</button><button className="btn btn-sm btn-error btn-outline" onClick={() => setDel(b)}>Delete</button></td></tr>))}</tbody></table></div>)}
    {tab === 'fav' && (!favs ? <Spinner /> : favs.length === 0 ? <p className="text-center">No favourites yet. Open a book and tap Add to Favourites.</p> :
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{favs.map((b) => <BookCard key={b._id} b={b} />)}</div>)}
    {edit && <dialog className="modal modal-open"><div className="modal-box"><h3 className="font-bold text-xl mb-4">Edit book</h3>
      <BookForm edit initial={edit} label="Save Changes" onSubmit={save} /><button className="btn btn-ghost btn-sm mt-2" onClick={() => setEdit(null)}>Cancel</button></div></dialog>}
    {del && <dialog className="modal modal-open"><div className="modal-box"><h3 className="font-bold text-xl">Delete “{del.title}”?</h3><p className="py-3">This removes the book from the library. You cannot undo it.</p>
      <div className="modal-action"><button className="btn" onClick={() => setDel(null)}>Keep Book</button><button className="btn btn-error" onClick={remove}>Delete Book</button></div></div></dialog>}
  </div>);
}
export default function Page() { return <Guard><Suspense fallback={<Spinner />}><Mine /></Suspense></Guard>; }