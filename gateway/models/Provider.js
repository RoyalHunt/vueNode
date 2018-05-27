import mongoose from 'mongoose'

const ProviderSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
    },
    name: { type: String, lowercase: true, index: true },
  },
  {
    collection: 'providers',
    timestamps: true,
  },
)

const Provider = mongoose.model('Provider', ProviderSchema)

export default Provider
