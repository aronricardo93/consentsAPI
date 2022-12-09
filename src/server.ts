import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json'
import userRoute from './routes/userRouter'
import consentRoute from './routes/consentRouter'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(passport.initialize())

app.use('/open-insurance/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/open-insurance/consents/v1', userRoute)
app.use('/open-insurance/consents/v1',consentRoute)

app.listen(process.env.PORT, () => console.log("Server running..."))