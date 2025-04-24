import { Footer } from './_components'
import { GitHubNippouDescription, GitHubNippouMain } from './_features/GitHubNippouMain'
import { Header } from './_features/Header/Header'

function Home() {
  return (
    <div className="min-h-full">
      <Header />
      <GitHubNippouMain />
      <GitHubNippouDescription />
      <Footer />
    </div>
  )
}

// biome-ignore lint/style/noDefaultExport: Next.js requires default export for pages
export default function Page() {
  return <Home />
}
