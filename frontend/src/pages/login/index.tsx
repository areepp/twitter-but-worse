import GoogleIcon from '@/components/Icons/GoogleIcon'
import TwitterIcon from '@/components/Icons/TwitterIcon'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Inputs } from '../signup'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(Inputs) })

  const [passwordInputType, setPasswordInputType] = useState<
    'text' | 'password'
  >('password')

  const signInWithEmailAndPassword: SubmitHandler<Inputs> = (data) =>
    console.log(data)

  const signInWithGoogle = () => {
    window.open('http://localhost:8000/auth/google', '_self')
  }

  const togglePasswordInputType = () =>
    setPasswordInputType((prev) => (prev === 'password' ? 'text' : 'password'))

  return (
    <main className="grid h-screen w-full lg:grid-cols-[1fr,45vw]">
      <div className="relative hidden lg:block">
        <Image
          className="object-cover"
          src="/twitter-banner.png"
          alt="twitter auth image"
          fill
        />
      </div>

      <div className="mx-auto flex h-full flex-col items-center justify-between p-6 lg:mx-0 lg:items-start lg:py-32">
        <TwitterIcon className="lg:h-12 lg:w-12 lg:self-start" />
        <h1 className="max-w-sm text-3xl font-bold lg:max-w-xl lg:text-4xl">
          See what's happening in the world right now.
        </h1>
        <div className="flex w-full max-w-sm flex-col items-center justify-center gap-3">
          <button
            className="flex w-full items-center justify-center gap-3 rounded-full border py-2 px-6 font-semibold"
            onClick={signInWithGoogle}
          >
            <GoogleIcon /> <span>Sign in with Google</span>
          </button>
          <div className="grid w-full grid-cols-[1fr,auto,1fr] items-center gap-2">
            <span className="border-b" />
            <span>or</span>
            <span className="border-b" />
          </div>
          <form
            onSubmit={handleSubmit(signInWithEmailAndPassword)}
            className="flex w-full flex-col gap-3"
          >
            <fieldset className="flex flex-col gap-1">
              <input
                className="rounded-lg border py-3 px-2 focus:outline-primary-blue"
                type="text"
                placeholder="email"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-xs">{errors.email.message}</span>
              )}
            </fieldset>
            <fieldset className="relative flex flex-col gap-1">
              <input
                className="rounded-lg border py-3 px-2 focus:outline-primary-blue"
                type={passwordInputType}
                placeholder="password"
                {...register('password')}
              />
              {passwordInputType === 'password' ? (
                <EyeIcon
                  className="absolute top-4 right-4 h-5 w-5 hover:cursor-pointer"
                  onClick={togglePasswordInputType}
                />
              ) : (
                <EyeSlashIcon
                  className="absolute top-4 right-4 h-5 w-5 hover:cursor-pointer"
                  onClick={togglePasswordInputType}
                />
              )}
              {errors.password && (
                <span className="text-xs">{errors.password.message}</span>
              )}
            </fieldset>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-full border bg-gray-900 py-2 px-6 font-semibold text-white"
            >
              Log in
            </button>
          </form>
          <p className="self-start">
            Don't have an account?{' '}
            <Link className="text-primary-blue" href="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login
