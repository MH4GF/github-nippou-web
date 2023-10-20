'use server'

import { object, parse, string } from 'valibot'

import { getServerSession } from './_auth/getServerSession'

const responseSchema = object({
  result: string(),
})

export const showList = async (_prevState: unknown, formData: FormData) => {
  const session = await getServerSession()
  const user = session?.user.login
  const token = session?.user.accessToken
  const settingsGistId = formData.get('settingsGistId')
  if (user === undefined || token === undefined || typeof settingsGistId !== 'string') {
    return { result: 'error' }
  }

  const url = new URL(process.env.API_URL)
  url.searchParams.set('user', user)
  url.searchParams.set('token', token)
  url.searchParams.set('settings_gist_id', settingsGistId)
  const response = await fetch(url)
  // TODO: handle errors
  const { result } = parse(responseSchema, await response.json())
  return { result }
}
