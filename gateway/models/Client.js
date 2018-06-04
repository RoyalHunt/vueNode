import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'

import Provider from './Provider' //eslint-disable-line

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
      type: Number,
      index: true,
      validate: value => isMobilePhone(value),
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

export async function saveClient(data) {
  try {
    const userExists = await Client.findOne({ email: data.email })
    if (userExists) {
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
