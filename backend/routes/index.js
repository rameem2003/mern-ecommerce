const router = require("express").Router();

const auth = require("./auth");
const baseUrl = process.env.BASE_URL;
console.log(baseUrl);

router.use(baseUrl, auth);
module.exports = router;
