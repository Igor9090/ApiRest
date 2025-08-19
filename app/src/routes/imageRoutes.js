import { Router } from 'express';
const router = new Router();

import imageController from "../controllers/ImageControllers.js"
import loginRequired from '../middlewares/longinRequird'

router.post('/', loginRequired, imageController.create)

export default router
