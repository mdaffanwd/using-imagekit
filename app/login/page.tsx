'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (result?.error) {
            setError(result.error)
        } else {
            router.push('/')
        }
    }

    async function handleSocialLogin(provider: 'google' | 'facebook') {
        await signIn(provider, { callbackUrl: '/' })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back 👋</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="flex items-center justify-center space-x-2">
                    <span className="h-px bg-gray-300 w-1/4"></span>
                    <span className="text-gray-500 text-sm">or continue with</span>
                    <span className="h-px bg-gray-300 w-1/4"></span>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => handleSocialLogin('google')}
                        className="flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <FcGoogle size={20} />
                        <span>Continue with Google</span>
                    </button>
                    <button
                        onClick={() => handleSocialLogin('facebook')}
                        className="flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100 transition text-blue-600"
                    >
                        <FaFacebookF size={20} />
                        <span>Continue with Facebook</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
