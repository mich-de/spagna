'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash } from 'crypto'

const AUTH_COOKIE = 'sol-auth'
const PASSWORD_HASH = '2beb6b5fe3d7bdf658da84d6ce4252d853f7d4865e025f6b3970e39a3777fd4f'

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  const from = (formData.get('from') as string) || '/'

  const hash = createHash('sha256').update(password).digest('hex')

  if (hash !== PASSWORD_HASH) {
    redirect('/login?error=1&from=' + encodeURIComponent(from))
  }

  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE, PASSWORD_HASH, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  redirect(from)
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE)
  redirect('/login')
}
