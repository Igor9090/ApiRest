import { Router } from 'express';
const router = new Router();

import userController from "../controllers/UserControllers.js"
import longinRequird from '../middlewares/longinRequird.js';


// Não deveria exister
router.get('/', longinRequird , userController.index)
router.get('/:id', userController.show)


router.post('/', userController.create)
router.put('/', longinRequird , userController.update)
router.delete('/', longinRequird, userController.delete)

export default router
