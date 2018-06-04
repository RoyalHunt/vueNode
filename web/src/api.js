import axios from 'axios'

import config from '../config'

const HOST = `${window.location.protocol}//${window.location.hostname}:${config.server.port}`

export async function getClients() {
  const clients = await axios.get(`${HOST}/clients`)
  return clients.data
}

export async function addComment(data) {
  const kid = await axios.post(`${HOST}/comments`, data)
  return kid
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

export async function deleteParent(id) {
  const parent = await axios.delete(`${HOST}/admin/parents`, {
    params: {
      id
    }
  })
  return parent
}

export async function editParent(editedParent) {
  const parent = await axios.put(`${HOST}/admin/parents`, editedParent)
  return parent
}
