import { randomUUID } from "node:crypto";
import fs from "node:fs";
const characters = JSON.parse(fs.readFileSync("../characters.json", "utf-8"));

export class CharacterModel {
  static async getAll({ gender }) {
    if (gender) {
      const charsFilteredByGender = characters.filter(
        (char) => char.gender.toLowerCase() === gender.toLowerCase()
      );
      return charsFilteredByGender;
    }
    return characters;
  }
  static async getById({ id }) {
    const character = characters.find((char) => char.id === id);
    return character;
  }
  static async create({ input }) {
    const newCharacter = {
      id: randomUUID(),
      ...input,
    };

    characters.unshift(newCharacter);
    return newCharacter;
  }
}
