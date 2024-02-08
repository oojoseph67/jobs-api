const express = require("express");
const router = express.Router();

const {
  getAllJob,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

// router.get("/", getAllJob);
// router.get("/getSingleJob", getSingleJob);
// router.post("/createJob", createJob);
// router.patch("/updateJob", updateJob);
// router.delete("/deleteJob", deleteJob);

router.route('/').get(getAllJob).post(createJob)
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router;
