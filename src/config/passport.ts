import { Request, Response, NextFunction} from 'express'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt' 
import { User, UserType } from '../models/User'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const notAuthorizedJson = { status: '401', message: 'Unauthorized!'}
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET as string
}


passport.use(new JWTStrategy(options, async (payload, done) => {
    const user = await User.findByPk(payload.id)
    
    if(user){
        return done(null,user) 
    }else{
        return done(notAuthorizedJson, false) 
    }
}))

export const generateToken = (id: number, identification: string) => {
    return jwt.sign(
        { id: id, identification: identification },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    )
}

export const verifyToken = (token: string) => {
    var bearerToken = "Bearer " + token
    
    const payload =  jwt.verify(bearerToken,process.env.JWT_SECRET as string)
    
    return payload as UserType 
}

export const privateRoute = (req:Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err, user) => {
        return user ? next() : res.status(401).json(notAuthorizedJson)
    })(req,res,next)
}

export default passport