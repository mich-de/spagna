import { Suspense } from 'react'
import LoginPageClient from './LoginPageClient'

export const dynamic = 'force-dynamic'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  return (
    <Suspense>
      <LoginPageClient searchParams={params} />
    </Suspense>
  )
}
