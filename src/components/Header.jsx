import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <nav className="bg-[var(--color-primary)] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight">
                UEPMRMP
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              Nosotros
            </Link>
            <Link
              to="/academic-offerings"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              Oferta Académica
            </Link>
            <Link
              to="/courses"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              Cursos
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              Contacto
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-xs sm:text-sm text-slate-100">
                    Hola, <span className="font-semibold">{user?.name}</span>
                  </span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-yellow-400 transition-colors shadow-sm"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[var(--color-accent)] focus:outline-none"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--color-primary)]/95 border-t border-white/10"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-sm hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-sm hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 rounded-md text-sm hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Cursos
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-sm hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2 text-xs text-slate-100">
                  Hola, <span className="font-semibold">{user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm text-red-100 hover:bg-red-600/70 bg-red-600/60 mt-1"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-sm bg-[var(--color-accent)] text-[var(--color-primary)] font-semibold text-center mt-1 hover:bg-yellow-400"
                  onClick={() => setIsOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Header