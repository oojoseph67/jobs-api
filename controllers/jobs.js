const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJob = async (req, res) => {
  const { user, body } = req;
  const { userId, name } = user;

  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getSingleJob = async (req, res) => {
  const { user, params } = req;
  const { userId } = user;
  const { id: jobId } = params;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job with that id ${jobId} was found`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { user, body } = req;

  const { userId, name } = user;
  const { company, position } = body;

  //   req.body.createBy = req.user.userId;
  //   console.log("🚀 ~ createJob ~ req.body:", req.body);

  const job = await Job.create({ company, position, createdBy: userId });

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { user, params, body } = req;
  const { userId } = user;
  const { id: jobId } = params;
  const { company, position, status } = body;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    { company, position },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job with that id ${jobId} was found`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const { user, params } = req;
  const { userId } = user;
  const { id: jobId } = params;

  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with that id ${jobId} was found`);
  }

  const { company, position } = job;

  res
    .status(StatusCodes.OK)
    .json({ msg: `job (${position}) for ${company} ORG has been deleted` });
};

module.exports = {
  getAllJob,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
