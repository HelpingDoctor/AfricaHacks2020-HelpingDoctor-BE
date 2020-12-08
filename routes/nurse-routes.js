const express = require("express");

const router = express.Router();

router.get("/", function (req, res, next) {
  console.log("Get request on nurse dashboard");
  res.json({ message: "It works" });
});

const DUMMY_PATIENTS = [
  {
    id: "A123",
    name: "John Doe",
    age: 25,
    dob: "14-02-1995",
    diag: "Headache",
    triag: "Non Urgent",
  },
  {
    id: "C223",
    name: "Felix Mike",
    age: 12,
    dob: "14-02-2008",
    diag: "Cancer",
    triag: "Non Urgent",
  },
  {
    id: "D445",
    name: "Rishi Kumar",
    age: 52,
    dob: "14-02-1972",
    diag: "Acne",
    triag: "Non Urgent",
  },
  {
    id: "A123",
    name: "Jane Doe",
    age: 25,
    dob: "14-02-1995",
    diag: "Stomach ache",
    triag: "Urgent",
  },
];
router.get("/patients", function (req, res, next) {
  console.log("Get request on patients list");
  res.json({ message: "It works" });
});

router.get("/patients/:pid", function (req, res, next) {
  const patientId = req.params.pid;
  const patient = DUMMY_PATIENTS.find((p) => {
    return p.id === patientId;
  });
  console.log("Get request on patients profile");
  res.json({ patient: patient });
});

module.exports = router;
