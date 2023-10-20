import { useLocalStorageState } from 'ahooks'

export const GistIdInput = () => {
  const [gistId, setGistId] = useLocalStorageState<string | undefined>('gistId', {
    defaultValue: '',
  })

  return (
    <div>
      <label htmlFor="settingsGistId" className="block text-sm font-medium leading-6 text-gray-900">
        Settings Gist ID(for customizing output format)
      </label>
      <div className="mt-2">
        <input
          name="settingsGistId"
          id="settingsGistId"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          defaultValue={gistId}
          onChange={(e) => setGistId(e.target.value)}
        />
      </div>
    </div>
  )
}
