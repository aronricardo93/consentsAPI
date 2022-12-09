import { Permission } from "../models/Permissions"

export const createPermission = async(newPermission: string, id: any, identification: string) => {
    const [hasPermission] = await Permission.findOrCreate({
        where: {idConsent : Number(id)},
       defaults: { 
        permissions: newPermission,
        idConsent: Number(id),
        identificationUser: identification
    }})
    return hasPermission.permissions
 }

 export const updatePermission = async(products: object, identificationUser: string) => {
    await Permission.update(products, {
        where: {
            identificationUser
        }
    })
    return await Permission.findOne({where: {identificationUser}})
 }

 export const removePermission = async(identificationUser: string) => {
    return await Permission.destroy({where: {identificationUser}})
 }