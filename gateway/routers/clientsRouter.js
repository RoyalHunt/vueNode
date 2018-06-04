import express from 'express'

import { getAllClients } from '../models/Client'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const clients = await getAllClients()
    res.json(clients)
  } catch (e) {
    res.send(500, { error: e })
  }
})

export default router
