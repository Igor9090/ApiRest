import { Router } from 'express';
const router = new Router();

import AlunoControllers from '../controllers/AlunoControllers';
import loginRequired from '../middlewares/longinRequird'

router.get('/', AlunoControllers.index)
router.get('/:id', AlunoControllers.show)
router.post('/', loginRequired, AlunoControllers.create)
router.put('/:id', loginRequired, AlunoControllers.update)
router.delete('/:id', loginRequired, AlunoControllers.delete)

export default router
