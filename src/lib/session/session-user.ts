import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

export async function sessionUser() {
  'use server';
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/sign-in');
  }

  if (session.session.userId !== session.user.id) {
    return notFound();
  }

  return session?.user ?? null;
}
