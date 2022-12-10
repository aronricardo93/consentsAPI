import * as dotenv from 'dotenv'
import express from 'express'
import { Request, Response } from 'express'
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

app.use((req: Request, res: Response) => {
    res.status(404).json({error: 'Endpoint not found!'})
})

app.listen(process.env.PORT, () => console.log("Server running..."))