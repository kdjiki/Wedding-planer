import Link from "next/link"

type Post = {
  id: number
  title: string
  body: string
}

export default async function Ideas() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    { cache: "no-store" } // server-side
  )

  const posts: Post[] = await res.json()

  const ideas = posts.slice(30, 40) // simulacija kategorije

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Ideas page</h1>

      <div className="space-y-6">
        {ideas.map((post) => (
          <Link
            key={post.id}
            href={`/inspiration/ideas/${post.id}`}
            className="block p-6 border rounded-lg hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 line-clamp-2">
              {post.body}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
