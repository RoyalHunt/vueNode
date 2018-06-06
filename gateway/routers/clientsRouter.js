import express from 'express'

import { getAllClients, saveNewClient } from '../models/Client'

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
    console.log(client)
    const newClient = await saveNewClient(client)
    res.json(newClient)
  } catch (e) {
    res.send(500, { error: e })
  }
})

export default router
