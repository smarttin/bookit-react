const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controllers/user.controller");
const { getAllRentals, getRental, createRental, deleteRental, getUserRentals } = require("../controllers/rental.controller");

router.get("/secret", authMiddleware, function (req, res) {
res.json({"secret": true});
})

router.get("/manage", authMiddleware, getUserRentals);

router.get("/:id", getRental);

router.delete("/:id", authMiddleware, deleteRental)

router.get("", getAllRentals);

router.post("", authMiddleware, createRental);


module.exports = router;
