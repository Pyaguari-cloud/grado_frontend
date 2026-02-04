import { useState } from 'react'
import { motion } from 'framer-motion'
import authService from '../services/authService'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const res = await authService.forgotPassword(email)
      setMessage(res.message || 'Si el correo existe, se ha enviado un código.')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el correo')
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
            Recuperar contraseña
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Ingresa tu correo y te enviaremos un código para restablecer tu contraseña.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              placeholder="tucorreo@colegio.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0d2f5a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Enviando código...' : 'Enviar código'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default ForgotPassword