import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import courseService from '../services/courseService'
import { useAuth } from '../context/AuthContext'
import enrollmentService from '../services/enrollmentService'

const Courses = () => {
  const { isAuthenticated } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'Todos', icon: '📚' },
    { id: 'tech', name: 'Tecnología', icon: '💻' },
    { id: 'art', name: 'Arte', icon: '🎨' },
    { id: 'science', name: 'Ciencias', icon: '🔬' },
    { id: 'languages', name: 'Idiomas', icon: '🌍' },
    { id: 'business', name: 'Negocios', icon: '💼' }
  ]

  useEffect(() => {
    fetchCourses()
  }, [selectedCategory, searchTerm])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const filters = {}
      if (selectedCategory !== 'all') filters.category = selectedCategory
      if (searchTerm) filters.search = searchTerm

      const data = await courseService.getAllCourses(filters)
      setCourses(data.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para inscribirte')
      window.location.href = '/login'
      return
    }

    try {
      await enrollmentService.enrollInCourse(courseId)
      alert('¡Inscripción exitosa!')
    } catch (error) {
      alert(error.response?.data?.message || 'Error al inscribirse')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section institucional */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] text-white py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-32 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.25em] uppercase mb-4 border border-white/20">
              Oferta académica
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Nuestros Cursos
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-100 max-w-2xl mx-auto">
              Programas diseñados para potenciar las habilidades de nuestros estudiantes
              y responder a los desafíos del mundo actual.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Barra de búsqueda */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Buscar cursos por nombre, área o palabra clave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3.5 rounded-full border border-slate-300 bg-white shadow-sm text-sm sm:text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition border ${
                selectedCategory === category.id
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-[var(--color-primary)]/60 hover:text-[var(--color-primary)]'
              }`}
            >
              <span className="mr-1.5">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Cursos */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[var(--color-primary)] border-t-transparent mx-auto mb-3" />
            <p className="text-sm text-slate-500">Cargando cursos...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-base sm:text-lg text-slate-600 mb-3">
              No se encontraron cursos con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg hover:border-[var(--color-primary)]/40 transition"
              >
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                )}
                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                      {course.level || 'General'}
                    </span>
                    {course.price !== undefined && (
                      <span className="text-base sm:text-lg font-bold text-[var(--color-primary)]">
                        {course.price === 0 ? 'Gratuito' : `$${course.price}`}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1.5 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mb-3 text-[11px] sm:text-xs text-slate-500">
                    <span>⏱ {course.duration || 'Duración variable'}</span>
                    <span>👥 {course.studentsCount || 0} estudiantes</span>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-[11px] sm:text-xs text-slate-500">
                    <span>
                      ⭐ <span className="font-semibold">{course.rating || '4.8'}</span>
                    </span>
                    {course.category && (
                      <span className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200">
                        {course.category}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="w-full rounded-full bg-[var(--color-primary)] text-white text-xs sm:text-sm font-semibold py-2.5 sm:py-3 hover:bg-[#0d2f5a] transition-colors"
                  >
                    Inscribirse ahora
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses