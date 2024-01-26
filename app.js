const express = require("express");
const crypto = require("node:crypto");

const characters = require("./characters.json");
const app = express();
const PORT = process.env.PORT ?? 3001;

app.disable("x-powered-by");
app.use(express.json());

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
  const { name, status, species, gender, image, episode, location } = req.body;
  const newCharacter = {
    id: crypto.randomUUID,
    name,
    species,
    status,
    gender,
    image,
    episode,
    location,
  };

  characters.unshift(newCharacter);

  res.json(newCharacter);
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});

module.exports = { app };
