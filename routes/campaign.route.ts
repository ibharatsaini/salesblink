

import {Router} from 'express'
import { addCampaign } from '../controllers/campaign.controller'


const router = Router()



router.route("/run-campaign").post(addCampaign)




module.exports = router