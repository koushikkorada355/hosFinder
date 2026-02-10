const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  createBloodBank,
  searchNearbyBloodBanks
} = require("../controllers/bloodBankController");

// BLOOD_BANK_ADMIN
router.post(
  "/",
  auth,
  authorize("BLOOD_BANK_ADMIN"),
  createBloodBank
);

// USER / PUBLIC
router.get(
  "/nearby",
  searchNearbyBloodBanks
);

module.exports = router;
