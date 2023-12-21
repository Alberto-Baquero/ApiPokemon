const pokeDato = async () => {
  const pokebichos = [];
  for (let i = 1; i <= 151; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemon = await res.json();
    pokebichos.push(pokemon);
  }
  return pokebichos;
};

const mapPokebichos = (pokebichosSinMap) => {
  console.log(pokebichosSinMap);
  return pokebichosSinMap.map((pokebichosMap) => ({
    name: pokebichosMap.name,
    image: pokebichosMap.sprites.front_default,
    back_image: pokebichosMap.sprites.back_default,
    type: pokebichosMap.types.map((type) => type.type.name),
    experience: pokebichosMap.base_experience,
    abilities: pokebichosMap.abilities.map(
      (abilityData) => abilityData.ability.name
    ),
    species: pokebichosMap.species.name,
    moves: pokebichosMap.moves.map((move) => move.move.name),
  }));
};

const pintar = (pokebichos) => {
  const pokedex = document.querySelector("#pokedex");
  pokedex.innerHTML = "";
  console.log(pokedex);

  for (const pokemon of pokebichos) {
    const pokemonCard$$ = document.createElement("div");
    pokemonCard$$.classList.add("card");

    pokemonCard$$.innerHTML = `
        <div class= "card-front>"
        <h2 class="card-title"> ${pokemon.name}</h2>
        <img
          src="${pokemon.image}"
          alt="${pokemon.name}"
          class="card-img"
        ></img>
        <div class="card-type"> 
        <p class=typePokemon>${pokemon.type}</p>
        </div>
      </div>
    `;
    pokedex.appendChild(pokemonCard$$);
  }
};
const init = async () => {
  const pokemons = await pokeDato();
  const pokemonsMap = await mapPokebichos(pokemons);
  pintar(pokemonsMap);
};
init();
