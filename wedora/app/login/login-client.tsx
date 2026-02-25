"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export default function LoginClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const redirectTo = searchParams.get("redirect") || "/"

  const [mode, setMode] = useState<"login" | "register">("login")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  /* ---------------- LOGIN ---------------- */

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    setInfo(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.replace(redirectTo)
    }

    setLoading(false)
  }

  /* ---------------- REGISTER ---------------- */

  const handleRegister = async () => {
    setLoading(true)
    setError(null)
    setInfo(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Uspješna registracija
    setInfo("Account created!")
    setMode("login")
    setPassword("")
    setConfirmPassword("")
    setLoading(false)
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          {mode === "login" ? "Login" : "Create Account"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded border dark:bg-zinc-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {mode === "register" && (
           <p className="text-xs text-gray-500 dark:text-gray-400 py-1">Minimum 6 characters</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 rounded border dark:bg-zinc-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "register" && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-4 p-3 rounded border dark:bg-zinc-800"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {info && (
          <p className="text-green-600 text-sm mb-3">{info}</p>
        )}

        {mode === "login" ? (
          <>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-pink-500 text-white py-3 rounded mb-3 hover:bg-pink-600"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 py-1">You don't have an account yet?</p>
            <button
              onClick={() => {
                setMode("register")
                setError(null)
                setInfo(null)
              }}
              className="w-full border py-3 rounded"
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-pink-500 text-white py-3 rounded mb-3 hover:bg-pink-600"
            >
              {loading ? "Creating..." : "Register"}
            </button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 py-1">Already have an account?</p>
            <button
              onClick={() => {
                setMode("login")
                setError(null)
                setInfo(null)
              }}
              className="w-full border py-3 rounded"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  )
}