import { useLocalStorageState } from 'ahooks'
import Link from 'next/link'

import { Input, Label } from '../../_components'

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
      <div className="mt-1">
        <Input
          name="settingsGistId"
          id="settingsGistId"
          defaultValue={gistId}
          onChange={(e) => setGistId(e.target.value)}
        />
      </div>
    </div>
  )
}
