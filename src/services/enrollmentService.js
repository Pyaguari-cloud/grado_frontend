import api from '../config/api'

const enrollmentService = {
  enrollInCourse: async (courseId) => {
    const response = await api.post('/enrollments', { courseId })
    return response.data
  },

  getMyEnrollments: async () => {
    const response = await api.get('/enrollments/my-enrollments')
    return response.data
  },

  getAllEnrollments: async () => {
    const response = await api.get('/enrollments')
    return response.data
  },

  updateEnrollment: async (id, updateData) => {
    const response = await api.put(`/enrollments/${id}`, updateData)
    return response.data
  }
}

export default enrollmentService