import express from 'express';

const router = express.Router();
router.route('/health').get((req, res) => {
  res.json({
    code: 200,
    message: 'Active!!',
  });
});

module.exports = router;
