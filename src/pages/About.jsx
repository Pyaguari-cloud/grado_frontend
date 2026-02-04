import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Eye, Heart, Users, Award, Zap } from 'lucide-react'

const About = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })

  const values = [
    {
      icon: Heart,
      title: 'Formación integral',
      description: 'Educación centrada en valores, habilidades socioemocionales y excelencia académica.',
      color: 'from-[var(--color-primary)] to-slate-800'
    },
    {
      icon: Target,
      title: 'Excelencia',
      description: 'Procesos de mejora continua y altos estándares en todos los niveles.',
      color: 'from-[var(--color-accent)] to-amber-400'
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Relación cercana entre estudiantes, familias y docentes.',
      color: 'from-sky-500 to-indigo-500'
    },
    {
      icon: Zap,
      title: 'Innovación',
      description: 'Integración responsable de la tecnología en el proceso educativo.',
      color: 'from-emerald-500 to-teal-500'
    }
  ]

  const timeline = [
    { year: '1990', title: 'Fundación', description: 'Inicio de nuestro colegio con 50 estudiantes.' },
    { year: '2000', title: 'Expansión', description: 'Ampliación de instalaciones y nuevos programas académicos.' },
    { year: '2010', title: 'Acreditación', description: 'Obtención de importantes reconocimientos de calidad.' },
    { year: '2020', title: 'Era Digital', description: 'Transformación digital de procesos y aulas.' },
    { year: '2024', title: 'Liderazgo', description: 'Referente en educación integral y tecnología educativa.' }
  ]

  const team = [
    { name: 'Dr. Juan Pérez', role: 'Director General', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Dra. María García', role: 'Directora Académica', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Lic. Carlos López', role: 'Coordinador de Tecnología', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Dra. Ana Martínez', role: 'Coordinadora de Bienestar', image: 'https://randomuser.me/api/portraits/women/4.jpg' }
  ]

  return (
    <div className="pt-16 bg-slate-50">
      {/* HERO INSTITUCIONAL */}
      <section className="relative py-24 sm:py-28 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]">
          <div className="absolute -top-24 -left-32 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.25em] uppercase mb-4 border border-white/20">
              Nuestra institución
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Más de 30 años formando líderes para el futuro
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-100">
              Una comunidad educativa comprometida con la excelencia académica, la formación en valores
              y la innovación pedagógica al servicio de nuestros estudiantes y sus familias.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section ref={ref1} className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--color-primary)]">
                Misión
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Formar estudiantes íntegros, competentes y comprometidos con la sociedad,
                brindando una educación de excelencia que articule conocimiento académico,
                valores humanos y habilidades para el siglo XXI.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-[var(--color-primary)]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--color-primary)]">
                Visión
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Ser reconocidos como la institución educativa líder en innovación y excelencia,
                formando generaciones de líderes que transformen positivamente nuestra sociedad
                y estén preparados para los desafíos de un mundo en constante cambio.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALORES INSTITUCIONALES */}
      <section ref={ref2} className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12 sm:mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
              Nuestros valores
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-900">
              Principios que nos definen
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Los pilares que orientan cada decisión, proyecto y experiencia de aprendizaje
              en nuestra comunidad educativa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-[var(--color-primary)]">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAYECTORIA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
              Nuestra historia
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-900">
              Más de tres décadas de compromiso
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Un recorrido marcado por el crecimiento, la innovación y el compromiso
              constante con la calidad educativa.
            </p>
          </motion.div>

          <div className="relative">
            {/* Línea central */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200" />

            <div className="space-y-10 sm:space-y-12">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="md:flex md:items-center md:justify-between relative"
                  >
                    <div
                      className={`md:w-5/12 ${
                        isLeft ? 'md:text-right md:pr-8' : 'md:order-2 md:text-left md:pl-8'
                      }`}
                    >
                      <div className="inline-block bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4">
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)] mb-1">
                          {item.year}
                        </p>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Punto en la línea */}
                    <div className="hidden md:flex md:w-2 md:items-center md:justify-center">
                      <div className="h-3 w-3 rounded-full bg-[var(--color-accent)] border-4 border-slate-50 shadow-sm" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO DIRECTIVO */}
      <section ref={ref3} className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12 sm:mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
              Nuestro equipo
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-900">
              Liderazgo comprometido con la educación
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Profesionales con amplia experiencia académica y humana, dedicados a acompañar
              cada etapa del proceso formativo de nuestros estudiantes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={inView3 ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/60 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-primary)] font-medium">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About