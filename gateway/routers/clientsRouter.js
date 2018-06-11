import express from 'express'

import { getAllClients, saveNewClient, editClient, deleteClient } from '../models/Client'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const clients = await getAllClients()
    res.json(clients)
  } catch (e) {
    res.send(500, { error: e })
  }
})

router.post('/add', async (req, res) => {
  try {
    const client = req.body
    const newClient = await saveNewClient(client)
    res.json(newClient)
  } catch (e) {
    res.send(500, { error: e })
  }
})

router.put('/', async (req, res) => {
  try {
    const client = req.body
    const editedClient = await editClient(client)
    res.json(editedClient)
  } catch (e) {
    res.send(500, { error: e })
  }
})

router.delete('/', async (req, res) => {
  try {
    const { id } = req.query
    const client = await deleteClient(id)
    res.json(client)
  } catch (e) {
    res.send(500, { error: e })
  }
})

export default router
