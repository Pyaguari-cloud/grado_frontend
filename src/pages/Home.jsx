import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      title: 'Excelencia académica',
      description: 'Docentes altamente calificados y un modelo pedagógico centrado en el estudiante.',
      color: 'from-[var(--color-primary)] to-slate-800'
    },
    {
      title: 'Acompañamiento integral',
      description: 'Seguimiento académico y formativo para potenciar las habilidades de cada estudiante.',
      color: 'from-[var(--color-accent)] to-amber-400'
    },
    {
      title: 'Infraestructura segura',
      description: 'Instalaciones modernas, seguras y adecuadas para el aprendizaje.',
      color: 'from-sky-500 to-indigo-500'
    }
  ]

  return (
    <div className="pt-16 bg-slate-50">
      {/* HERO INSTITUCIONAL */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]">
          {/* patrones suaves */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-white"
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide mb-4 border border-white/20">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              Plataforma académica UEPMRMP
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Educación de calidad,
              <span className="block text-[var(--color-accent)]">
                tecnología al servicio del aprendizaje.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-100 max-w-xl">
              Gestiona estudiantes, cursos y comunicación institucional en una sola plataforma.
              Pensada para colegios que buscan transformar su proceso académico con tecnología.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-[var(--color-primary)] shadow-md hover:bg-amber-300 transition-colors"
              >
                Comenzar ahora
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Ver ofertas académicas
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-100/80">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Acceso seguro para estudiantes y docentes
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                Notificaciones y seguimiento académico
              </div>
            </div>
          </motion.div>

          {/* Tarjeta lateral / mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 w-full max-w-md lg:max-w-lg"
          >
            <div className="rounded-2xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[var(--color-primary)]">
                  Panel institucional
                </h3>
                <span className="rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-[10px] font-semibold text-[var(--color-primary)]">
                  Vista general
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Estudiantes activos</p>
                  <p className="mt-1 text-xl font-bold text-[var(--color-primary)]">+500</p>
                  <p className="mt-1 text-[10px] text-emerald-600">+12 este mes</p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Cursos disponibles</p>
                  <p className="mt-1 text-xl font-bold text-[var(--color-primary)]">31</p>
                  <p className="mt-1 text-[10px] text-slate-500">Áreas académicas</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Progreso del ciclo académico</span>
                  <span>65%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-[var(--color-accent)]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-slate-100 px-3 py-2 bg-slate-50">
                  <p className="font-semibold text-[var(--color-primary)]">
                    Seguimiento
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Reportes académicos en tiempo real para familias y directivos.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-100 px-3 py-2 bg-slate-50">
                  <p className="font-semibold text-[var(--color-primary)]">
                    Comunicación
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Canal institucional entre estudiantes, docentes y administración.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
              Nuestra Oferta Académica
            </h2>
            <p className="mt-3 text-sm text-slate-500 max-w-2xl mx-auto">
              Integramos procesos académicos, administrativos y de comunicación
              en un entorno sencillo y seguro para estudiantes, docentes y familias.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/70 p-5"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.color}`} />
                <h3 className="mt-2 text-base font-semibold text-[var(--color-primary)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">
              ¿Listo para digitalizar la gestión académica de tu institución?
            </h3>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Crea tu cuenta, configura tus cursos y comienza a gestionar la información
              académica de forma centralizada y segura.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0d2f5a] transition-colors"
            >
              Crear cuenta
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] bg-white hover:bg-slate-50 transition-colors"
            >
              Contactar institución
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home