const config = {}

config.port = parseInt(process.env.PORT, 10) || 8080
config.mongoDbUrl = process.env.DB_URL || 'mongodb://localhost:27017/clientsList'

export default config
