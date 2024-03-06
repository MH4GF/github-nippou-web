import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { object, parse, regex, safeParse, string } from 'valibot'

import { getServerSession } from '@/app/_auth/getServerSession'
import type { NippouResult } from '@/app/types'

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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const session = await getServerSession()
  const parsed = safeParse(paramsSchema, {
    user: session?.user.login,
    token: session?.user.accessToken,
    settingsGistId: searchParams.get('settingsGistId'),
    sinceDate: searchParams.get('sinceDate'),
    untilDate: searchParams.get('untilDate'),
  })
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' })
  }
  const { user, token, settingsGistId, sinceDate, untilDate } = parsed.output

  const url = new URL(process.env.API_URL)
  url.searchParams.set('user', user)
  url.searchParams.set('token', token)
  url.searchParams.set('settings_gist_id', settingsGistId)
  url.searchParams.set('since_date', noHyphens(sinceDate))
  url.searchParams.set('until_date', noHyphens(untilDate))

  const result: NippouResult = await fetch(url)
    .then(async (res) => {
      if (!res.ok) {
        const body = await res.text()
        return { success: false, error: body } as const
      }

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

  return NextResponse.json(result)
}
