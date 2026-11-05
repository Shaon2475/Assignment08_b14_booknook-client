'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import Spinner from './Spinner';
export default function Guard({ children }) {
  const { data, isPending } = useSession(); const router = useRouter(); const path = usePathname();
  useEffect(() => { if (!isPending && !data) router.replace(`/login?next=${encodeURIComponent(path)}`); }, [data, isPending, path, router]);
  return data ? children : <Spinner />;
}
