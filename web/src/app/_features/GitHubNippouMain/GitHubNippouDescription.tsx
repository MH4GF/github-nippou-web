import 'server-only'
import Link from 'next/link'

export const GitHubNippouDescription = () => {
  return (
    <div className="mx-auto max-w-7xl sm:p-6 lg:px-8">
      <h3 className="text-xl font-bold">How to use github-nippou?</h3>
      <p>
        Print today&apos;s your GitHub activity for issues and pull requests.
        <br />
        This is a helpful when you write a daily report in reference to GitHub. &quot;Nippou&quot;
        is a japanese word which means a daily report.
        <br />
        wao!
        This site is based on{' '}
        <Link
          href="https://github.com/masutaka/github-nippou"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          github-nippou
        </Link>
        , a CLI tool created by{' '}
        <Link
          href="https://twitter.com/masutaka"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          @masutaka
        </Link>
        .
      </p>
    </div>
  )
}
