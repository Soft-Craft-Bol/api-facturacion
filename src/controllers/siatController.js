const SiatService = require('../services/siatService');

class SiatController {
  async getCuis(req, res) {
    try {
      const result = await SiatService.getCuis();
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new SiatController();