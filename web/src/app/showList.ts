'use server'

import { getServerSession } from './_auth/getServerSession'

export const showList = async (_prevState: any, formData: FormData) => {
  const session = await getServerSession()
  const user = session?.user.login
  const token = session?.user.accessToken
  const settingGistId = formData.get('settingGistId')
  if (user === undefined || token === undefined || typeof settingGistId !== 'string') {
    return { result: 'error' }
  }

  const url = new URL(process.env.API_URL)
  url.searchParams.set('user', user)
  url.searchParams.set('token', token)
  url.searchParams.set('setting_gist_id', settingGistId)
  const response = await fetch(url)
  const json = await response.json()
  return { result: json.result }
}
