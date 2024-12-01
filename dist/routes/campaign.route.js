"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaign_controller_1 = require("../controllers/campaign.controller");
const router = (0, express_1.Router)();
router.route("/run-campaign").post(campaign_controller_1.addCampaign);
module.exports = router;
