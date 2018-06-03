import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isAlpha from 'validator/lib/isAlpha'

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
    providers: [{ type: Number, ref: 'providers' }],
  },
  {
    collection: 'clients',
    timestamps: true,
  },
)

ClientSchema.pre('save', async (next) => {
  next()
})

const Client = mongoose.model('Client', ClientSchema)

export async function getAllClients() {
  try {
    const clients = await Client.find()
      .populate('providers')
      .lean()
      .exec()

    return clients
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
