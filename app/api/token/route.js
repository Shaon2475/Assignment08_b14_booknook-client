import { auth } from '@/lib/auth';
import { SignJWT } from 'jose';
import { headers } from 'next/headers';
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return Response.json({ message: 'Not logged in' }, { status: 401 });
  const token = await new SignJWT({ email: session.user.email, name: session.user.name })
    .setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1h')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return Response.json({ token });
}
