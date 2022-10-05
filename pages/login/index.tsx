import Head from "next/head"
import Image from "next/image"
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from "../../hooks/useAuth"

interface Inputs {
    email: string
    password: string
}
/* TODO - Form validation */
function Login() {
    const [ login, setLogin ] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const { signIn, signUp, error, loading } = useAuth();

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        //console.log(data)
        if(login) {
            await signIn(email, password)
        }else {
            await signUp(email, password)
        }
    }

    return (
        <div className="relative flex h-screen w-full items-center justify-center">
            <Head>
                <title>Netflix Clone</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Image src="https://rb.gy/p2hphi" layout="fill" className="-z-10 opacity-60 sm:inline" objectFit="cover" />

            <img src="https://rb.gy/ulxxee" className='absolute top-4 left-4 object-contain' width={100} height={100} alt="" />

            <form onSubmit={handleSubmit(onSubmit)} className="relative max-w-[400px] w-[90%] py-10 px-6 space-y-8 rounded bg-black/75">
                <h1 className="text-4xl font-semibold">Sign in</h1>
                <div className="space-y-4 ml-0">
                    {
                    error && 
                    <div className="inline-block w-full text-red-500 text-[13px] font-light p-1">
                        {error}
                    </div>
                    }
                    <label htmlFor="" className="inline-block w-full ml-0">
                        <input type="email" placeholder="Email" className="input" {...register('email', {required: true})} />
                        {errors.email && <p className="text-orange-500 text-[13px] font-light p-1">Please enter a valid email</p>}
                    </label>
                    <label htmlFor="" className="inline-block w-full ml-0">
                        <input type="password" placeholder="Password" className="input" {...register('password', {required: true})} />
                        {errors.email && <p className="text-orange-500 text-[13px] font-light p-1">Your password must contain between 4 and 50 characters</p>}
                    </label>
                </div>
                <button className="w-full rounded bg-[#e50914] py-3 font-semibold" onClick={() => setLogin(true)}>Sign in</button>
                <div className="text-[gray]">
                    New to Netflix?&nbsp;<button className="text-[#fff] hover:underline" onClick={() => setLogin(false)}>Sign up now</button>
                </div>
                {
                    loading && <div className="absolute w-full h-full bg-[rgba(255,255,255, 0.2)] top-0 left-0"></div>
                }
            </form>

        </div>
    )
}

export default Login