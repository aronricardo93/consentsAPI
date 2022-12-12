import { Consent } from "../models/Consent";
import { Permission } from "../models/Permissions";
import * as PermissionService from "../services/PermissionService";
import { randomUUID } from "crypto";
import { error } from "console";
import { statusType } from "../enums/statusType";


export const createConsent = async (consent: object, identification: string) => {
  const [hasConsent] = await Consent.findOrCreate({
    where: { identification },
    defaults: {consent, consentId: "urn:mapfre:" + randomUUID(), identification}})

    return hasConsent
};

export const updateConsent = async (id: string, newInfos: object) => {
  let consent = await Consent.findOne({ where: { consentId: id } });

  if (consent) {
    await Consent.update({ status: newInfos }, {where: {consentId: id}});
  }
  return await Consent.findOne({
    where: { consentId: id },
    attributes: ["consentId", "status", "identification", "createdAt", "updatedAt"],
  });
};

export const findById = async(id: string) => {
  const consent = await Consent.findOne({ 
    where: {consentId: id}})
 
  if(consent){
    const permissions = await Permission.findOne({
      where: { idConsent: consent?.id }
    });
  
    return {consent, permissions}  
  }else{
    return null
  }
};

export const findByDocument = async(document: string) => {
  const consent = await Consent.findOne({
    where: {identification: document},
    attributes: ["consentId", "status", "identification", "createdAt", "updatedAt"]
  })
  
    const permissions = await Permission.findOne({where: 
    {identificationUser: document},
    attributes: ["permissions"]
  })

  return {consent, permissions}
}

export const getConsentCustomized = async (id: number) => {
  return await Consent.findOne({
    where: { id },
    attributes: ["consentId", "status", "identification", "createdAt", "updatedAt"]
  });
};

export const removeConsent = async (id: string, identification: string) => {
  const consent = await Consent.findOne({where: { consentId: id}}).toString()
  
  if(consent){
    await PermissionService.removePermission(identification)
    return await Consent.destroy({ where: { identification } });
  }else{
    return error('Consent not found!')
  }
};
