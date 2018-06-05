import express from 'express'

import { getAllProviders, addProvider, deleteProvider } from '../models/Provider'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const providers = await getAllProviders()
    res.json(providers)
  } catch (e) {
    res.send(500, { error: e })
  }
})

router.post('/add', async (req, res) => {
  try {
    const { name } = req.body
    const newProvider = await addProvider(name)
    res.json(newProvider)
  } catch (e) {
    res.send(500, { error: e })
  }
})

router.delete('/', async (req, res) => {
  try {
    const { id } = req.query
    const provider = await deleteProvider(id)
    res.json(provider)
  } catch (e) {
    res.send(500, { error: e })
  }
})

export default router
