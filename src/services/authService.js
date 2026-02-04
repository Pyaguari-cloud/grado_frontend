import api from '../config/api'

const authService = {
  // Registro: SOLO crea usuario y envía código, NO guarda token
  register: async (userData) => {
    const res = await api.post('/auth/register', userData)
    return res.data
  },

  // Verificar email: guarda token y user si todo OK
  verifyEmail: async (email, code) => {
    const res = await api.post('/auth/verify-email', { email, code })
    if (res.data?.success && res.data.data?.token) {
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.data))
    }
    return res.data
  },

  // Reenviar código
  resendCode: async (email) => {
    const res = await api.post('/auth/resend-code', { email })
    return res.data
  },

  // Login normal
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials)
    if (res.data?.success && res.data.data?.token) {
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.data))
    }
    return res.data
  },

  // Olvidé mi contraseña
  forgotPassword: async (email) => {
    const res = await api.post('/auth/forgot-password', { email })
    return res.data
  },

  // Reset contraseña con código
  resetPassword: async ({ email, code, newPassword }) => {
    const res = await api.post('/auth/reset-password', { email, code, newPassword })
    return res.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem('user')
    if (!stored) return null
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
}

export default authService