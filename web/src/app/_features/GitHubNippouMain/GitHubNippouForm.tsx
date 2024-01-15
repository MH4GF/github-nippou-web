import type { FC } from 'react'

import { DateInput } from './DateInput'
import { GistIdInput } from './GistIdInput'
import { SubmitButton } from './SubmitButton'

interface Props {
  formAction: (formData: FormData) => void
}

export const GitHubNippouForm: FC<Props> = ({ formAction }) => {
  return (
    <form action={formAction} className="grid gap-2">
      <details>
        <summary>Advanced Settings</summary>
        <DateInput name='sinceDate' label='Since date' />
        <DateInput name='untilDate' label='Until date' />
        <GistIdInput />
      </details>
      <div>
        <SubmitButton />
      </div>
    </form>
  )
}
