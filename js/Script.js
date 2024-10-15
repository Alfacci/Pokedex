const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const backgroundDefault = "linear-gradient(to bottom, #ff2d2d, #000000)";
const backgroundBug = "linear-gradient(to bottom, #045413, #01ff4d)";
const backgroundGrass = "linear-gradient(to bottom, #2eff2f, #2fffbb)";
const backgroundFire = "linear-gradient(to bottom, #fe8419, #fd1d1d, #fcb045)";
const backgroundFlying = "linear-gradient(to bottom, #d7d6d2, #ffffff, #9c9e9e)";
const backgroundGhost = "linear-gradient(to bottom, #480077, #8356c7, #480077)";
const backgroundWater = "linear-gradient(to bottom, #0021b4, #0d6ca7, #03a9ff)";
const backgroundNormal = "linear-gradient(to bottom, #43494d, #adafb1, #5f6162)";
const backgroundPoison = "linear-gradient(to bottom, #a82fa2, #8613b0, #ff09f9)";
const backgroundElectric = "linear-gradient(to bottom, #f2ff19, #ff9d03, #f7ff00)"; 
const backgroundGround = "linear-gradient(to bottom, #623400, #a77f42, #593100)";
const backgroundPsychic = "linear-gradient(to bottom, #c23bd5, #580670, #8a338f)";
const backgroundFairy = "linear-gradient(to bottom, #ff6ff9, #c901bc, #ac067e)";
const backgroundFighting = "linear-gradient(to bottom, #ff8983, #ff3030, #ff613e)";

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    alterBackground(pokemon);
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

const alterBackground = async (pokemon) => {
  const data = await fetchPokemon (pokemon)

const type = data.types.map((typeInfo) => typeInfo.type.name);


  if (type.includes ("bug")) {
    document.body.style.backgroundImage = backgroundBug; 
  } else if (type.includes ("grass")) { 
    document.body.style.backgroundImage = backgroundGrass;
  } else if (type.includes ("fire")) {
    document.body.style.backgroundImage = backgroundFire;
  } else if (type.includes ("flying")) {
    document.body.style.backgroundImage = backgroundFlying;
  } else if (type.includes ("ghost")) {
    document.body.style.backgroundImage = backgroundGhost;
  } else if (type.includes ("water")) {
    document.body.style.backgroundImage = backgroundWater;
  } else if (type.includes ("normal")) {
    document.body.style.backgroundImage = backgroundNormal;
  } else if (type.includes ("poison")) {
    document.body.style.backgroundImage = backgroundPoison;
  } else if (type.includes ("electric")) {
    document.body.style.backgroundImage = backgroundElectric;
  } else if (type.includes ("ground")) {
    document.body.style.backgroundImage = backgroundGround;
  } else if (type.includes ("psychic")) {
    document.body.style.backgroundImage = backgroundPsychic;
  } else if (type.includes ("fairy")) {
    document.body.style.backgroundImage = backgroundFairy;
  } else if (type.includes ("fighting")) {
    document.body.style.backgroundImage = backgroundFighting;
  }
  else {
    document.body.style.backgroundImage = backgroundDefault; 
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);