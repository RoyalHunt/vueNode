import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import isInt from 'validator/lib/isInt'
import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'

import Provider from './Provider'

const ProviderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      index: true,
      validate: value => isAlphanumeric(value),
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
      .select('-_id')
      .lean()
      .exec()

    const providers = await Provider.find()
      .select('-_id')
      .lean()
      .exec()

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

export async function updateClient(data) {
  const client = await Client.findOneAndUpdate(
    { email: data.email },
    {
      name: data.name,
    },
    { new: true },
  )
  if (!client) {
    return {
      error: 'Client does not exists',
    }
  }
  return client
}

export default Client
