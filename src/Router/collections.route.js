import express from 'express';
import Auth from '../Middleware/Authentication';
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  getCollection,
  updateCollection,
} from '../Controllers/collections/collections.controller';

const router = express.Router();

router.route('/collections').post(Auth.validateToken, createCollection).get(Auth.validateToken, getAllCollections);

router
  .route('/collections/:id')
  .get(Auth.validateToken, getCollection)
  .put(Auth.validateToken, updateCollection)
  .delete(Auth.validateToken, deleteCollection);

module.exports = router;
