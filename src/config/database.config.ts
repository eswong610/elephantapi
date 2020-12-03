import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
    host: process.env.MONGO_URI,
    port: process.env.PORT || 5432
  }));