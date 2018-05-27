import mongoose from 'mongoose'

const ProviderSchema = new mongoose.Schema(
  {
    id: { type: Number, index: true },
  },
  { _id: false },
)

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, lowercase: true, index: true },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      index: true,
    },
    phone: { type: Number, index: true },
    providers: [ProviderSchema],
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
