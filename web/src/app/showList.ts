'use server'

import { object, parse, regex, safeParse, string } from 'valibot'

import { getServerSession } from './_auth/getServerSession'

const dateRegex = /^\d{4}-\d{2}-\d{2}$/
const noHyphens = (str: string) => str.replace(/-/g, '')

const paramsSchema = object({
  user: string(),
  token: string(),
  settingsGistId: string(),
  sinceDate: string([regex(dateRegex)]),
  untilDate: string([regex(dateRegex)]),
})

const responseSchema = object({
  result: string(),
})

type Result =
  | {
      success: true
      result: string
    }
  | {
      success: false
      error: string
    }

export const showList = async (_prevState: Result, formData: FormData): Promise<Result> => {
  const session = await getServerSession()
  const parsed = safeParse(paramsSchema, {
    user: session?.user.login,
    token: session?.user.accessToken,
    settingsGistId: formData.get('settingsGistId'),
    sinceDate: formData.get('sinceDate'),
    untilDate: formData.get('untilDate'),
  })
  if (!parsed.success) {
    return { success: false, error: 'Invalid credentials' }
  }
  const { user, token, settingsGistId, sinceDate, untilDate } = parsed.output

  const url = new URL(process.env.API_URL)
  url.searchParams.set('user', user)
  url.searchParams.set('token', token)
  url.searchParams.set('settings_gist_id', settingsGistId)
  url.searchParams.set('since_date', noHyphens(sinceDate))
  url.searchParams.set('until_date', noHyphens(untilDate))
  console.log({ url })

  return fetch(url)
    .then(async (res) => {
      if (!res.ok) {
        const body = await res.text()
        throw new Error(body)
      }

      console.log({ res })

      const { result } = parse(responseSchema, await res.json())
      return { success: true, result } as const
    })
    .catch((error: unknown) => {
      console.error(error)
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
      return { success: false, error: 'An unexpected error has occurred' }
    })
}
