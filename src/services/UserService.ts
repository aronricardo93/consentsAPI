import { User } from "../models/User"
import bcrypt from 'bcrypt'

export const createUser = async (identification: string, password: string) => {
    const hash = bcrypt.hashSync(password, 10)

    const [user, created] = await User.findOrCreate({
        where: {
            identification
        },
        defaults:{
            identification,
            password: hash
        }
    })
    return created ? user : new Error('This identification exists already!')
}

export const findByIdentification = async (identification: string) => {
    return await User.findOne({ where: { identification } })
}

export const matchPassword = async (passwordText: string, encrypted: string) => {
    return bcrypt.compareSync(passwordText, encrypted)
}