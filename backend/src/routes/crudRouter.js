import { Router } from 'express';
import { createOne, deleteOne, getMany, getOne, updateOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/auth.js';

export const crudRouter = (Model, middlewares = []) => {
  const router = Router();
  router.use(protect, ...middlewares);
  router.route('/').get(getMany(Model)).post(createOne(Model));
  router.route('/:id').get(getOne(Model)).patch(updateOne(Model)).delete(deleteOne(Model));
  return router;
};
