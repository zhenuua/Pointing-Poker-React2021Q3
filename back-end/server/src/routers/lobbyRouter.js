import { Router } from 'express';
import * as lobbyController from '../controllers/lobbyController.js';

const router = new Router();

router.post('/create', lobbyController.createLobby);
router.post('/update-status', lobbyController.changeStatus);
router.get('/game-settings/:lobbyId', lobbyController.getGameSettings);
router.post('/game-settings', lobbyController.addGameSettings);
router.get('/issues/:lobbyId', lobbyController.getIssues);
router.post('/issues', lobbyController.addIssues);
router.post('/issues/add', lobbyController.addIssue);
router.get('/check/:lobbyId', lobbyController.checkLobby);
router.delete('/delete/', lobbyController.deleteLobby);
router.post('/add-game-players', lobbyController.addPlayers);


export default router;