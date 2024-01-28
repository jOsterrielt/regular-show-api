import { CharacterModel } from "../models/character";
import validateCharacter from "../schemas/character";

export class CharacterController {
  static async getAll(req, res) {
    const { gender } = req.query;
    const characters = await CharacterModel.getAll({ gender });
    if (!characters) return res.status(400).json({ error: error.message });
    res.json(characters);
  }
  static async getById(req, res) {
    const { id } = req.params;
    const character = await CharacterModel.getById({ id });
    if (!character)
      return res.status(404).json({ message: "Character Not Found" });
    return res.json(character);
  }
  static async create(req, res) {
    const result = validateCharacter(req.body);

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message));
    }
    const newCharacter = await CharacterModel.create({ input: result.data });
    res.json(newCharacter);
  }
}
