const router = require("express").Router();
const indexController = require("./../controller/index");

router.get("/:owner/:repo", indexController);

module.exports = router;
