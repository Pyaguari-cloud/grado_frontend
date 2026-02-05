import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import enrollmentService from '../services/enrollmentService'

const Dashboard = () => {
  const { user, logout, isAdmin, isTeacher } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await enrollmentService.getMyEnrollments()
        setEnrollments(data.data)
      } catch (error) {
        console.error('Error fetching enrollments:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchEnrollments()
    }
  }, [user])

  // Determinar cuántas columnas para el grid de acciones
  // - Admin: 3 columnas (cursos, mensajes, usuarios)
  // - Docente: 1 columna (cursos)
  const actionsGridClass =
    isAdmin && isTeacher
      ? 'grid md:grid-cols-3 gap-6'
      : isAdmin
      ? 'grid md:grid-cols-3 gap-6'
      : 'grid md:grid-cols-1 gap-6'

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* CABECERA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
              Panel principal
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Bienvenido,{' '}
              <span className="text-[var(--color-primary)]">
                {user?.name}
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Email: {user?.email}
            </p>
            <p className="text-sm text-slate-600">
              Rol:{' '}
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold capitalize text-[var(--color-primary)]">
                {user?.role}
              </span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="flex gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 border border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Activo
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)]/15 px-2 py-1 text-[var(--color-primary)] border border-[var(--color-accent)]/40">
                {enrollments.length} cursos asignados
              </span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </motion.div>

        {/* ACCIONES ADMIN / DOCENTE */}
        {(isAdmin || isTeacher) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={actionsGridClass}
          >
            {/* Gestionar cursos (admin + docente) */}
            <Link
              to="/manage-courses"
              className="group relative overflow-hidden rounded-2xl bg-[var(--color-primary)] text-white p-6 sm:p-7 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-sky-800 opacity-80" />
              <div className="relative z-10">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-xl font-bold mb-1">Gestionar cursos</h3>
                <p className="text-sm text-slate-100/90 mb-4">
                  Crea, edita y organiza la oferta académica institucional.
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                  Ir al módulo
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </span>
              </div>
            </Link>

            {/* Mensajes de contacto (solo admin) */}
            {isAdmin && (
              <Link
                to="/manage-contacts"
                className="group relative overflow-hidden rounded-2xl bg-[var(--color-accent)] text-[var(--color-primary)] p-6 sm:p-7 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-amber-300 opacity-90" />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">✉️</div>
                  <h3 className="text-xl font-bold mb-1">
                    Mensajes de contacto
                  </h3>
                  <p className="text-sm text-slate-800 mb-4">
                    Revisa y responde solicitudes de familias y estudiantes.
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold">
                    Ver mensajes
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            )}

            {/* Gestionar usuarios (solo admin) */}
            {isAdmin && (
              <Link
                to="/admin/users"
                className="group relative overflow-hidden rounded-2xl bg-slate-900 text-white p-6 sm:p-7 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-700 opacity-90" />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">👥</div>
                  <h3 className="text-xl font-bold mb-1">
                    Gestionar usuarios
                  </h3>
                  <p className="text-sm text-slate-100/90 mb-4">
                    Visualiza y administra cuentas de estudiantes, docentes y
                    administradores.
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                    Ir al módulo
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            )}
          </motion.div>
        )}

        {/* SECCIÓN MIS CURSOS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Mis cursos
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Aquí verás los cursos en los que estás inscrito y su progreso.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {enrollments.length} cursos registrados
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-[var(--color-primary)] border-t-transparent mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                Cargando información de tus cursos...
              </p>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-sm sm:text-base">
                Aún no estás inscrito en ningún curso.
              </p>
              <Link
                to="/courses"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#0d2f5a] transition-colors"
              >
                Ver cursos disponibles →
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment._id}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 hover:shadow-md hover:border-[var(--color-primary)]/40 transition"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-[var(--color-primary)] mb-1.5 line-clamp-2">
                    {enrollment.course?.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-3 line-clamp-3">
                    {enrollment.course?.description}
                  </p>

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${
                        enrollment.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : enrollment.status === 'completed'
                          ? 'bg-sky-50 text-sky-700 border border-sky-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}
                    >
                      {enrollment.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      Progreso: {enrollment.progress ?? 0}%
                    </span>
                  </div>

                  {/* Barra de progreso */}
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden mb-2">
                    <div
                      className="h-full rounded-full bg-[var(--color-accent)]"
                      style={{ width: `${enrollment.progress ?? 0}%` }}
                    />
                  </div>

                  {enrollment.course?.category && (
                    <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-slate-500">
                      {enrollment.course.category}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard