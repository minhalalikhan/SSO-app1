"use client"
import SignInForm from "@/components/SignInForm/SignInForm";
import SignInSkeleton from "@/components/SignInForm/SignInSkeleton";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

import React, { ReactNode, Suspense } from 'react'



export default function Home() {

  const { data, status } = useSession()

  async function signout() {
    await signOut()
  }

  async function SSOlogin() {
    console.log('calling auth store login')
    const authURL = process.env.NEXT_PUBLIC_AUTHSTORE_URL
    const appID = process.env.NEXT_PUBLIC_CLIENT_ID
    const nexturl = process.env.NEXT_PUBLIC_CALLBACK_URL

    console.log(' sso url', `${authURL}?appid=${appID}&next=${nexturl}`)
    window.open(`${authURL}?appid=${appID}&next=${nexturl}`, '_self')


  }

  if (status === 'authenticated')
    return (
      <Container >

        <div className='w-[500px] flex flex-col gap-4 items-center p-5'>
          <h3 className=' text-gray-600'>Signed In As</h3>
          <p className='font-extrabold'>  { data.user?.email }</p>
          <Button onClick={ signout } className='cursor-pointer mt-5'>
            Sign Out
          </Button>
        </div>
      </Container>
    )

  if (status === "loading")
    return <SignInSkeleton />

  if (status === "unauthenticated")
    return (
      <Container>
        <Suspense fallback={ <SignInSkeleton /> }>

          <div className="w-full h-full flex items-center p-4 flex-col gap-2.5">

            <div className="flex-1 flex items-center flex-col gap-3">

              <SignInForm />
              <Button onClick={ SSOlogin }>
                Sign in with AuthStore
              </Button>
            </div>
          </div>
        </Suspense>
      </Container>
    );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full  flex-1 flex justify-center">
      { children }
    </div>
  )
}