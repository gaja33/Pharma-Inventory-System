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
const stocks = require("../controllers/stocks");
const sales = require("../controllers/sales");
const doctors = require("../controllers/doctors");

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

//Doctors
router.post("/doctors/create", auth, doctors.createDoctors);
router.get("/doctors", auth, doctors.getAllDoctors);
router.get("/doctors/read/:id", auth, doctors.getDoctors);
router.put("/doctors/update/:id", auth, doctors.updateDoctors);
router.delete("/doctors/delete/:id", auth, doctors.deleteDoctors);

// Stocks
router.post("/stocks/create", auth, stocks.createStocks);
router.get("/stocks", auth, stocks.getAllStocks);
router.get("/stocks/read/:id", auth, stocks.getStock);
router.put("/stocks/update/:id", auth, stocks.updateStocks);
router.delete("/stocks/delete/:id", auth, stocks.deleteStocks);
router.get("/stocks/search", auth, stocks.searchStocks);

//Sales
router.post("/sales/create", auth, sales.createSales);
router.get("/sales", auth, sales.getAllSales);
router.get("/sales/read/:id", auth, sales.getSales);
router.put("/sales/update/:id", auth, sales.updateSales);
router.delete("/sales/delete/:id", auth, sales.deleteSales);

module.exports = router;
