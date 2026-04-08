export const COOKIE_NAME = 'bd_admin_token'
const SECRET = 'bendaoud_haute_joaillerie_2024'

export function createToken(): string {
  return Buffer.from(`yuba:${SECRET}`).toString('base64')
}

export function verifyToken(token: string): boolean {
  return token === createToken()
}

export const ADMIN_USER = 'yuba'
export const ADMIN_PASS = 'yousradaoud'
