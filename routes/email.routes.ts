import {Router} from 'express'
import { getSampleEmails } from '../controllers/email.controller'


const router = Router()



router.route("/sample-email").get(getSampleEmails)




module.exports = router