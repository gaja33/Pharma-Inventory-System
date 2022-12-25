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
const medicineTypes = require("../controllers/medicineTypes");

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

//Medicine Types
router.post("/medicineTypes/create", auth, medicineTypes.createMedicineTypes);
router.get("/medicineTypes", auth, medicineTypes.getAllMedicineTypes);
router.get("/medicineTypes/read/:id", auth, medicineTypes.getMedicineTypes);
router.put(
  "/medicineTypes/update/:id",
  auth,
  medicineTypes.updateMedicineTypes
);
router.delete(
  "/medicineTypes/delete/:id",
  auth,
  medicineTypes.deleteMedicineTypes
);

module.exports = router;
