export function CtaSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-[#FF69B4] to-[#FFB6C1] rounded-2xl p-12 text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Planning?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy couples who planned their perfect day with Wedora
          </p>
          <a href="/wedding-service">
            <button className="px-10 py-4 bg-white text-[#FF69B4] rounded-lg hover:bg-gray-50 transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform cursor-pointer">
                Get Started Free
            </button>
          </a>
          <p className="text-white/80 text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-white font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
