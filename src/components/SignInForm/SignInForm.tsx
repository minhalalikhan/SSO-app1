"use client"
import { signIn, } from 'next-auth/react'
import React, { ChangeEvent, useState } from 'react'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import * as yup from 'yup'



type Props = {}

const Schema = yup.object().shape({
    email: yup.string().min(6, 'min email length is 6 characters').required(),
    password: yup.string().min(6, 'min pass length is 6 characters').required()
})

function SignInForm({ }: Props) {




    const [Cred, setCred] = useState({
        email: '',
        password: ''
    })
    const [Err, setError] = useState<string>('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCred({ ...Cred, [e.target.name]: e.target.value })
    }

    async function SubmitSignIn() {
        try {

            // validate will trhow error if validation fails
            await Schema.validate(Cred, { abortEarly: true })

            const res = await signIn('credentials',
                { email: Cred.email, password: Cred.password, redirect: false })


            console.log(res)
            if (!res) {
                setError('Unexpected Error')
            }
            else {
                if (res.error)
                    setError(res.error)
                else setError('')
            }

        } catch (err: any) {
            if (err?.name === 'ValidationError') {
                setError(err.message); // Set validation error message
            }

            else
                setError('Unexpected Error Happended')
        }
    }




    return (
        <div className='max-w-[90vw] w-[500px] h-fit max-h-[80vh] 
        rounded border-2 border-gray-300 p-5 flex flex-col gap-10'>
            <h3 className='font-semibold text-center'>Sign In</h3>
            <div className=' flex flex-col gap-5'>

                <Input type='email' placeholder='Email' value={ Cred.email } name='email'
                    onChange={ handleChange }
                />
                <Input type='password' placeholder='Password' value={ Cred.password }
                    name='password' onChange={ handleChange }
                />
            </div>
            { Boolean(Err) && <p className='bg-red-200 text-red-600 px-2 py-1 rounded-sm'>{ Err }</p> }
            <Button className='cursor-pointer' onClick={ SubmitSignIn } >
                Sign In
            </Button>

        </div>
    )
}

export default SignInForm