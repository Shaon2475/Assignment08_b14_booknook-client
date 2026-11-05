"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
const Stars = ({ n }) => <span className="text-accent text-lg" aria-label={`${n} out of 5`}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
export default function Reviews() {
  const { data } = useSession(); const [list, setList] = useState(null); const [busy, setBusy] = useState(false);
  useEffect(() => { api("/reviews", {}, false).then(setList).catch(() => setList([])); }, []);
  const submit = async (e) => {
    e.preventDefault(); const form = e.target; const f = new FormData(form); setBusy(true);
    try {
      const r = await api("/reviews", { method: "POST", body: JSON.stringify({ text: f.get("text"), rating: Number(f.get("rating")) }) });
      setList([r, ...(list || [])]); form.reset(); toast.success("Thanks! Your review is now live.");
    } catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };
  return (
    <section className="max-w-6xl mx-auto px-4 pt-24">
      <h2 className="section-title" data-aos="fade-up">Reader Reviews</h2>
      {list && list.length === 0 && <p className="text-center mb-10">No reviews yet. Be the first to share yours.</p>}
      {list && list.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {list.map((r) => (
            <figure key={r._id} className="card bg-base-100 shadow-md rounded-2xl p-6 h-full">
              <Stars n={r.rating} />
              <blockquote className="mt-3 opacity-80">“{r.text}”</blockquote>
              <figcaption className="mt-auto pt-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold">{r.userName?.[0]?.toUpperCase()}</span>
                <span className="font-semibold">{r.userName}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      <div className="max-w-xl mx-auto card bg-base-100 shadow-xl rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-4">Write a review</h3>
        {data ? (
          <form onSubmit={submit} className="grid gap-4">
            <input value={data.user.name} readOnly className="input input-bordered opacity-70" aria-label="Your name" />
            <select name="rating" defaultValue="5" className="select select-bordered" aria-label="Rating">
              <option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option>
            </select>
            <textarea name="text" placeholder="Share your experience with BookNook" className="textarea textarea-bordered h-28" minLength={5} maxLength={300} required />
            <button className="btn btn-primary" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : "Submit Review"}</button>
          </form>
        ) : (
          <div className="text-center"><p className="mb-4">Please log in to write a review.</p><Link href="/login?next=/" className="btn btn-primary">Login</Link></div>
        )}
      </div>
    </section>
  );
}