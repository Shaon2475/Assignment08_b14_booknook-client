import Link from 'next/link';
const social = "btn btn-circle btn-sm btn-ghost border border-white/40 text-white hover:bg-white hover:text-neutral";
export default function Footer() {
  return (
    <footer className="bg-neutral text-white mt-16 border-t border-base-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div><Link href="/" className="text-2xl font-bold">BookNook</Link>
          <p className="mt-3 text-sm text-white/70">A small online library. Add a book, borrow a book, return a book.</p></div>
        <div className="text-sm space-y-1"><h3 className="font-semibold text-base">Contact</h3>
          <p className="text-white/70">hello@booknook.com</p><p className="text-white/70">+880 1700-6435300</p><p className="text-white/70">Dhaka, Bangladesh</p></div>
        <div><h3 className="font-semibold">Follow us</h3>
          <div className="flex gap-3 mt-3">
            <a href="https://x.com" aria-label="X" className={social}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.19 8.22L22.75 22h-6.6l-5.17-6.77L5 22H1.74l7.69-8.8L1.25 2h6.77l4.67 6.17zm-1.16 18h1.83L6.99 3.9H5.03z"/></svg></a>
            <a href="https://facebook.com" aria-label="Facebook" className={social}>f</a>
            <a href="https://github.com" aria-label="GitHub" className={social}>G</a></div></div>
      </div>
      <p className="text-center text-xs text-white/70 py-4 border-t border-white/10">© {new Date().getFullYear()} BookNook. All rights reserved.</p>
    </footer>
  );
}