import express from 'express'

import { getAllProviders, addProvider, deleteProvider } from '../models/Provider'

const router = express.Router()

/**
 * @swagger
 * definitions:
 *   Provider:
 *     type: object
 *     required:
 *      - id
 *      - name
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: management
 */

/**
 * @swagger
 * /providers:
 *   get:
 *     tags:
 *       - Providers
 *     summary: Finds all providers
 *     description: Returns array of all providers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Provider'
 */

router.get('/', async (req, res, next) => {
  try {
    const providers = await getAllProviders()
    res.json(providers)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * /providers/add:
 *   post:
 *     tags:
 *       - Providers
 *     summary: Add a new provider
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Provider object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Provider'
 *     responses:
 *       200:
 *         description: new provider
 *         schema:
 *           $ref: '#/definitions/Provider'
 */

router.post('/add', async (req, res, next) => {
  try {
    const { name } = req.body
    const newProvider = await addProvider(name)
    res.json(newProvider)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * /providers:
 *   delete:
 *     tags:
 *       - Providers
 *     summary: Delete a provider by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: The Provider id that needs to be deleted
 *         in:  query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Deleted provider object
 *         schema:
 *           $ref: '#/definitions/Provider'
 */

router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.query
    const provider = await deleteProvider(id)
    res.json(provider)
  } catch (e) {
    next(e)
  }
})

export default router
