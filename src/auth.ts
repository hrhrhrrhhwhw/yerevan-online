'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from './lib/auth'

export async function signUpAction(formdata: FormData) {
  const name = formdata.get('name') as string
  const email = formdata.get('email') as string
  const password = formdata.get('password') as string

  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  })

  redirect('/')
}

export async function signInAction(formdata: FormData) {
  const email = formdata.get('email') as string
  const password = formdata.get('password') as string

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  })

  redirect('/')
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  })

  redirect('/')
}

