
import Link from "next/link"
import { Background } from "@/components/background"
import { Logo } from "@/components/logo"

export function MainContent() {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center overflow-auto">
      <div className="h-full flex flex-col w-full max-w-lg">
        <header className="flex flex-col p-4 items-center justify-center font-mono">
          <p>welcome to the <em>new</em></p>
          <p>yoori dot space</p>
          <p>internet experience</p>
        </header>
        <main className="flex-1 flex items-center justify-center portrait:px-8">
          <Logo />
        </main>
        <footer className="flex gap-2 p-4 justify-center font-mono text-lg">
          <Link
            className="hover:uppercase hover:text-brand transition-all"
            href="https://hello.yoori.space"
          >
            blog
          </Link>
          <span>&bull;</span>
          <Link
            className="hover:uppercase hover:text-brand transition-all"
            href="https://bsky.app/profile/yoori.space"
          >
            bsky
          </Link>
        </footer>
      </div>
      <Background />
    </div>
  )
}