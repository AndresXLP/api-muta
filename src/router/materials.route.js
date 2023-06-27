import express from 'express';
import Auth from '../Middleware/Authentication';
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterial,
  updateMaterial,
} from '../controller/materials/materials.controller';

const router = express.Router();

router.route('/materials').post(Auth.validateToken, createMaterial);
router.route('/materials').get(Auth.validateToken, getAllMaterials);
router.route('/materials/:id').get(Auth.validateToken, getMaterial);
router.route('/materials/:id').put(Auth.validateToken, updateMaterial);
router.route('/materials/:id').delete(Auth.validateToken, deleteMaterial);

module.exports = router;
