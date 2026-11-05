"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css"; import "swiper/css/pagination";
import { api } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Reviews from "@/components/Reviews";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
const slides = [
  ["Find your next favourite read", "Browse books shared by readers in your community and borrow them for a few days.", "from-primary/20"],
  ["Borrow in one click", "Pick a book, confirm your details and get a clear return date. No fees, no fuss.", "from-secondary/20"],
  ["Share a book you love", "Add your own books to BookNook so the next reader can discover them.", "from-accent/25"],
];
const covers = [["#0F766E", "-rotate-12 left-0 top-14"], ["#F59E0B", "rotate-2 left-20 top-0"], ["#1F2937", "rotate-12 left-40 top-16"]];
const steps = [["Find a book", "Browse the shelves or pick a category that interests you."], ["Borrow it", "Confirm your details and a copy is held for you."], ["Return it", "Return it from My Borrows so the next reader can enjoy it."]];
export default function Home() {
  const [books, setBooks] = useState(null);
  useEffect(() => { api("/books?limit=6", {}, false).then(setBooks).catch(() => setBooks([])); }, []);
  return (<div><Title t="Home" />
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5500 }} pagination={{ clickable: true }} loop>
      {slides.map(([t, p, g]) => (<SwiperSlide key={t}><div className={`bg-gradient-to-br ${g} to-base-100 px-6 py-16 md:py-24`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-10">
          <div className="max-w-xl"><h1 className="text-3xl md:text-5xl font-bold leading-tight">{t}</h1>
            <p className="mt-5 text-lg opacity-80">{p}</p>
            <Link href="/books" className="btn btn-primary btn-lg mt-8">Browse Books</Link></div>
          <div className="relative hidden md:block h-80 w-72 shrink-0">
            {covers.map(([c, pos], i) => (<div key={i} className={`absolute w-36 h-52 rounded-lg shadow-2xl ${pos}`} style={{ background: c }}>
              <div className="m-4 h-2 w-16 rounded bg-white/70" /><div className="mx-4 h-2 w-10 rounded bg-white/40" /></div>))}</div>
        </div></div></SwiperSlide>))}
    </Swiper>
    <section className="max-w-6xl mx-auto px-4 pt-20"><h2 className="section-title" data-aos="fade-up">New Arrivals</h2>
      {!books ? <Spinner /> : books.length === 0 ? <p className="text-center">No books yet. Be the first to add one.</p> :
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{books.map((b) => <BookCard key={b._id} b={b} />)}</div>}
      <div className="mt-12 text-center"><Link href="/books" className="btn btn-outline btn-primary px-10">See All Books</Link></div></section>
    <section className="max-w-6xl mx-auto px-4 pt-24"><h2 className="section-title" data-aos="fade-up">How Borrowing Works</h2>
      <ol className="grid gap-6 md:grid-cols-3">{steps.map(([t, p], i) => (<li key={t} data-aos="fade-up" className="card bg-base-100 shadow-md rounded-2xl p-8 h-full items-center text-center">
        <span className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-lg font-bold">{i + 1}</span>
        <h3 className="text-xl font-semibold mt-4">{t}</h3><p className="mt-2 opacity-70">{p}</p></li>))}</ol></section>
    <Reviews />
  </div>);
}