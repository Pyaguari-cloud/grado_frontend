import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AcademicOfferings = () => {
  const levels = [
    {
      id: 'initial',
      name: 'Educación Inicial',
      range: 'Inicial 1 y 2',
      color: 'from-[var(--color-accent)] to-amber-400',
      description:
        'Primeros pasos en la formación integral de los niños, fortaleciendo habilidades socioemocionales, lenguaje y motricidad a través del juego y la exploración.',
      focus: ['Juego y exploración', 'Desarrollo del lenguaje', 'Motricidad fina y gruesa', 'Hábitos y autonomía'],
      icon: '👶'
    },
    {
      id: 'basic',
      name: 'Educación General Básica',
      range: '1.º a 10.º de Básica',
      color: 'from-sky-500 to-indigo-500',
      description:
        'Desarrollo de competencias fundamentales en lectura, escritura, pensamiento lógico-matemático, ciencias y formación en valores.',
      focus: [
        'Lectoescritura y razonamiento lógico',
        'Ciencias Naturales y Estudios Sociales',
        'Inglés y tecnología',
        'Formación en valores y convivencia'
      ],
      icon: '📘'
    },
    {
      id: 'highschool',
      name: 'Bachillerato General Unificado',
      range: '1.º a 3.º de Bachillerato',
      color: 'from-[var(--color-primary)] to-slate-800',
      description:
        'Formación orientada a la construcción del proyecto de vida, preparación para la educación superior y el mundo laboral.',
      focus: [
        'Profundización por especialidad',
        'Preparación para educación superior',
        'Proyectos de investigación',
        'Desarrollo de habilidades profesionales'
      ],
      icon: '🎓'
    }
  ]

  const specializations = [
    {
      id: 'science',
      name: 'Bachillerato en Ciencias',
      badge: 'Ciencias',
      color: 'from-sky-500 to-indigo-600',
      icon: '🔬',
      description:
        'Orientado a estudiantes interesados en carreras universitarias científicas, de salud, ingeniería y áreas afines.',
      focus: ['Física, Química y Biología', 'Matemática avanzada', 'Investigación científica', 'Pensamiento crítico y lógico'],
      exitProfile:
        'Estudiantes preparados para rendir pruebas de ingreso a la universidad en áreas científicas y tecnológicas.'
    },
    {
      id: 'accounting',
      name: 'Bachillerato en Contabilidad',
      badge: 'Contabilidad',
      color: 'from-emerald-500 to-teal-600',
      icon: '💼',
      description:
        'Formación en procesos contables, financieros y administrativos para el ámbito empresarial y emprendedor.',
      focus: [
        'Contabilidad general y de costos',
        'Finanzas básicas y tributación',
        'Administración y emprendimiento',
        'Manejo de software contable'
      ],
      exitProfile:
        'Estudiantes capaces de apoyar procesos contables y administrativos en empresas o emprendimientos propios.'
    },
    {
      id: 'it',
      name: 'Bachillerato en Informática',
      badge: 'Informática',
      color: 'from-[var(--color-primary)] to-slate-900',
      icon: '💻',
      description:
        'Enfoque en el uso y desarrollo de tecnologías de la información, programación y soporte de sistemas.',
      focus: [
        'Programación y lógica computacional',
        'Redes y mantenimiento de equipos',
        'Diseño y desarrollo web',
        'Herramientas ofimáticas avanzadas'
      ],
      exitProfile:
        'Estudiantes con competencias para desempeñarse en áreas tecnológicas básicas o continuar estudios en informática y sistemas.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO INSTITUCIONAL (similar a Courses) */}
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
              Unidad Educativa Monseñor Roberto Maria del Pozo
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-100 max-w-3xl mx-auto">
              Acompañamos a nuestros estudiantes desde Educación Inicial hasta Tercero de Bachillerato,
              ofreciendo formación integral y tres especialidades en la etapa de bachillerato:
              Ciencias, Contabilidad e Informática.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NIVELES EDUCATIVOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
            Niveles de formación
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Trayectoria académica desde Inicial hasta Bachillerato
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto">
            Diseñamos un recorrido educativo coherente y articulado, que acompaña el desarrollo de nuestros
            estudiantes en cada etapa, fortaleciendo sus habilidades académicas, personales y sociales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {levels.map((level, idx) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-7 flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${level.color} flex items-center justify-center text-2xl mb-4`}
              >
                {level.icon}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] mb-1">
                {level.range}
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                {level.name}
              </h3>
              <p className="text-sm text-slate-600 mb-4 flex-1">
                {level.description}
              </p>
              <div className="mt-2">
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  Enfoque formativo:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {level.focus.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ESPECIALIDADES DE BACHILLERATO */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
              Bachillerato (1.º a 3.º)
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Especialidades de Bachillerato
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto">
              En Tercero de Bachillerato, nuestros estudiantes pueden elegir entre tres especialidades
              que les permiten profundizar en sus intereses y proyectar su futuro académico y profesional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {specializations.map((spec, idx) => (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60 shadow-md hover:shadow-lg hover:border-[var(--color-primary)]/40 transition"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${spec.color}`}
                />
                <div className="p-6 sm:p-7 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${spec.color} flex items-center justify-center text-xl text-white`}
                      >
                        {spec.icon}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {spec.name}
                        </h3>
                        <span className="inline-flex mt-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--color-accent)]/15 text-[var(--color-primary)] border border-[var(--color-accent)]/40">
                          {spec.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-3">
                    {spec.description}
                  </p>

                  <div className="mb-3">
                    <p className="text-xs font-semibold text-slate-500 mb-1">
                      Principales ejes formativos:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {spec.focus.map((item) => (
                        <li key={item} className="flex items-start gap-1.5">
                          <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-2">
                      Perfil de egreso:
                    </p>
                    <p className="text-xs text-slate-600">
                      {spec.exitProfile}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL HACIA CONTACTO / ADMISIONES */}
      <section className="py-10 sm:py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">
              ¿Quieres más información sobre nuestra oferta académica?
            </h3>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Escríbenos para conocer detalles sobre mallas curriculares, horarios,
              requisitos de admisión y acompañamiento académico en cada nivel.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0d2f5a] transition-colors"
            >
              Contactar admisiones
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] bg-white hover:bg-slate-50 transition-colors"
            >
              Ver cursos complementarios
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AcademicOfferings