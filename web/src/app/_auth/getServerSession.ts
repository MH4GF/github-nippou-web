import { getServerSession as nextAuthGetServerSession } from 'next-auth'

import { authOptions } from './options'

export function getServerSession() {
  return nextAuthGetServerSession(authOptions)
}
