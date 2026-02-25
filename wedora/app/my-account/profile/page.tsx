"use client"

import { useEffect, useMemo, useState } from "react"

import { supabase } from "@/lib/supabase"
import { PersonalInformationCard, type ProfileForm } from "../_components/profile/personal-information-card"
import { ProfileSummaryCard, type ProfileSummary } from "../_components/profile/profile-summary-card"

function safeString(v: unknown) {
  return typeof v === "string" ? v : ""
}

function toInputDate(v: string) {
  if (!v) return ""
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return ""
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [memberSinceLabel, setMemberSinceLabel] = useState("—")
  const [roleLabel, setRoleLabel] = useState("Bride")

  const [initialForm, setInitialForm] = useState<ProfileForm>({
    fullName: "",
    partnerName: "",
    email: "",
    phone: "",
    location: "",
    weddingDate: "",
    aboutUs: "",
  })

  const [form, setForm] = useState<ProfileForm>(initialForm)

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const md = (user?.user_metadata ?? {}) as Record<string, unknown>
      if (user?.created_at) {
        const d = new Date(user.created_at)
        setMemberSinceLabel(
          Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("en-US", { month: "long", year: "numeric" })
        )
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, partner_name, phone, location, wedding_date, about_us, is_bride")
        .eq("id", user.id)
        .maybeSingle()

      const profileIsBride = typeof (profile as any)?.is_bride === "boolean" ? (profile as any).is_bride : undefined
      const resolvedRole =
        profileIsBride !== undefined
          ? profileIsBride
            ? "Bride"
            : "Groom"
          : safeString(md.role) || "Bride"
      setRoleLabel(resolvedRole)

      const next: ProfileForm = {
        fullName:
          safeString((profile as any)?.full_name) ||
          safeString(md.full_name) ||
          safeString(md.name) ||
          safeString(user?.email)?.split("@")[0] ||
          "My Profile",
        partnerName: safeString((profile as any)?.partner_name) || safeString(md.partner_name),
        email: safeString(user?.email),
        phone: safeString((profile as any)?.phone) || safeString(md.phone) || safeString((user as any)?.phone),
        location: safeString((profile as any)?.location) || safeString(md.location),
        weddingDate: toInputDate(
          safeString((profile as any)?.wedding_date) || safeString(md.wedding_date)
        ),
        aboutUs:
          safeString((profile as any)?.about_us) ||
          safeString(md.about_us) ||
          "Planning our dream wedding together. We love outdoor venues with rustic charm and elegant details.",
      }

      setInitialForm(next)
      setForm(next)
      setLoading(false)
    }

    load().catch(() => {
      setLoading(false)
      setError("Failed to load profile.")
    })
  }, [])

  const summary = useMemo<ProfileSummary>(() => {
    return {
      fullName: form.fullName || "My Profile",
      roleLabel,
      bio: form.aboutUs,
      email: form.email || "—",
      phone: form.phone || "—",
      location: form.location || "—",
      memberSinceLabel,
    }
  }, [form, memberSinceLabel, roleLabel])

  const onChange = (key: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onStartEdit = () => {
    setError(null)
    setIsEditing(true)
  }

  const onCancelEdit = () => {
    setError(null)
    setForm(initialForm)
    setIsEditing(false)
  }

  const onSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) throw userError ?? new Error("No user")

      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            full_name: form.fullName || null,
            partner_name: form.partnerName || null,
            phone: form.phone || null,
            location: form.location || null,
            wedding_date: form.weddingDate || null,
            about_us: form.aboutUs || null,
            is_bride: roleLabel.toLowerCase() !== "groom",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        )

      if (upsertError) throw upsertError

      setInitialForm(form)
      setIsEditing(false)
    } catch {
      setError("Saving failed. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const onChangeRole = async (role: "bride" | "groom") => {
    const label = role === "groom" ? "Groom" : "Bride"
    setRoleLabel(label)
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) throw userError ?? new Error("No user")

      await Promise.all([
        supabase.auth.updateUser({ data: { role: label } }),
        supabase
          .from("profiles")
          .upsert(
            {
              id: user.id,
              is_bride: role !== "groom",
            },
            { onConflict: "id" }
          ),
      ])
    } catch (error) {
      console.error("Failed to update role", error)
    }
  }

  if (loading) {
    return (
      <div className="bg-zinc-50 dark:bg-black min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="h-7 w-56 rounded-lg bg-zinc-200 dark:bg-white/10" />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            <div className="h-[460px] rounded-2xl bg-white dark:bg-[#111111] border border-[#E0E0E0] dark:border-[#2D2D2D]" />
            <div className="h-[460px] rounded-2xl bg-white dark:bg-[#111111] border border-[#E0E0E0] dark:border-[#2D2D2D]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          <ProfileSummaryCard summary={summary} onChangeRole={onChangeRole} />
          <PersonalInformationCard
            isEditing={isEditing}
            form={form}
            saving={saving}
            error={error}
            onStartEdit={onStartEdit}
            onCancelEdit={onCancelEdit}
            onSave={onSave}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}