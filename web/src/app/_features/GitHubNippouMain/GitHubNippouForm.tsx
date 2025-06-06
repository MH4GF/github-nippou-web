import type { FC, FormEventHandler } from 'react'

import { DateInput } from './DateInput'
import { GistIdInput } from './GistIdInput'
import { SubmitButton } from './SubmitButton'

interface Props {
  formAction: FormEventHandler<HTMLFormElement>
  isLoading: boolean
}

export const GitHubNippouForm: FC<Props> = ({ formAction, isLoading }) => {
  return (
    <form onSubmit={formAction} className="grid gap-4">
      <details>
        <summary>Advanced Settings</summary>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <DateInput name="sinceDate" label="Since Date" />
            <DateInput name="untilDate" label="Until Date" />
          </div>
          <GistIdInput />
        </div>
      </details>
      <div>
        <SubmitButton isLoading={isLoading} />
      </div>
    </form>
  )
}
