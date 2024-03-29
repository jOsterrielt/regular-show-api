import express, { json } from "express";
import { randomUUID } from "node:crypto";
import validateCharacter from "./schemas/character.js";
import cors from "cors";
import fs from "node:fs";

const characters = JSON.parse(fs.readFileSync("./characters.json", "utf-8"));
const app = express();
const PORT = process.env.PORT ?? 3001;

app.disable("x-powered-by");
app.use(json());
app.use(cors());

app.get("/characters", (req, res) => {
  const { gender } = req.query;
  if (gender) {
    const charsFilteredByGender = characters.filter(
      (char) => char.gender.toLowerCase() === gender.toLowerCase()
    );
    return res.json(charsFilteredByGender);
  }

  res.json(characters);
});

app.get("/characters/:id", (req, res) => {
  const { id } = req.params;
  const character = characters.find((char) => char.id === id);
  res.json(character);
});

app.post("/characters", (req, res) => {
  const result = validateCharacter(req.body);

  if (!result.success) {
    return res.status(400).json(JSON.parse(result.error.message));
  }

  const newCharacter = {
    id: randomUUID(),
    ...result.data,
  };

  characters.unshift(newCharacter);

  res.json(newCharacter);
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});

export default { app };
