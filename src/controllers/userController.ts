import { Request, Response } from 'express'
import * as passport from '../config/passport'
import * as UserService from '../services/UserService'

export const register = async(req: Request, res: Response) => {
    // #swagger.tags = ['User']
    if(req.body){
        try{
            let { identification, password } = req.body

            const newUser = await UserService.createUser(identification, password)

            if(newUser instanceof Error){
                res.status(400).json({error: newUser.message})
            }else{
                res.status(201).json({document: `identification: ${newUser.identification}`})
            }
        }catch(err){
            res.status(400).json(err)
        }
    }
}

export const login = async (req: Request, res: Response) => {
    // #swagger.tags = ['User']
    if(req.body){
        try{
            let { identification, password } = req.body
                
                const user = await UserService.findByIdentification(identification)
                
                if(user && await UserService.matchPassword(password, user.password)){
                    let token = await passport.generateToken(user.id, user.identification)
                    res.status(200).json({token})
                }else{
                    res.status(400).json({error: "Login invalid!"})
                }
            }catch(err){
                res.status(400).json(err)
            }
    }
}