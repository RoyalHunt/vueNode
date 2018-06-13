import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import isInt from 'validator/lib/isInt'
import isAlpha from 'validator/lib/isAlpha'

import { getAllProviders } from './Provider'

const { ObjectId } = mongoose.Types

const ProviderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      index: true,
    },
  },
  { _id: false },
)

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      index: true,
      required: true,
      validate: value => isAlpha(value),
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      index: true,
      validate: value => isEmail(value),
    },
    phone: {
      type: String,
      index: true,
      validate: value => isInt(value),
    },
    providers: [ProviderSchema],
  },
  {
    collection: 'clients',
    timestamps: true,
  },
)

const Client = mongoose.model('Client', ClientSchema)

export async function getAllClients() {
  try {
    const clients = await Client.find()
      .lean()
      .exec()

    const providers = await getAllProviders()

    return { clients, providers }
  } catch (e) {
    console.log('Error', e)
    return {
      error: e,
    }
  }
}

export async function saveNewClient(data) {
  try {
    const clientExists = await Client.findOne({ email: data.email })
    if (clientExists) {
      return {
        error: 'Client already exists',
      }
    }
    const client = new Client(data)
    const newClient = await client.save()
    return newClient
  } catch (e) {
    console.log('Error', e)
    return {
      error: e,
    }
  }
}

export async function editClient(data) {
  try {
    const { id, ...client } = data
    const editedclient = await Client.findByIdAndUpdate(id, client, { new: true })
    if (!editedclient) {
      return {
        error: 'Client does not exists',
      }
    }
    return editedclient
  } catch (e) {
    console.log('Error', e)
    return {
      error: e,
    }
  }
}

export async function deleteClient(id) {
  try {
    const objId = ObjectId(id)
    const client = await Client.findByIdAndRemove(objId)

    return client
  } catch (e) {
    console.log('Error', e)
    return {
      error: e,
    }
  }
}

export default Client
