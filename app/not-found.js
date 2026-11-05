import Link from 'next/link';
import Title from '@/components/Title';
export default function NotFound() {
  return (<div className="text-center py-32 px-4"><Title t="Page Not Found" />
    <h1 className="font-display text-7xl text-primary">404</h1><p className="mt-4 mb-8">This shelf is empty. The page you wanted does not exist.</p>
    <Link href="/" className="btn btn-primary">Back to Home</Link></div>);
}
