import mongoose from 'mongoose'
import chalk from 'chalk'

import config from './config'

const { mongoDBUrl } = config

mongoose.Promise = Promise

const createConnection = async () => {
  try {
    await mongoose.connect(mongoDBUrl)
    console.log(chalk.cyan('Mongoose connected to DB'))
    mongoose.set('debug', false)
  } catch (err) {
    console.log(chalk.red('Could not connect to MongoDB'))
  }
}

export default createConnection
