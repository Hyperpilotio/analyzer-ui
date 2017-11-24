const express = require("express");
const resources = require("./resources");
const mockdb = require("./mockdb");

const router = express();

router.use(resources);
router.use(mockdb);

module.exports = router;
