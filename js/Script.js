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
const backgroundFire = "linear-gradient(to bottom, #2eff2f, #2fffbb)";
const estadioImage = "../images/estadio.webp"; 

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
  } else if (type.includes ("fire")){
    document.body.style.backgroundImage = `url(${estadioImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
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