import mongoose from 'mongoose'
import nanoid from 'nanoid'
import pick from 'lodash/pick'
import isAlphanumeric from 'validator/lib/isAlphanumeric'

import Client from './Client'

const ProviderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    name: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      validate: value => isAlphanumeric(value),
    },
  },
  {
    collection: 'providers',
    timestamps: true,
  },
)

const Provider = mongoose.model('Provider', ProviderSchema)

export async function getAllProviders() {
  try {
    const providers = await Provider.find()
      .select('-_id')
      .lean()
      .exec()

    return providers
  } catch (e) {
    console.log('Error', e)
    return {
      error: e,
    }
  }
}

export async function addProvider(name) {
  try {
    const providerExists = await Provider.findOne({ name })
    if (providerExists) {
      return {
        error: 'Provider already exists',
      }
    }

    const id = nanoid()
    const provider = { id, name }

    const newProvider = new Provider(provider)
    const res = await newProvider.save()

    return pick(res, ['id', 'name'])
  } catch (e) {
    console.log('Error', e)
    return {
      error: e,
    }
  }
}

export async function deleteProvider(id) {
  try {
    const provider = await Provider.remove({ id })
    await Client.update({}, { $pull: { providers: { id } } }, { multi: true })

    return provider
  } catch (e) {
    console.log('Error', e)
    return {
      error: e,
    }
  }
}

export default Provider
