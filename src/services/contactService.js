import api from '../config/api'

const contactService = {
  sendMessage: async (messageData) => {
    const response = await api.post('/contact', messageData)
    return response.data
  },

  getAllContacts: async (status) => {
    const params = status ? `?status=${status}` : ''
    const response = await api.get(`/contact${params}`)
    return response.data
  },

  updateContact: async (id, updateData) => {
    const response = await api.put(`/contact/${id}`, updateData)
    return response.data
  }
}

export default contactService