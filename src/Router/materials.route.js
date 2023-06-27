import express from 'express';
import Auth from '../Middleware/Authentication';
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterial,
  updateMaterial,
} from '../Controllers/materials/materials.controller';

const router = express.Router();

router.route('/materials').post(Auth.validateToken, createMaterial).get(Auth.validateToken, getAllMaterials);

router
  .route('/materials/:id')
  .get(Auth.validateToken, getMaterial)
  .put(Auth.validateToken, updateMaterial)
  .delete(Auth.validateToken, deleteMaterial);

module.exports = router;
