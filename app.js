const express = require("express");
const app = express();
const port = 4000;
const pokedex = require("./pokedex.json");
var cors = require("cors");

app.use(cors());

app.get("/pokemon", (req, res) => {
  res.json(pokedex);
});

app.get("/pokemon/:id", (req, res) => {
  /* 
    1. Our route needs to accept a dynamic value as an id
      - We need to store this value (in a variable)
    2. We need to find the pokemon with the matching id
      - We have an array of all pokemon, where each object is one pokemon
      - We need to search in this array for the pokemon with the matching id
    3. We need to send the pokemon back to the client
  */

  // const id = req.params.id;
  const { id } = req.params;
  // Doing equality operator (vs. strict equality operator) because
  // id is a string and pokemon.id is a number!
  // Alternatively, you can convert id to a number with Number(id)
  const findPokemon = pokedex.find((pokemon) => pokemon.id == id);
  console.log(findPokemon);
  if (!findPokemon) res.status(404).send("Pokemon not found");
  res.json(findPokemon);
});

app.get("/pokemon/:id/:info", async (req, res) => {
  /* 
  1. Our route needs to accept a dynamic value as an id
  2. Our route accepts a dynamic value as info, but ONLY name, base or type
    - If the info is not name, base or type, we need to send an error back
    - We need to find the pokemon with the matching id
    - We have an array of all pokemon, where each object is one pokemon
    - We need to search in this array for the pokemon with the matching id
    - If pokemon cannot be found, send an error back
  3. We need to send the pokemon's info back to the client
    - If the user selects name, send back the pokemon's name
    - If the user selects base, send back the pokemon's base
    - If the user selects type, send back the pokemon's type
  */

  const { info, id } = req.params;
  let result = pokedex.filter((data) => id == data.id);

  let finalResult = [];

  result.map((data) => {
    if (info == "name") finalResult = data.name;
    else if (info == "base") finalResult = data.base;
    else if (info == "type") finalResult = data.type;
    else console.log("Wrong value");
  });

  try {
    return res.status(200).send(finalResult);
  } catch (err) {
    console.log(err);
    next(err);
  }

  // res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
