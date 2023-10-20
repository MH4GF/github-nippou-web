import { getServerSession as nextAuthGetServerSession } from 'next-auth'

import { authOptions } from './options'

export async function getServerSession() {
  return nextAuthGetServerSession(authOptions)
}
