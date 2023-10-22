'use server'

import { object, parse, safeParse, string } from 'valibot'

import { getServerSession } from './_auth/getServerSession'

const paramsSchema = object({
  user: string(),
  token: string(),
  settingsGistId: string(),
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
  })
  if (!parsed.success) {
    console.error(parsed.issues)
    return { success: false, error: parsed.issues.join('\n') }
  }
  const { user, token, settingsGistId } = parsed.output

  const url = new URL(process.env.API_URL)
  url.searchParams.set('user', user)
  url.searchParams.set('token', token)
  url.searchParams.set('settings_gist_id', settingsGistId)

  return fetch(url)
    .then(async (res) => {
      if (!res.ok) {
        const body = await res.text()
        throw new Error(body)
      }

      const { result } = parse(responseSchema, await res.json())
      return { success: true, result } as const
    })
    .catch((error: unknown) => {
      console.error(error)
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
      return { success: false, error: '予期せぬエラーが発生しました' }
    })
}
