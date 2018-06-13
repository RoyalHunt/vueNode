import axios from 'axios'

import config from '../config'

const HOST = `${window.location.protocol}//${window.location.hostname}:${config.server.port}`

export async function getClients() {
  const clients = await axios.get(`${HOST}/clients`)
  return clients.data
}

export async function addClient(client) {
  const newClient = await axios.post(`${HOST}/clients/add`, client)
  return newClient
}

export async function addProvider(name) {
  const newProvider = await axios.post(`${HOST}/providers/add`, { name })
  return newProvider.data
}

export async function deleteProvider(id) {
  const provider = await axios.delete(`${HOST}/providers`, {
    params: {
      id
    }
  })
  return provider
}

export async function deleteClient(id) {
  const client = await axios.delete(`${HOST}/clients/delete`, {
    params: {
      id
    }
  })
  return client
}

export async function editClient(client) {
  const editedClient = await axios.put(`${HOST}/clients/edit`, client)
  return editedClient
}
