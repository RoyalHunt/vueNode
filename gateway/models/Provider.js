import mongoose from 'mongoose'
import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'

const ProviderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      index: true,
      validate: value => isAlphanumeric(value),
    },
    name: {
      type: String,
      lowercase: true,
      index: true,
      validate: value => isAlpha(value),
    },
  },
  {
    collection: 'providers',
    timestamps: true,
  },
)

const Provider = mongoose.model('Provider', ProviderSchema)

export default Provider
