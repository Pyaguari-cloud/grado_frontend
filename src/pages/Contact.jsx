import { useState } from 'react'
import { motion } from 'framer-motion'
import contactService from '../services/contactService'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'admissions',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await contactService.sendMessage(formData)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'admissions',
        message: ''
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el mensaje')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 sm:py-16">
      {/* HERO CONTACTO INSTITUCIONAL */}
      <section className="relative overflow-hidden mb-10 sm:mb-12">
        <div className="absolute inset-0 bg-[var(--color-primary)]">
          <div className="absolute -top-24 -left-32 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.25em] uppercase mb-4 border border-white/20">
              Contáctanos
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3">
              Estamos aquí para acompañarte
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-100">
              Si tienes dudas sobre admisiones, programas académicos o procesos institucionales,
              escríbenos y nuestro equipo se pondrá en contacto contigo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
          {/* FORMULARIO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[var(--color-primary)]">
                Envíanos un mensaje
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Completa el formulario y te responderemos en el menor tiempo posible.
              </p>

              {success && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                </div>
              )}

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    placeholder="Nombre y apellidos"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                      placeholder="Ej: 300 000 0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Asunto
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  >
                    <option value="admissions">Admisiones</option>
                    <option value="courses">Información de cursos</option>
                    <option value="financial">Información financiera</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[var(--color-primary)] text-white py-2.5 text-sm font-semibold shadow-sm hover:bg-[#0d2f5a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* INFORMACIÓN DE CONTACTO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5 sm:space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-7">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--color-primary)]">
                📍 Dirección
              </h3>
              <p className="text-sm text-slate-600">
              Av. Raúl Clemente Huerta
                <br />
                Guayaquil, Ecuador 090107
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-7">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--color-primary)]">
                📞 Teléfono
              </h3>
              <p className="text-sm text-slate-600">+593 0994430011</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-7">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--color-primary)]">
                ✉️ Email
              </h3>
              <p className="text-sm text-slate-600">secretaria@uepmrmp.edu.ec</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-7">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--color-primary)]">
                🕒 Horario de atención
              </h3>
              <p className="text-sm text-slate-600">
                Lunes - Viernes: 7:00 AM - 13:10 PM
                <br />
                Sábados: No hay atencion
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact