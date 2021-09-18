import { Router } from 'express';
import * as lobbyController from '../controllers/lobbyController.js';

const router = new Router();

router.post('/create', lobbyController.createLobby);
router.get('/check/:lobbyId', lobbyController.checkLobby)
router.get('/users', lobbyController.getUsers);
router.post('/users/add', lobbyController.addUser);
router.delete('/users/delete', lobbyController.deleteUser);

export default router;