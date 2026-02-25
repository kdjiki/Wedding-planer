"use client"

import { useId } from "react"
import { Loader2, Pencil } from "lucide-react"

export type ProfileForm = {
  fullName: string
  partnerName: string
  email: string
  phone: string
  location: string
  weddingDate: string
  aboutUs: string
}

function Field({
  label,
  value,
  disabled,
  onChange,
  type = "text",
}: {
  label: string
  value: string
  disabled?: boolean
  onChange?: (v: string) => void
  type?: "text" | "email" | "tel" | "date"
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[#666666] dark:text-[#B0B0B0] mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={[
          "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors",
          disabled
            ? "bg-zinc-50 dark:bg-white/5 border-[#E0E0E0] dark:border-[#2D2D2D] text-[#1A1A1A] dark:text-white"
            : "bg-white dark:bg-[#111111] border-[#E0E0E0] dark:border-[#2D2D2D] focus:border-[#FF69B4]",
          "disabled:cursor-not-allowed",
        ].join(" ")}
      />
    </div>
  )
}

function TextAreaField({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string
  value: string
  disabled?: boolean
  onChange?: (v: string) => void
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[#666666] dark:text-[#B0B0B0] mb-2">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        rows={4}
        className={[
          "w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-colors",
          disabled
            ? "bg-zinc-50 dark:bg-white/5 border-[#E0E0E0] dark:border-[#2D2D2D] text-[#1A1A1A] dark:text-white"
            : "bg-white dark:bg-[#111111] border-[#E0E0E0] dark:border-[#2D2D2D] focus:border-[#FF69B4]",
          "disabled:cursor-not-allowed",
        ].join(" ")}
      />
    </div>
  )
}

export function PersonalInformationCard({
  isEditing,
  form,
  saving,
  error,
  onStartEdit,
  onCancelEdit,
  onSave,
  onChange,
}: {
  isEditing: boolean
  form: ProfileForm
  saving: boolean
  error?: string | null
  onStartEdit: () => void
  onCancelEdit: () => void
  onSave: () => void | Promise<void>
  onChange: (key: keyof ProfileForm, value: string) => void
}) {
  return (
    <section className="bg-white dark:bg-[#111111] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white">Personal Information</h3>
          <p className="mt-1 text-sm text-[#666666] dark:text-[#B0B0B0]">Update your profile details</p>
        </div>

        {!isEditing ? (
          <button
            onClick={onStartEdit}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E0E0E0] dark:border-[#2D2D2D] px-4 py-2 text-sm font-semibold text-[#1A1A1A] dark:text-white hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
          >
            <Pencil size={16} />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onCancelEdit}
              disabled={saving}
              className="rounded-xl border border-[#E0E0E0] dark:border-[#2D2D2D] px-4 py-2 text-sm font-semibold text-[#1A1A1A] dark:text-white hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF69B4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#FF1493] transition-colors disabled:opacity-60"
            >
              {saving ? <Loader2 className="animate-spin" size={16} /> : null}
              Save
            </button>
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Full Name"
          value={form.fullName}
          disabled={!isEditing}
          onChange={(v) => onChange("fullName", v)}
        />
        <Field
          label="Partner Name"
          value={form.partnerName}
          disabled={!isEditing}
          onChange={(v) => onChange("partnerName", v)}
        />
        <Field label="Email" type="email" value={form.email} disabled />
        <Field
          label="Phone"
          type="tel"
          value={form.phone}
          disabled={!isEditing}
          onChange={(v) => onChange("phone", v)}
        />
        <Field
          label="Location"
          value={form.location}
          disabled={!isEditing}
          onChange={(v) => onChange("location", v)}
        />
        <Field
          label="Wedding Date"
          type="date"
          value={form.weddingDate}
          disabled={!isEditing}
          onChange={(v) => onChange("weddingDate", v)}
        />
      </div>

      <div className="mt-4">
        <TextAreaField
          label="About Us"
          value={form.aboutUs}
          disabled={!isEditing}
          onChange={(v) => onChange("aboutUs", v)}
        />
      </div>
    </section>
  )
}

