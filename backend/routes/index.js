var express = require("express");
var router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
var auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload",
  algorithms: ["HS256"],
});

const ctrlUser = require("../controllers/users");
const ctrlAuth = require("../controllers/authentication");
const profile = require("../controllers/profile");

// user
router.get("/user", auth, ctrlUser.userRead);

// authentication
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

// profile
router.post("/profile/create", auth, profile.createProfile);
router.get("/profile", auth, profile.getAllProfile);
router.get("/profile/read/:id", auth, profile.getProfile);
router.put("/profile/update/:id", auth, profile.updateProfile);
router.delete("/profile/delete/:id", auth, profile.deleteProfile);

module.exports = router;
