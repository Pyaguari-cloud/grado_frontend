import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Contact from './pages/Contact'
// ...existing code...
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ManageCourses from './pages/ManageCourses'
import ManageContacts from './pages/ManageContacts'
// NUEVOS IMPORTS
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AcademicOfferings from './pages/AcademicOfferings'
import ManageUsers from './pages/ManageUsers'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#f5f7fb]">
          <Header />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/academic-offerings" element={<AcademicOfferings />} />

              {/* NUEVAS RUTAS PÚBLICAS */}
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* PRIVADAS */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-courses"
                element={
                  <PrivateRoute>
                    <ManageCourses />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-contacts"
                element={
                  <PrivateRoute>
                    <ManageContacts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <PrivateRoute>
                    <ManageUsers />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App