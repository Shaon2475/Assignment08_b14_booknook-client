import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AosInit from "@/components/AosInit";
export const metadata = { title: 'BookNook | A Small Online Library' };
export default function RootLayout({ children }) {
  return (<html lang="en" data-theme="light"><body className="bg-base-200 min-h-screen flex flex-col font-sans">
    <Navbar /><main className="flex-1">{children}</main><Footer /><Toaster position="top-right" /><AosInit /></body></html>);
}
