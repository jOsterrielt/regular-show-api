import { Router } from "express";
import { CharacterController } from "../controllers/character-controllers";

export const characterRouter = Router();

characterRouter.get("/", CharacterController.getAll);

characterRouter.get("/:id", CharacterController.getById);

characterRouter.post("/", CharacterController.create);
