import { useLocalStorageState } from 'ahooks'
import Link from 'next/link'

import { Label } from '../../_components'

export const GistIdInput = () => {
  const [gistId, setGistId] = useLocalStorageState<string | undefined>('gistId', {
    defaultValue: '',
  })

  return (
    <div>
      <Label htmlFor="settingsGistId">
        Settings Gist ID(for customizing output format).{' '}
        <Link
          href="https://github.com/masutaka/github-nippou#optional-customize-output-format"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Read more
        </Link>
      </Label>
      <div className="mt-2">
        <input
          name="settingsGistId"
          id="settingsGistId"
          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          defaultValue={gistId}
          onChange={(e) => setGistId(e.target.value)}
        />
      </div>
    </div>
  )
}
