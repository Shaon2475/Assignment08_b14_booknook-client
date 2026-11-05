'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Guard from '@/components/Guard';
import Spinner from '@/components/Spinner';
import Title from '@/components/Title';
import { api } from '@/lib/api';
function Borrows() {
  const [rows, setRows] = useState(null);
  useEffect(() => { api('/borrows').then(setRows).catch((e) => { toast.error(e.message); setRows([]); }); }, []);
  const ret = async (id) => { try { await api(`/borrows/${id}`, { method: 'DELETE' }); setRows(rows.filter((r) => r._id !== id)); toast.success('Book returned. Thank you!'); } catch (e) { toast.error(e.message); } };
  const d = (x) => new Date(x).toLocaleDateString();
  return (<div className="max-w-5xl mx-auto px-4 py-12"><Title t="My Borrows" /><h1 className="section-title">My Borrows</h1>
    {!rows ? <Spinner /> : rows.length === 0 ? <p>You have no borrowed books right now.</p> :
      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-md"><table className="table"><thead><tr><th>Cover</th><th>Title</th><th>Borrowed</th><th>Return by</th><th /></tr></thead>
        <tbody>{rows.map((r) => (<tr key={r._id}><td><img src={r.bookImage} alt="" className="w-12 h-16 object-cover rounded" /></td><td>{r.bookTitle}</td><td>{d(r.borrowDate)}</td><td>{d(r.returnDate)}</td>
          <td><button className="btn btn-sm btn-primary" onClick={() => ret(r._id)}>Return Book</button></td></tr>))}</tbody></table></div>}</div>);
}
export default function Page() { return <Guard><Borrows /></Guard>; }
