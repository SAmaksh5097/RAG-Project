import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const UserProfile = () => {
  return (
    <header className="flex items-center justify-between  bg-black px-4 py-3 text-white shadow-lg md:px-6 md:py-4">
      <div className="flex-1" />
      <nav className="flex items-center gap-4">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="rounded-full bg-gradient-to-r from-[#d36135] to-[#bf4e27] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(191,78,39,0.35)]">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="rounded-full border border-[#cdbfae] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1a1a1a]">
              Sign Up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>
    </header>
  )
}

export default UserProfile
