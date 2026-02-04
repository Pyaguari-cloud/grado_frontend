import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import authService from '../services/authService'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const emailFromUrl = searchParams.get('email')
    if (emailFromUrl) setEmail(emailFromUrl)
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const res = await authService.verifyEmail(email, code)
      if (res.success) {
        setMessage('Cuenta verificada con éxito. Redirigiendo al panel...')
        setTimeout(() => navigate('/dashboard'), 1500)
      } else {
        setError(res.message || 'No se pudo verificar el código')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al verificar el código')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const res = await authService.resendCode(email)
      setMessage(res.message || 'Nuevo código enviado a tu correo.')
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo reenviar el código')
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
            Verifica tu correo electrónico
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Te hemos enviado un código de 6 dígitos a tu bandeja de entrada.
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

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Código de verificación
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={e => setCode(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-lg text-center tracking-[0.4em] shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              placeholder="123456"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0d2f5a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Verificando...' : 'Verificar cuenta'}
          </button>
        </form>

        <div className="mt-4 flex flex-col items-center gap-2 text-sm text-slate-500">
          <span>¿No recibiste el código?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={loading || !email}
            className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] disabled:opacity-50"
          >
            Reenviar código
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default VerifyEmail