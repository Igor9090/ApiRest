import { Router } from 'express';
const router = new Router();

import imageController from "../controllers/ImageControllers.js";


router.post('/', imageController.create);
router.get('/', imageController.index);
router.get('/:id', imageController.show);

export default router;
