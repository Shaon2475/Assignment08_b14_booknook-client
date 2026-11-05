'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { uploadImage } from '@/lib/api';
export const CATEGORIES = ['Fiction', 'Science', 'History', 'Kids', 'Others'];
export default function BookForm({ initial = {}, user, onSubmit, label, edit }) {
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); const f = new FormData(e.target); setBusy(true);
    try {
      let image = initial.image; const file = f.get('image');
      if (file && file.size) image = await uploadImage(file);
      if (!image) throw new Error('Please choose a book cover image.');
      await onSubmit({ title: f.get('title'), author: f.get('author'), category: f.get('category'),
        description: f.get('description'), totalCopies: f.get('totalCopies'), image });
      if (!edit) e.target.reset();
    } catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };
  return (
    <form onSubmit={submit} className="grid gap-4">
      <input name="title" defaultValue={initial.title} placeholder="Book title" className="input input-bordered" required />
      <input name="author" defaultValue={initial.author} placeholder="Author name" className="input input-bordered" required />
      <select name="category" defaultValue={initial.category || 'Fiction'} className="select select-bordered">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
      <input name="totalCopies" type="number" min="1" defaultValue={initial.totalCopies || 1} className="input input-bordered" placeholder="Total copies" required />
      <input name="image" type="file" accept="image/*" className="file-input file-input-bordered" required={!edit} />
      <textarea name="description" defaultValue={initial.description} placeholder="Short description" className="textarea textarea-bordered h-24" required />
      {user && <div className="grid sm:grid-cols-2 gap-4">
        <input value={user.name} readOnly className="input input-bordered opacity-70" aria-label="Your name" />
        <input value={user.email} readOnly className="input input-bordered opacity-70" aria-label="Your email" /></div>}
      <button className="btn btn-primary" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : label}</button>
    </form>
  );
}
