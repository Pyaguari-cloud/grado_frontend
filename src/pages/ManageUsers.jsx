import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../config/api'
import { useAuth } from '../context/AuthContext'

const ManageUsers = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'admin') return
    fetchUsers()
  }, [user])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/users')
      setUsers(data.data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleCreateTeacher = async (e) => {
    e.preventDefault()
    setCreating(true)
    try {
      await api.post('/users/teachers', form)
      alert('Docente creado correctamente')
      setForm({ name: '', email: '', password: '', phone: '' })
      fetchUsers()
    } catch (err) {
      alert(
        err.response?.data?.message || 'Error al crear docente, intenta nuevamente'
      )
    } finally {
      setCreating(false)
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-sm text-slate-500">
          No tienes permisos para acceder a esta sección.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[var(--color-primary)] border-t-transparent mb-2" />
        <p className="text-sm text-slate-500">Cargando usuarios...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
              Panel administrativo
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Gestión de usuarios
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Administra cuentas de estudiantes, docentes y administradores.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {users.length} usuarios registrados
          </div>
        </motion.div>

        {/* Formulario crear docente */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-7"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Crear nuevo docente
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Registra una cuenta de docente para que pueda gestionar cursos y estudiantes.
          </p>

          <form
            onSubmit={handleCreateTeacher}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nombre completo
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre y apellidos"
                className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="docente@colegio.com"
                className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Teléfono (opcional)
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="099 000 0000"
                className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Contraseña temporal"
                className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Indica al docente que cambie su contraseña al iniciar sesión.
              </p>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={creating}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[#0d2f5a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {creating ? 'Creando docente...' : 'Crear docente'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Tabla de usuarios */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-slate-100 text-xs sm:text-sm text-slate-500">
            Lista de usuarios
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Nombre
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Rol
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Verificado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/70">
                    <td className="px-4 sm:px-6 py-3">
                      <div className="text-sm font-medium text-slate-900">
                        {u.name}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-slate-700">
                      {u.email}
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 capitalize">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          u.isVerified
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {u.isVerified ? 'Verificado' : 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 sm:px-6 py-8 text-center text-sm text-slate-500"
                    >
                      No hay usuarios registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ManageUsers