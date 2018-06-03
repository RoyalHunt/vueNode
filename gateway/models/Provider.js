import mongoose from 'mongoose'
import isAlpha from 'validator/lib/isAlpha'
import isMongoId from 'validator/lib/isMongoId'

const ProviderSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      validate: value => isMongoId(value),
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
