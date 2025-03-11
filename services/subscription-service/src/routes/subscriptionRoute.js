const express = require("express");
const router = express.Router();
const {
  getAllSubscription,
  createSubscription,
  updateSubscription,
} = require("../controllers/subscriptionController");
router.route("/").post(createSubscription).get(getAllSubscription);
router.route("/:id").patch(updateSubscription);

module.exports = router;
