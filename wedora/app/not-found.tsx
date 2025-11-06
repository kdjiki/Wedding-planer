"use client";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center text-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    404
                </h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
                    Sorry, the page you’re looking for doesn’t exist or has been moved.
                </p>
            </main>
    </div>
  );
}