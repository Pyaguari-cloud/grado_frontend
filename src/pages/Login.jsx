import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login(formData)
      // Si tu useAuth.login ya hace navigate internamente, puedes quitar esto
      if (res?.code === 'EMAIL_NOT_VERIFIED') {
        setError('Debes verificar tu correo antes de iniciar sesión.')
        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`)
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      const apiCode = err.response?.data?.code
      const apiMsg = err.response?.data?.message

      if (apiCode === 'EMAIL_NOT_VERIFIED') {
        setError('Debes verificar tu correo antes de iniciar sesión.')
        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`)
      } else {
        setError(apiMsg || 'Credenciales inválidas')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 px-8 py-10"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Iniciar sesión
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Ingresa con tu cuenta para acceder a UEPMRMP.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              placeholder="tucorreo@colegio.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500" />
            <Link
              to="/forgot-password"
              className="font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0d2f5a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          ¿No tienes cuenta?{' '}
          <Link
            to="/register"
            className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
          >
            Regístrate
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Login