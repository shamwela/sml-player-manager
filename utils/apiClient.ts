import axios from 'redaxios'

export const apiClient = axios.create({
  baseURL: 'https://api.balldontlie.io',
  headers: {
    // Next.js environment variables must use the NEXT_PUBLIC_ prefix for client-side access
    Authorization: process.env.NEXT_PUBLIC_BALL_DONT_LIE_API_KEY || '',
  },
})
