import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next'
import { User } from '../types'

declare module 'iron-session' {
  interface IronSessionData extends User { }
}

const sessionOptions = {
  password: process.env.COOKIE_PASSWORD || 'a'.repeat(32),
  cookieName: 'user',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 100
  },
}

export function withSessionRoute (handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr<P extends { [ key: string ]: unknown } = { [ key: string ]: unknown }> (
  handler: ({ req, res }: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions)
}
