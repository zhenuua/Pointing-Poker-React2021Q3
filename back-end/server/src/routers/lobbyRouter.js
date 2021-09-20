import { Router } from 'express';
import * as lobbyController from '../controllers/lobbyController.js';

const router = new Router();

router.post('/create', lobbyController.createLobby);
router.get('/check/:lobbyId', lobbyController.checkLobby)


export default router;