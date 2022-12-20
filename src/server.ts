import * as dotenv from 'dotenv'
import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import passport from 'passport'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from "./swagger.json"
import userRoute from './routes/userRouter'
import consentRoute from './routes/consentRouter'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({origin: "*"}))

app.use(passport.initialize())

app.use(express.urlencoded({extended: true}))

app.use('/open-insurance/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/open-insurance/consents/v1', userRoute)
app.use('/open-insurance/consents/v1',consentRoute)

app.use((req: Request, res: Response) => {
    res.status(404).json({error: 'Endpoint not found!'})
})

app.listen(process.env.PORT, () => console.log("Server running..."))