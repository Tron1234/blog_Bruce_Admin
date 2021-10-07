export const networkConfig = {
  baseURL: process.env.NODE_ENV == 'development' ? '/api' : 'http://81.71.149.135:3000',
  timeout: 5000,
  withCredentials: true
}