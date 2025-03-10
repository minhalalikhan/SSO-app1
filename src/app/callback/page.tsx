"use client"
import { Skeleton } from '@/components/ui/skeleton'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

function page({ }: Props) {

  const searchParams = useSearchParams()
  console.log("isndie callback page")

  const token = searchParams.get('token')

  const { data, status } = useSession()


  async function createToken() {
    console.log('calling create token')
    const res = await signIn('TokenCredentials', { AuthCode: token, redirect: false })

  }

  useEffect(() => {

    if (token && status === 'unauthenticated')
      createToken()
  }, [token, status])

  useEffect(() => {

    if (status === 'authenticated')
      redirect('/')
  }, [token, status])
  return (
    <div className='w-full h-full items-center justify-center flex-col'>

      <Skeleton className='w-[400px]' />
      <Skeleton className='w-[400px]' />
      <Skeleton className='w-[400px]' />
    </div>
  )
}

export default page