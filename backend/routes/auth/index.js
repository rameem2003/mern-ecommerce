const router = require("express").Router();

router.get("/auth/register", (req, res) => {
  res.status(200).send("This is Register Auth Route");
});

module.exports = router;
