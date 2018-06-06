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

export async function getProviders() {
  const providers = await axios.get(`${HOST}/providers`)
  return providers.data
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

export async function getRelatedKids({ familyId, communityId }) {
  const kids = await axios.get(`${HOST}/admin/parent/kids`, {
    params: {
      familyId,
      communityId
    }
  })
  return kids.data
}

export async function editParent(editedParent) {
  const parent = await axios.put(`${HOST}/admin/parents`, editedParent)
  return parent
}
