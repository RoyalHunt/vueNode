import express from 'express'

import { getAllClients, saveNewClient, editClient, deleteClient } from '../models/Client'

const router = express.Router()

/**
 * @swagger
 * definitions:
 *   Client:
 *     type: object
 *     required:
 *      - name
 *      - email
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       phone:
 *         type: string
 *       providers:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: management
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Finds all clients
 *     description: Returns array of all clients
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Client'
 */

router.get('/', async (req, res, next) => {
  try {
    const clients = await getAllClients()
    res.json(clients)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * /clients/add:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Add a new client
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Client'
 *     responses:
 *       200:
 *         description: new user
 *         schema:
 *           $ref: '#/definitions/Client'
 */

router.post('/add', async (req, res, next) => {
  try {
    const client = req.body
    const newClient = await saveNewClient(client)
    res.json(newClient)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * /clients/edit:
 *   put:
 *     tags:
 *       - Clients
 *     summary: Add a new client
 *     description: Returns array of all clients
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Client'
 *     responses:
 *       200:
 *         description: new user
 *         schema:
 *           $ref: '#/definitions/Client'
 */

router.put('/edit', async (req, res, next) => {
  try {
    const client = req.body
    const editedClient = await editClient(client)
    res.json(editedClient)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * /clients/delete:
 *   delete:
 *     tags:
 *       - Clients
 *     summary: Add a new client
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: The Client id that needs to be deleted
 *         in:  query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: deleted user object
 *         schema:
 *           $ref: '#/definitions/Client'
 */

router.delete('/delete', async (req, res, next) => {
  try {
    const { id } = req.query
    const client = await deleteClient(id)
    res.json(client)
  } catch (e) {
    next(e)
  }
})

export default router
