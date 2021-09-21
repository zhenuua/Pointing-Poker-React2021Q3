import { Router } from "express";
import * as usersController from "../controllers/usersController.js";
import { createSpectator } from "../controllers/usersController.js";

const router = new Router();

router.get("/:roomId", usersController.getUsers);
router.post("/create-admin", usersController.createAdmin);
router.post("/create-player", usersController.createPlayer);
router.delete("/delete", usersController.deleteUser);
router.delete("/delete-all", usersController.deleteAllUser);
router.post("/create-spectator", usersController.createSpectator);

export default router;
