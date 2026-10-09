const { dataSource } = require('../db/data-source');

const regionsController = {
  // GET /api/regions
  async getRegions(req, res) {
    const regionRepo = dataSource.getRepository('Region');
    const regions = await regionRepo.find({ order: { name: 'ASC' } });

    res.json({
      status: 'success',
      data: regions,
    });
  },
};

module.exports = regionsController;
