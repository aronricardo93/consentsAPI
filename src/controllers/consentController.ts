import { Request, Response } from "express";
import { verifyToken } from "../config/passport";
import { UserType } from "../models/User";
import * as consentService from "../services/ConsentService";
import * as permissionService from "../services/PermissionService";
import { links } from "../models/mocks/links"
import { meta } from "../models/mocks/meta"


export const createConsent = async (req: Request, res: Response) => {
  // #swagger.tags = ['Consent']
  if (req.body && req.headers.authorization) {
    try{
      const { status } = req.body;
      const [_, token] = req.headers.authorization.split(" ");
      
      const user: UserType = verifyToken(token);
      
      const consent = await consentService.createConsent(status, user.identification);
      const permissions = await permissionService.createPermission(req.body.permissions, consent.id, user.identification);
      const consentCustomized = await consentService.getConsentCustomized(consent.id);
      
      res.status(201).json({ loggedUser: { identification: user.identification , rel: 'CPF'}, data: consentCustomized, permissions, links, meta });
    }catch(err){
      res.status(500).json(err)
    }
  }
}

export const updateConsent = async (req: Request, res: Response) => {
  // #swagger.tags = ['Consent']
  if (req.body && req.params && req.headers.authorization) {
    try{
      const [_,token] = req.headers.authorization.split(" ");
      let { id } = req.params;
      let { status, ...products } = req.body;
      
      const user: UserType = verifyToken(token)

      const updatedPermission = await permissionService.updatePermission(products, user.identification);
      const updatedConsent = await consentService.updateConsent(id, status);
        
      res.status(200).json({ data: updatedConsent, products: updatedPermission?.permissions, links, meta });
      }catch(err){
        res.status(500).json(err)
      }
    }
  }
  
  export const findConsentById = async (req: Request, res: Response) => {
    // #swagger.tags = ['Consent']
    if(req.params){
      try{
        const { id } = req.params;
        
        const data = await consentService.findById(id);
        const consent = await consentService.getConsentCustomized(Number(data.consent?.id))
      
      res.status(200).json({ data: consent, permissions: data.permissions?.permissions, links, meta });
      }catch(err){
        res.status(500).json(err)
      }
    }
}

export const findConsentsByDocument = async (req: Request, res: Response) => {
  // #swagger.tags = ['Consent']
  if(req.params){
    try{
      const { document } = req.params
      
      const data = await consentService.findByDocument(document)
      
      if(data.consent){
        res.status(200).json({data: data.consent, permissions: data.permissions?.permissions, links, meta})
      }else{
        res.status(404).json({message: "Document not found!"})
      }
    }catch(err){
      res.status(500).json(err)
    }
  }
}

export const removeConsent = async (req: Request, res: Response) => {
  // #swagger.tags = ['Consent']
  if (req.params && req.headers.authorization) {
    try{
      let { id } = req.params;
      const [_, token] = req.headers.authorization.split(" ");
      const user: UserType = verifyToken(token);
      
      const consent = await consentService.removeConsent(id, user.identification);
      
      consent ? res.status(204).json({}): res.status(404).json({ Error: "Id not found!" });
    }catch(err){
      res.status(500).json(err)
    }
  }
}
