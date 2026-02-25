"use client"

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react"
import { Image as ImageIcon, Plus, Trash2, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase"

type GuideArticleRow = {
  id: string
  tag: string
  category: string
  title: string
  description: string
  image: string
}

type Tab = "my-posts" | "new-post"

export function MyPostsPanel() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>("my-posts")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [posts, setPosts] = useState<GuideArticleRow[]>([])
  const [error, setError] = useState<string | null>(null)

  const [tag, setTag] = useState("Guide")
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  const router = useRouter()
  const pathname = usePathname()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const resetForm = () => {
    setTag("Guide")
    setCategory("")
    setTitle("")
    setDescription("")
    setImage("")
  }

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) throw userError
      if (!user) {
        setPosts([])
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("guide_articles")
        .select("id, tag, category, title, description, image, user_id")
        .eq("user_id", user.id)
        .order("id", { ascending: false })

      if (error) throw error
      setPosts((data ?? []) as GuideArticleRow[])
    } catch {
      setError("Unable to load your posts right now.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      void fetchPosts()
    }
  }, [open])

  const openPanel = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    setSaving(true)
    setError(null)
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) throw userError ?? new Error("No user")

      const { error } = await supabase
        .from("guide_articles")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id)

      if (error) throw error

      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch {
      setError("Failed to delete post.")
    } finally {
      setSaving(false)
    }
  }

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")

  const handlePublish = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.")
      return
    }

    setSaving(true)
    setError(null)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) throw userError ?? new Error("No user")

      let coverUrl = image

      // Ako je odabrana lokalna slika, uploadaj je u Supabase Storage
      if (!coverUrl && fileInputRef.current && fileInputRef.current.files?.[0]) {
        const file = fileInputRef.current.files[0]
        const filePath = `${user.id}/${Date.now()}-${file.name}`
        const { data: uploaded, error: uploadError } = await supabase.storage
          .from("guide-covers")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          })
        if (uploadError || !uploaded) throw uploadError ?? new Error("Upload failed")
        const { data: publicUrl } = supabase.storage.from("guide-covers").getPublicUrl(uploaded.path)
        coverUrl = publicUrl.publicUrl
      }

      const baseId = slugify(title)
      const uniqueId = `${baseId}-${Date.now()}`

      const { data, error } = await supabase
        .from("guide_articles")
        .insert({
          id: uniqueId,
          tag,
          category: category || "Guides & Tips",
          title,
          description,
          image:
            coverUrl ||
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
          user_id: user.id,
        })
        .select("id, tag, category, title, description, image, user_id")
        .single()

      if (error) throw error

      setPosts((prev) => [data as GuideArticleRow, ...prev])
      resetForm()
      setTab("my-posts")
      router.refresh()
    } catch {
      setError("Failed to publish post.")
    } finally {
      setSaving(false)
    }
  }

  const hasPosts = useMemo(() => posts.length > 0, [posts.length])

  return (
    <>
      {/* Floating Add Post button */}
      <button
        type="button"
        onClick={openPanel}
        className="fixed bottom-8 right-1/2 translate-x-1/2 sm:right-10 sm:translate-x-0 z-40 inline-flex items-center gap-2 rounded-full bg-[#FF69B4] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#FF1493] transition-colors"
      >
        <Plus size={18} />
        Add Post
      </button>

      {/* Side panel — darkened overlay, wider panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0"
          />
          <div className="relative h-full w-full max-w-2xl bg-white dark:bg-[#111111] shadow-2xl border-l-2 border-[#E0E0E0] dark:border-[#2D2D2D] flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b-2 border-[#E0E0E0] dark:border-[#2D2D2D]">
              <div>
                <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-white">
                  My Posts
                </h2>
                <p className="text-sm text-[#666666] dark:text-[#B0B0B0] mt-0.5">
                  Create new posts or manage existing ones.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 cursor-pointer border-2 border-transparent hover:border-[#E0E0E0] dark:hover:border-[#2D2D2D]"
              >
                <X size={20} className="text-[#666666] dark:text-[#B0B0B0]" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-5">
              <div className="inline-flex rounded-full bg-zinc-100 dark:bg-[#1E1E1E] p-1.5 border-2 border-[#E8E8E8] dark:border-[#252525]">
                <button
                  type="button"
                  onClick={() => setTab("my-posts")}
                  className={`px-5 py-2 text-sm font-semibold rounded-full cursor-pointer transition-colors ${
                    tab === "my-posts"
                      ? "bg-white dark:bg-[#111111] text-[#FF69B4] shadow border border-[#E0E0E0] dark:border-[#2D2D2D]"
                      : "text-[#666666] dark:text-[#B0B0B0]"
                  }`}
                >
                  My Posts
                </button>
                <button
                  type="button"
                  onClick={() => setTab("new-post")}
                  className={`px-5 py-2 text-sm font-semibold rounded-full cursor-pointer transition-colors ${
                    tab === "new-post"
                      ? "bg-white dark:bg-[#111111] text-[#FF69B4] shadow border border-[#E0E0E0] dark:border-[#2D2D2D]"
                      : "text-[#666666] dark:text-[#B0B0B0]"
                  }`}
                >
                  + New Post
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {error && (
                <p className="rounded-xl border-2 border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              )}

              {tab === "my-posts" ? (
                <>
                  {loading ? (
                    <p className="text-sm text-[#666666] dark:text-[#B0B0B0]">
                      Loading your posts...
                    </p>
                  ) : !hasPosts ? (
                    <p className="text-sm text-[#666666] dark:text-[#B0B0B0]">
                      You haven&apos;t published any posts yet.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {posts.map((post) => (
                        <li
                          key={post.id}
                          className="flex items-start justify-between gap-3 rounded-xl border-2 border-[#E0E0E0] dark:border-[#2D2D2D] px-4 py-4 bg-zinc-50/50 dark:bg-white/[0.02]"
                        >
                          <div>
                            <p className="text-xs uppercase tracking-wide text-[#FF69B4] mb-1 font-semibold">
                              {post.category}
                            </p>
                            <p className="text-sm font-semibold text-[#1A1A1A] dark:text-white line-clamp-2">
                              {post.title}
                            </p>
                            <p className="mt-1 text-sm text-[#666666] dark:text-[#B0B0B0] line-clamp-2">
                              {post.description}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDelete(post.id)}
                            disabled={saving}
                            className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer disabled:opacity-60 border-2 border-transparent hover:border-red-200"
                            aria-label="Delete post"
                          >
                            <Trash2
                              size={18}
                              className="text-red-500 hover:text-red-600"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <>
                  {/* New post form — thicker borders, larger touch targets */}
                  <div className="space-y-5 text-sm">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block mb-2 font-semibold text-[#1A1A1A] dark:text-[#E0E0E0]">
                          Tag
                        </label>
                        <select
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          className="w-full rounded-xl border-2 border-[#E0E0E0] dark:border-[#2D2D2D] bg-white dark:bg-[#111111] px-4 py-3 text-sm outline-none focus:border-[#FF69B4] focus:ring-2 focus:ring-[#FF69B4]/20"
                        >
                          <option value="Guide">Guide</option>
                          <option value="Tips">Tips</option>
                          <option value="Trending">Trending</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block mb-2 font-semibold text-[#1A1A1A] dark:text-[#E0E0E0]">
                          Category
                        </label>
                        <input
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="e.g. Planning Tips"
                          className="w-full rounded-xl border-2 border-[#E0E0E0] dark:border-[#2D2D2D] bg-white dark:bg-[#111111] px-4 py-3 text-sm outline-none focus:border-[#FF69B4] focus:ring-2 focus:ring-[#FF69B4]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 font-semibold text-[#1A1A1A] dark:text-[#E0E0E0]">
                        Title
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Write a clear, catchy title"
                        className="w-full rounded-xl border-2 border-[#E0E0E0] dark:border-[#2D2D2D] bg-white dark:bg-[#111111] px-4 py-3 text-sm outline-none focus:border-[#FF69B4] focus:ring-2 focus:ring-[#FF69B4]/20"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-semibold text-[#1A1A1A] dark:text-[#E0E0E0]">
                        Short description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        placeholder="Summarise your guide in a few sentences."
                        className="w-full rounded-xl border-2 border-[#E0E0E0] dark:border-[#2D2D2D] bg-white dark:bg-[#111111] px-4 py-3 text-sm outline-none focus:border-[#FF69B4] focus:ring-2 focus:ring-[#FF69B4]/20 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-semibold text-[#1A1A1A] dark:text-[#E0E0E0]">
                        Cover image
                      </label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full rounded-2xl border-2 border-dashed border-[#FFB6C1] dark:border-[#FF69B4]/50 bg-[#FFF5F8] dark:bg-[#FF69B4]/5 px-6 py-8 text-center text-sm text-[#FF69B4] cursor-pointer hover:bg-[#FFE3EF] dark:hover:bg-[#FF69B4]/10 transition-colors"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon size={28} className="text-[#FF69B4]" />
                          <p className="font-semibold">
                            Click to upload
                          </p>
                          <p className="text-xs text-[#FF99C2] dark:text-[#FF69B4]/80">
                            PNG, JPG or WebP (max ~5MB)
                          </p>
                          {fileInputRef.current?.files?.[0] ? (
                            <p className="text-xs font-medium text-[#FF69B4] mt-1">
                              {fileInputRef.current.files[0].name}
                            </p>
                          ) : (
                            <p className="text-xs text-[#FF99C2] dark:text-[#FF69B4]/70 mt-1">
                              No file selected yet
                            </p>
                          )}
                        </div>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setImage("")
                          if (!e.target.files || e.target.files.length === 0) return
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer buttons */}
            {tab === "new-post" && (
              <div className="border-t-2 border-[#E0E0E0] dark:border-[#2D2D2D] px-6 py-5 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="rounded-xl border-2 border-[#E0E0E0] dark:border-[#2D2D2D] px-5 py-2.5 text-sm font-semibold text-[#666666] dark:text-[#B0B0B0] hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer disabled:opacity-60"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={saving}
                  className="rounded-xl bg-[#FF69B4] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#FF1493] cursor-pointer disabled:opacity-60 shadow-lg shadow-[#FF69B4]/25"
                >
                  Publish Post
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

