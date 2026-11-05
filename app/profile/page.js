'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Guard from '@/components/Guard';
import Title from '@/components/Title';
import { updateUser, useSession } from '@/lib/auth-client';
import { uploadImage } from '@/lib/api';
import { avatar } from '@/lib/avatars';
function P() {
  const { data } = useSession(); const u = data.user; const [open, setOpen] = useState(false); const [busy, setBusy] = useState(false);
  const save = async (e) => {
    e.preventDefault(); const f = new FormData(e.target); setBusy(true);
    try {
      const file = f.get('photo'); let image = u.image || avatar('male');
      if (file && file.size) image = await uploadImage(file);
      const { error } = await updateUser({ name: f.get('name'), image });
      if (error) throw new Error(error.message || 'Could not update your profile.');
      toast.success('Profile updated.'); setOpen(false);
    } catch (ex) { toast.error(ex.message); } finally { setBusy(false); }
  };
  return (<div className="max-w-md mx-auto my-16 card bg-base-100 shadow-xl rounded-2xl p-8 items-center text-center"><Title t="My Profile" />
    <img src={u.image || avatar('male')} alt={u.name} className="w-28 h-28 rounded-full object-cover" />
    <h1 className="text-2xl font-bold mt-4">{u.name}</h1><p className="opacity-70">{u.email}</p>
    <button className="btn btn-primary mt-6" onClick={() => setOpen(true)}>Update Profile</button>
    {open && <dialog className="modal modal-open"><div className="modal-box text-left"><h3 className="font-bold text-xl mb-4">Update profile</h3>
      <form onSubmit={save} className="grid gap-4">
        <input name="name" defaultValue={u.name} className="input input-bordered" required />
        <input value={u.email} readOnly className="input input-bordered opacity-70" />
        <div><label className="text-sm opacity-70">New picture (optional)</label>
          <input name="photo" type="file" accept="image/*" className="file-input file-input-bordered w-full mt-1" /></div>
        <div className="modal-action"><button type="button" className="btn" onClick={() => setOpen(false)}>Cancel</button>
          <button className="btn btn-primary" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : 'Save Changes'}</button></div>
      </form></div></dialog>}
  </div>);
}
export default function Page() { return <Guard><P /></Guard>; }