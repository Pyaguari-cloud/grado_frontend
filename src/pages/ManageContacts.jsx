import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import contactService from '../services/contactService'
import { useNavigate } from 'react-router-dom'

const ManageContacts = () => {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard')
      return
    }
    fetchContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, navigate, filter])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const statusFilter = filter !== 'all' ? filter : null
      const data = await contactService.getAllContacts(statusFilter)
      setContacts(data.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await contactService.updateContact(id, { status })
      alert('✅ Estado actualizado')
      fetchContacts()
    } catch (error) {
      alert('❌ Error al actualizar')
    }
  }

  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-800 border border-amber-100'
      case 'in-progress':
        return 'bg-sky-50 text-sky-800 border border-sky-100'
      case 'resolved':
        return 'bg-emerald-50 text-emerald-800 border border-emerald-100'
      default:
        return 'bg-slate-50 text-slate-800 border border-slate-100'
    }
  }

  const getSubjectLabel = (subject) => {
    const labels = {
      admissions: 'Admisiones',
      courses: 'Cursos',
      financial: 'Financiero',
      other: 'Otro',
    }
    return labels[subject] || subject
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[var(--color-primary)] border-t-transparent mb-3" />
        <p className="text-sm text-slate-500">Cargando mensajes de contacto...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* CABECERA ADMIN */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
            Panel administrativo
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Mensajes de contacto
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Gestiona solicitudes de admisiones, información académica y otros temas
                enviados desde el formulario de contacto institucional.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {contacts.length} mensajes encontrados
            </div>
          </div>
        </motion.div>

        {/* FILTROS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl shadow-md border border-slate-100 p-4 sm:p-5 flex flex-wrap gap-3 items-center justify-between"
        >
          <div className="text-sm font-medium text-slate-700">
            Filtrar por estado:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition ${
                filter === 'all'
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-[var(--color-primary)]/60 hover:text-[var(--color-primary)]'
              }`}
            >
              Todos ({contacts.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition ${
                filter === 'pending'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:text-amber-700'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition ${
                filter === 'in-progress'
                  ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:text-sky-700'
              }`}
            >
              En progreso
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition ${
                filter === 'resolved'
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              Resueltos
            </button>
          </div>
        </motion.div>

        {/* LISTA DE CONTACTOS */}
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-10 text-center">
              <p className="text-sm sm:text-base text-slate-500">
                No hay mensajes con el filtro seleccionado.
              </p>
            </div>
          ) : (
            contacts.map((contact) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      {contact.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {contact.email} • {contact.phone}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(contact.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center justify-end">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold capitalize ${getStatusClasses(
                        contact.status
                      )}`}
                    >
                      {contact.status === 'pending'
                        ? 'Pendiente'
                        : contact.status === 'in-progress'
                        ? 'En progreso'
                        : contact.status === 'resolved'
                        ? 'Resuelto'
                        : contact.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[var(--color-accent)]/20 text-[var(--color-primary)] border border-[var(--color-accent)]/40">
                      {getSubjectLabel(contact.subject)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {contact.status !== 'pending' && (
                    <button
                      onClick={() => updateStatus(contact._id, 'pending')}
                      className="px-4 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 text-xs sm:text-sm font-semibold transition"
                    >
                      Marcar como pendiente
                    </button>
                  )}
                  {contact.status !== 'in-progress' && (
                    <button
                      onClick={() => updateStatus(contact._id, 'in-progress')}
                      className="px-4 py-2 rounded-full bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 text-xs sm:text-sm font-semibold transition"
                    >
                      Marcar en progreso
                    </button>
                  )}
                  {contact.status !== 'resolved' && (
                    <button
                      onClick={() => updateStatus(contact._id, 'resolved')}
                      className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs sm:text-sm font-semibold transition"
                    >
                      Marcar como resuelto
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageContacts