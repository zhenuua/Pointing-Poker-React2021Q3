import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';

const router = new Router();

router.get('/:roomId', usersController.getUsers);
router.post('/create-admin', usersController.createAdmin);
router.post('/create-player', usersController.createPlayer);

export default router;