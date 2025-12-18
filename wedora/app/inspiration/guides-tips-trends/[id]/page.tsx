import { notFound } from "next/navigation"

type Post = {
  id: number
  title: string
  body: string
  userId: number
}

type User = {
  name: string
  email: string
}

export default async function GuidePost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params
      const postId = Number(id)

if (Number.isNaN(postId)) {
    notFound()
  }

  const postRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { cache: "no-store" }
  )

  if (!postRes.ok) {
    throw new Error("Post not found")
  }

  const post: Post = await postRes.json()

  const userRes = await fetch(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`,
    { cache: "no-store" }
  )

  const user: User = await userRes.json()



  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Written by {user.name}
      </p>

      <p className="text-lg leading-relaxed text-gray-800">
        {post.body}
      </p>
    </article>
  )
}
