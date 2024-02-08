const getAllJob = async (req, res) => {
    res.send('get job')
}

const getSingleJob = async (req, sres) => {
    res.send('get a single job')
}

const createJob = async (req, res) => {
    res.send('create a job')
}

const updateJob = async (req, res) => {
    res.send('edit a job')
}

const deleteJob = async (req, res) => {
    res.send('delete a job')
}

module.exports = {
    getAllJob,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob,
}