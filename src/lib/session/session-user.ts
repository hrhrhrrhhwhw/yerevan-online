import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireUser() {
  'use server';
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session, 'session из функции');

  if (!session?.user) {
    redirect('/sign-in');
  }

  return session.user;
}
