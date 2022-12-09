import { Router } from "express"
import { privateRoute } from "../config/passport"
import * as consentController from '../controllers/consentController'

const router = Router()

router.post('/createConsent', privateRoute, consentController.createConsent)
router.put('/updateConsent/:id', privateRoute, consentController.updateConsent)
router.get('/findConsentById/:id', consentController.findConsentById)
router.get('/findConsentsByDocument/:document', consentController.findConsentsByDocument)
router.delete('/removeConsent/:id', privateRoute, consentController.removeConsent)

export default router