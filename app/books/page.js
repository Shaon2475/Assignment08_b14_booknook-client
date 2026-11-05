"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
const tabs = [["All", "#4B5563"], ["Fiction", "#0F766E"], ["Science", "#0E7490"], ["History", "#B45309"], ["Kids", "#BE185D"], ["Others", "#7C3AED"]];
function List() {
  const cat = useSearchParams().get("category"); const [books, setBooks] = useState(null); const [q, setQ] = useState("");
  useEffect(() => { api("/books", {}, false).then(setBooks).catch(() => setBooks([])); }, []);
  const s = q.toLowerCase();
  const shown = books && books.filter((b) => (!cat || b.category === cat) && (b.title + b.author).toLowerCase().includes(s));
  const count = (name) => (books ? (name === "All" ? books.length : books.filter((b) => b.category === name).length) : 0);
  return (<div className="max-w-6xl mx-auto px-4 py-12"><Title t="All Books" />
    <h1 className="section-title">{cat ? `${cat} Books` : "All Books"}</h1>
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tabs.map(([name, col]) => {
        const active = (name === "All" && !cat) || name === cat;
        return (<Link key={name} href={name === "All" ? "/books" : `/books?category=${name}`}
          className="btn btn-sm rounded-full border-2 bg-base-100"
          style={active ? { background: col, borderColor: col, color: "#fff" } : { borderColor: col, color: col }}>
          {name} ({count(name)})</Link>);
      })}
    </div>
    <div className="flex justify-center mb-10">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title or author" className="input input-bordered w-full max-w-md" />
    </div>
    {!shown ? <Spinner /> : shown.length === 0 ? <p className="text-center">No books found here yet.</p> :
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{shown.map((b) => <BookCard key={b._id} b={b} />)}</div>}</div>);
}
export default function Books() { return <Suspense><List /></Suspense>; }