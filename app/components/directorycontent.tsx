import Link from "next/link"

const LINKS = [
  {
    path: "/cleffa",
    title: "CLEFFA",
    description: "Custom Limited Esports for Friendly Amateurs is a single screen esports experience for your silly Pokémon draft event.",
  },
  // {
  //   path: "/favorite-pokemon",
  //   title: "Your Favorite Pokémon",
  //   description: "You will be shown two Pokémon. Choose your favorite between the two. Then do it again and again and again.",
  // },
  {
    path: "https://www.twitch.tv/yooridotspace",
    title: "Twitch",
    description: "Sometimes I will stream video games here.",
  },
  {
    path: "https://moxfield.com/users/crystallily",
    title: "Moxfield",
    description: "Here are many of the Magic: The Gathering decks I play.",
  }
]

export function DirectoryContent() {
  return (
    <div className="w-dvw h-dvh flex flex-col items-center overflow-auto">
      <main className="flex-1 flex flex-col w-full max-w-3xl py-16">
        <ul className="flex-1 flex flex-col gap-3">
          <h1 className="uppercase font-black text-5xl">yoori&apos;s space for dumb ideas</h1>
          <div className="pl-8 text-lg">
            <p>Thank you for visiting my personal internet space! </p>
            <p>You are visitor number <span className="text-sm font-mono hover:uppercase">{"{"}undefined{"}"}</span>.</p>
            <p>Please choose from the following options:</p>
          
          </div>
          {LINKS.map((idea, index) => (
            <li key={index}>
              <div className="flex flex-col gap-1">
                <Link
                  className="p-1 hover:px-4 text-2xl font-mono hover:bg-neutral-800 hover:uppercase hover:text-brand transition-all"
                  href={idea.path}
                  target={idea.path.startsWith("/") ? undefined : "_blank"}
                >
                  {(idea.path.startsWith("/") ? idea.path : `^${idea.title}`).toLowerCase()}
                </Link>
                <h4 className="pl-4 text-2xl font-bold">{idea.title}</h4>
                <p className="pl-4">{idea.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className="flex gap-2 p-4 justify-center font-mono text-lg">
        <Link
          className="hover:uppercase hover:text-brand transition-all"
          href="/"
        >
          home
        </Link>
      </footer>
    </div>
  )
}