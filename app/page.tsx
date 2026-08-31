import { SignInButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()
  if (user) redirect('/dashboard')

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F5F0E8]">

      {/* Subtle top border accent */}
      <div className="h-px w-full bg-sage-600/20" />

      {/* Nav */}
      <header className="flex items-center justify-between px-10 py-6">
        <span className="font-serif text-lg tracking-tight text-ink">ReflectRN</span>
        <SignInButton mode="modal">
          <button className="text-sm font-medium text-ink/50 transition hover:text-ink">
            Sign in
          </button>
        </SignInButton>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">

        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage-600/20 bg-sage-50 px-4 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-sage-600" />
          <span className="text-xs font-medium tracking-wide text-sage-700">
            Built for nurses
          </span>
        </div>

        {/* Headline */}
        <h1 className="max-w-2xl font-serif text-6xl leading-[1.08] tracking-tight text-ink lg:text-7xl">
          Reflect on every
          <br />
          <span className="text-sage-600">procedure you perform</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink/50">
          ReflectRN helps nurses track procedures, log comfort and emotion,
          and understand their growth over time — all in one private space.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <SignInButton mode="modal">
            <button className="rounded-xl bg-sage-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sage-700 hover:shadow-md">
              Start reflecting →
            </button>
          </SignInButton>
          <p className="text-xs text-ink/30">Free to use. No credit card required.</p>
        </div>

        {/* Feature pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {[
            'Procedure logging',
            'Comfort & enjoyment ratings',
            'Emotion tracking',
            'Progress charts',
            'Diagnosis library',
            'Specialty organisation',
          ].map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-black/5 bg-white px-4 py-1.5 text-xs font-medium text-ink/50 shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between px-10 py-6">
        <p className="text-xs text-ink/20">© 2026 ReflectRN</p>
        <p className="text-xs text-ink/20">Reflective practice for nurses</p>
      </footer>

    </div>
  )
}