const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  updateInventory,
  getBloodInventory
} = require("../controllers/bloodInventoryController");

// BLOOD_BANK_ADMIN
router.put(
  "/",
  auth,
  authorize("BLOOD_BANK_ADMIN"),
  updateInventory
);

// USER / PUBLIC
router.get(
  "/:bloodBankId",
  getBloodInventory
);

module.exports = router;
