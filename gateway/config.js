const config = {}

config.port = parseInt(process.env.PORT, 10) || 8080
config.mongoDBUrl = 'mongodb://mongodb:27017/clientsList'

export default config
